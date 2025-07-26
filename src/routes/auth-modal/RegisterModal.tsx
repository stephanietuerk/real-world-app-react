import { register } from '../../api/auth';
import { ROUTE } from '../../shared/constants/routing';
import AuthModal from './AuthModal';
import styles from './ImplementedModal.module.scss';

export default function RegisterModal() {
  function handleInput(
    form: HTMLFormElement,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
  ) {
    const username = form.elements.namedItem(
      'username',
    ) as HTMLInputElement | null;
    const email = form.elements.namedItem('email') as HTMLInputElement | null;
    if (
      username &&
      email &&
      username.value.trim() === '' &&
      email.value.trim() === ''
    ) {
      setError((prev) => (prev ? null : prev));
    }
  }

  async function handleSubmit(
    formData: FormData,
    closeModal: () => void,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
  ): Promise<void> {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      const user = await register(username, email, password);
      localStorage.setItem('token', user.token);
      closeModal();
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  }

  return (
    <AuthModal
      title="Sign up"
      altAuthRoute={ROUTE.login}
      altAuthLabel="Have an account?"
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      submitLabel="Sign up"
      key="Register"
    >
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="username">
          Username
        </label>
        <input
          className={styles.input}
          type="text"
          name="username"
          id="register-username"
          required
        />
      </div>
      <div
        className={styles.formField}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <label className={styles.formLabel} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          type="email"
          name="email"
          id="register-email"
          required
        />
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="password">
          Create a password
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="register-password"
          required
        />
      </div>
    </AuthModal>
  );
}
