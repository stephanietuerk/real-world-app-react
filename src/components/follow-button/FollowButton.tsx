import { useState, type CSSProperties, type MouseEventHandler } from 'react';
import { useAuth } from '../../api/useAuth';
import { useFollowActions } from '../../api/useFollow';
import type { Profile } from '../../api/useProfile';
import AddAddedIcon from '../icons/AddAddedIcon';
import styles from './FollowButton.module.scss';

interface FollowButtonProps {
  profile: Profile;
  theme: 'light' | 'dark' | 'accent';
}

const THEME = {
  light: {
    bg: 'none',
    color: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    icon: 'var(--color-primary)',
    hoverBg: 'var(--color-accent-light)',
    hoverColor: 'var(--color-primary)',
    hoverBorderColor: 'var(--color-primary)',
    hoverIcon: 'var(--color-primary)',
  },
  dark: {
    bg: 'none',
    color: 'rgba(var(--color-surface-rgb), 0.8)',
    borderColor: 'rgba(var(--color-surface-rgb), 0.8)',
    icon: 'rgba(var(--color-surface-rgb), 0.8)',
    hoverBg: 'var(--color-accent-faint)',
    hoverColor: 'var(--color-primary)',
    hoverBorderColor: 'var(--color-accent-faint)',
    hoverIcon: 'var(--color-primary)',
  },
  accent: {
    bg: 'white',
    color: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    icon: 'var(--color-primary)',
    hoverBg: 'var(--color-accent-light)',
    hoverColor: 'var(--color-primary)',
    hoverBorderColor: 'var(--color-primary)',
    hoverIcon: 'var(--color-primary)',
  },
};

export default function FollowButton({
  profile,
  theme: variant,
}: FollowButtonProps) {
  const { hasToken } = useAuth();
  const { followUser, unfollowUser } = useFollowActions();
  const [localFollowing, setLocalFollowing] = useState<boolean>(
    profile.following,
  );
  const [hovering, setHovering] = useState<boolean>(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const isUnfollowing = localFollowing;

    setLocalFollowing(!localFollowing);

    if (hasToken) {
      try {
        const action = isUnfollowing ? unfollowUser : followUser;
        await action(profile.username);
      } catch (error) {
        setLocalFollowing(isUnfollowing);
      }
    }
  };

  return (
    <button
      className={styles.followButton}
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={
        {
          '--color-button-background': THEME[variant].bg,
          '--color-button-color': THEME[variant].color,
          '--color-button-border': THEME[variant].borderColor,
          '--color-button-icon': THEME[variant].icon,
          '--color-button-hover-background': THEME[variant].hoverBg,
          '--color-button-hover-color': THEME[variant].hoverColor,
          '--color-button-hover-border': THEME[variant].hoverBorderColor,
          '--color-button-hover-icon': THEME[variant].hoverIcon,
        } as CSSProperties
      }
    >
      <AddAddedIcon
        size={24}
        variant={!localFollowing ? 'plus' : hovering ? 'minus' : 'check'}
        svgClassName={styles.iconSvg}
        pathClassName={styles.iconPath}
      ></AddAddedIcon>
      <span className={styles.text}>
        {!localFollowing ? 'Follow' : hovering ? 'Unfollow' : 'Following'}{' '}
        {profile.username}
      </span>
    </button>
  );
}
