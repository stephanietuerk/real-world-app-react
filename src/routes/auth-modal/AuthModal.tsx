import { FocusTrap } from 'focus-trap-react';
import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import CloseIcon from '../../shared/close-x-button/CloseXButton';
import styles from './AuthModal.module.scss';

interface AuthModalProps {
  title: string;
  altAuthRoute: string;
  altAuthLabel: string;
  submitLabel: string;
  handleSubmit: (
    formData: FormData,
    closeModal: () => void,
    handleAuthError: (err: unknown) => void,
  ) => Promise<void>;
  handleInput: (
    form: HTMLFormElement,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
  ) => void;
  children: React.ReactNode;
}

export default function AuthModal({
  title,
  altAuthRoute: otherAuthRoute,
  altAuthLabel: otherAuthLabel,
  submitLabel,
  handleInput,
  handleSubmit,
  children,
}: AuthModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  function closeModal(): void {
    const background = location.state?.backgroundLocation;
    navigate(background || '/', { replace: true });
  }

  function handleInputLocal(): void {
    if (formRef.current) {
      setIsFormValid(formRef.current.checkValidity());
      handleInput(formRef.current, setError);
    }
  }

  function handleAuthError(err: unknown): void {
    if (err instanceof Error && 'code' in err) {
      if (err.code === 422) {
        setError('Invalid email or password.');
      } else if (err.code === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Login failed. Please try again.');
      }
    } else {
      setError('Login failed. Please try again.');
    }
  }

  async function handleSubmitLocal(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    handleSubmit(formData, closeModal, handleAuthError);
  }

  return (
    <FocusTrap>
      <div
        className={styles.root}
        tabIndex={-1}
        onClick={closeModal}
        onKeyUp={(e) => {
          if (e.key === 'Escape') {
            closeModal();
          }
        }}
      >
        <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
          <button
            ref={closeButtonRef}
            onClick={closeModal}
            aria-label="Close login modal"
            style={{
              alignSelf: 'flex-end',
              position: 'relative',
            }}
          >
            <CloseIcon
              size={28}
              svgClassName={styles.closeButtonSvg}
              circleClassName={styles.closeButtonCircle}
              lineClassName={styles.closeButtonLine}
            />
          </button>
          <h2 className={styles.signIn}>{title}</h2>
          <Link
            to={otherAuthRoute}
            state={{ backgroundLocation: location.state.backgroundLocation }}
          >
            {otherAuthLabel}
          </Link>
          {error && <div className={styles.formMessage}>{error}</div>}
          <form
            ref={formRef}
            onInput={handleInputLocal}
            onSubmit={handleSubmitLocal}
            className={styles.formRoot}
            method="post"
            noValidate
          >
            {children}
            <button className={styles.submitButton} disabled={!isFormValid}>
              {submitLabel}
            </button>
          </form>
        </div>
      </div>
    </FocusTrap>
  );
}
