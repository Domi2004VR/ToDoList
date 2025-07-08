import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";

function LoginPage() {
    return (
        <div className="LoginPage">
            <AuthCard title="Benvenuto">
                <LoginForm />
            </AuthCard>
        </div>
    );
}

export default LoginPage;