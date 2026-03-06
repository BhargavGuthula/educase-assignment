import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './Firebase/firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    company: '',
    agency: 'yes'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCred.user, { displayName: form.name });

      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          uid: userCred.user.uid,
          email: userCred.user.email,
          name: form.name,
          phoneNumber: form.phoneNumber,
          company: form.company,
          agency: form.agency
        })
      );

      navigate('/account');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="page signup">
      <section className="card">
        <h1>Create your popx account</h1>

        <form onSubmit={handleSubmit} className="stack">
          <div className="field">
            <input
              name="name"
              className="input"
              type="text"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>Full Name</label>
          </div>
          <div className="field">
            <input
              name="phoneNumber"
              className="input"
              type="tel"
              placeholder=" "
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
            <label>Phone number</label>
          </div>
          <div className="field">
            <input
              name="email"
              className="input"
              type="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Email address</label>
          </div>
          <div className="field">
            <input
              name="password"
              className="input"
              type="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>
          <div className="field">
            <input
              name="company"
              className="input"
              type="text"
              placeholder=" "
              value={form.company}
              onChange={handleChange}
              required
            />
            <label>Company name</label>
          </div>
          <div className="agency-group">
            <p>Are you an Agency?</p>
            <div className="agency-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="agency"
                  value="yes"
                  checked={form.agency === 'yes'}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="agency"
                  value="no"
                  checked={form.agency === 'no'}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          <button className="btn" type="submit">
            Sign up
          </button>
        </form>

        <p className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;
