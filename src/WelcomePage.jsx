import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <main className="page">
      <section className="card">
        <h1>Welcome to Popx</h1>
        <p>Hi there! Start by creating an account or logging in.</p>
        <Link to="/signup" className="btn create-acc text-center">
          Create Account
        </Link>
        <Link to="/login" className="btn login-acc text-center">
          Already Registered? Login
        </Link>
      </section>
    </main>
  );
}

