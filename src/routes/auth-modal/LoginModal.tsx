import { login } from '../../api/auth';
import { ROUTE } from '../../shared/constants/routing';
import AuthModal from './AuthModal';
import styles from './ImplementedModal.module.scss';

export default function LoginModal() {
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
    setError: React.Dispatch<React.SetStateAction<string | null>>,
  ): Promise<void> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      const user = await login(email, password);
      localStorage.setItem('token', user.token);
      closeModal();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
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
