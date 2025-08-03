import { login } from '../../api/authenticate';
import { useAuth } from '../../api/AuthProvider';
import { ROUTE } from '../../shared/constants/routing';
import AuthModal from './AuthModal';
import styles from './ImplementedModal.module.scss';

export default function LoginModal() {
  const { setToken } = useAuth();
  function handleInput(
    form: HTMLFormElement,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
  ) {
    const email = form.elements.namedItem('email') as HTMLInputElement | null;
    if (email && email.value.trim() === '') {
      setError((prev) => (prev ? null : prev));
    }
  }

  async function handleSubmit(
    formData: FormData,
    closeModal: () => void,
    handleAuthError: (err: unknown) => void,
  ): Promise<void> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const user = await login(email, password);
      setToken(user.token);
      closeModal();
    } catch (err) {
      handleAuthError(err);
    }
  }

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
          required
        />
      </div>
    </AuthModal>
  );
}
