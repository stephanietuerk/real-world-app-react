import { Form } from 'radix-ui';
import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import CloseIcon from '../../shared/close-x-button/CloseXButton';
import { ROUTE } from '../../shared/constants/routing';
import styles from './AuthModal.module.scss';

export default function AuthModal({ handleFormInput, onSubmit, closeModal }) {
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.root}>
      <div className={styles.dialog}>
        <button
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
        <h2 className={styles.signIn}>Sign in</h2>
        <Link
          to={ROUTE.register}
          state={{ backgroundLocation: location.state.backgroundLocation }}
        >
          Need an account?
        </Link>
        {error && <div className={styles.formMessage}>{error}</div>}
        <Form.Root
          className={styles.formRoot}
          onSubmit={onSubmit}
          method="post"
          ref={formRef}
          onInput={handleFormInput}
        >
          <Form.Field className={styles.formField} name="email">
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <Form.Label className={styles.formLabel}>Email</Form.Label>
            </div>
            <Form.Control asChild>
              <input className={styles.input} type="email" required />
            </Form.Control>
            <Form.Message className={styles.formMessage} match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className={styles.formMessage} match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </Form.Field>
          <Form.Field className={styles.formField} name="password">
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <Form.Label className={styles.formLabel}>Password</Form.Label>
            </div>
            <Form.Control asChild>
              <input className={styles.input} required />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button className={styles.submitButton} disabled={!isFormValid}>
              Sign in
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
}
