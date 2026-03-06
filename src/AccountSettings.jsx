import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase/firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import avatarImage from './assets/round-profile-image-of-man-avatar-for-social-networks-fashion-beauty-blue-and-black-bright-illustration-in-trendy-style-vector.jpg';

function AccountSettings() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        navigate('/login');
        return;
      }

      const localUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      setUser({
        name: localUser.name || firebaseUser.displayName || 'Person',
        email: firebaseUser.email || localUser.email || '',
        phoneNumber: localUser.phoneNumber || '',
        company: localUser.company || ''
      });
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!user) {
    return (
      <main className="page">
        <section className="card">
          <p>Loading...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page account-page">
      <section className="card account">
        <h1 className="account-title">Account Settings</h1>
        <div className="account-body">
          <img src={avatarImage} alt="Profile" className="avatar" />
          <div className="account-details">
            <h4 className="account-name">{user.name}</h4>
            <p className="account-email">{user.email}</p>
            {user.phoneNumber ? <p className="account-email">{user.phoneNumber}</p> : null}
            {user.company ? <p className="account-email">{user.company}</p> : null}
          </div>
        </div>
        <button className="btn secondary" onClick={handleLogout} type="button">
          Logout
        </button>
      </section>
    </main>
  );
}

export default AccountSettings;
