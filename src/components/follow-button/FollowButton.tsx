import clsx from 'clsx';
import { useState, type MouseEventHandler } from 'react';
import { useAuth } from '../../api/useAuth';
import { useFollowActions } from '../../api/useFollow';
import type { Profile } from '../../api/useProfile';
import AddAddedIcon from '../icons/AddAddedIcon';
import styles from './FollowButton.module.scss';

interface FollowButtonProps {
  profile: Profile;
  className?: string;
  iconSize?: number;
}

export default function FollowButton({
  profile,
  className,
  iconSize = 24,
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
      className={clsx(styles.followButton, className)}
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <AddAddedIcon
        size={iconSize}
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
