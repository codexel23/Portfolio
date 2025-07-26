import { useState } from 'react'
import { useDevVaultAuth } from './DevVaultAuthContext'

const LoginForm = () => {
  const { logIn } = useDevVaultAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await logIn(username, password)
      setError(null)
      setSuccess(true)
      setTimeout(() => {
      window.location.href = '/devvault'
    }, 1500)
    } catch (err) {
      setError('Login failed — check username or password')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>DevVault Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
      {success && <p className="success">✅ Login successful! Redirecting...</p>}
      {error && <p className="error">{error}</p>}

      <style>{`
        .login-form {
          width: 100%;
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #1e1e1e;
          color: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .login-form h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }

        .login-form input {
          display: block;
          width: 100%;
          padding: 0.8rem 1rem;
          margin: 0 auto 1rem;
          border: 0;
          border-radius: 8px;
          background: #333;
          color: #fff;
          font-size: 1rem;
          box-sizing: border-box;
        }

        .login-form input::placeholder {
          color: #aaa;
        }

        .login-form button {
          width: 100%;
          padding: 0.8rem 1rem;
          border: none;
          border-radius: 8px;
          background-color: #00ffaa;
          color: #000;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .login-form button:hover {
          background-color: #00e699;
        }

        .error {
          color: #ff6b6b;
          text-align: center;
          margin-top: 1rem;
        }

        .success {
          color: #00ffaa;
          text-align: center;
          margin-top: 1rem;
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>
    </form>
  )
}

export default LoginForm
