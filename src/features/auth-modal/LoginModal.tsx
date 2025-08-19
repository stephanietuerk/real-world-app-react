import { login } from '../../api/authenticate';
import { useAuth } from '../../api/useAuth';
import { ROUTE } from '../../shared/constants/routing';
import AuthModal from './AuthModal';
import styles from './ImplementedModal.module.scss';

export default function LoginModal() {
  const { setToken } = useAuth();

  const handleInput = (
    setError: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    setError(null);
  };

  const handleSubmit = async (
    formData: FormData,
    closeModal: () => void,
    handleAuthError: (err: unknown) => void,
  ): Promise<void> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await login(email, password);
      setToken(res.user.token);
      closeModal();
    } catch (err) {
      handleAuthError(err);
    }
  };

  return (
    <AuthModal
      title="Sign in"
      altAuthRoute={ROUTE.register}
      altAuthLabel="Need an account?"
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      submitLabel="Sign in"
      key="Login"
    >
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          type="email"
          name="email"
          id="login-email"
          autoComplete="email"
          required
        />
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="login-password"
          autoComplete="current-password"
          required
        />
      </div>
    </AuthModal>
  );
}
