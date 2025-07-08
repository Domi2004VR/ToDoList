import '../styles/AuthCard.css';

const AuthCard = ({ title, children }) => (
    <div className="auth-card-container">
        <div className="auth-card">
            <h2>{title}</h2>
            {children}
        </div>
    </div>
);

export default AuthCard;
