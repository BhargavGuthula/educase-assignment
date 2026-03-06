import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './Firebase/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, login.email, login.password);
      const existingUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName || existingUser.name || 'User',
          phoneNumber: existingUser.phoneNumber || '',
          company: existingUser.company || ''
        })
      );

      navigate('/account');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="page login">
      <section className="card">
        <h1>Signin to your Popx account</h1>
        <p>Welcome back. Sign in to continue.</p>

        <form onSubmit={handleSubmit} className="stack">
          <div className="field">
            <input
              name="email"
              className="input"
              type="email"
              placeholder=" "
              value={login.email}
              onChange={handleChange}
              required
            />
            <label>Email Address</label>
          </div>

          <div className="field">
            <input
              name="password"
              className="input"
              type="password"
              placeholder=" "
              value={login.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          <button className="btn" type="submit">Login</button>
        </form>

        <p className="text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
