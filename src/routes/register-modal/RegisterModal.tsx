import { useNavigate } from 'react-router';

export default function RegisterModal() {
  const navigate = useNavigate();

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sign Up</h2>
        {/* form goes here */}
        <button onClick={() => navigate(-1)}>Close</button>
      </div>
    </div>
  );
}
