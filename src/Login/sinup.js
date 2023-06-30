import React, { useState } from 'react';
import './css.css';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkUserExists = async () => {
    try {
      const response = await fetch(`https://643918404660f26eb1aa3099.mockapi.io/user?email=${email}`);
      const data = await response.json();

      return data.length > 0; // Returns true if the account already exists
    } catch (error) {
      console.log('An error occurred:', error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userExists = await checkUserExists();

    if (userExists) {
      alert('Email đã tồn tại. Vui lòng thử email khác.');
      return;
    }

    try {
      const response = await fetch('https://643918404660f26eb1aa3099.mockapi.io/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, user_type: 'user' }),
      });

      if (response.ok) {
        alert('Đăng ký thành công!');
        window.location.href = 'https://project-react-2vld99xgp-hoanbui24-passerellesn.vercel.app/signup';
      } else {
        console.log('Registration failed.');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Đăng ký</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu:</label>
        <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Đăng ký</button>
    </form>
  );
}

export default RegistrationForm;
