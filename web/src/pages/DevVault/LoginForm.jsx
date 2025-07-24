import { useState } from 'react'
import { useDevVaultAuth } from './DevVaultAuthContext'

const LoginForm = () => {
  const { logIn } = useDevVaultAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await logIn(email, password)
      setError(null)
    } catch (err) {
      setError('Login failed — check email or password')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>DevVault Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      {error && <p className="error">{error}</p>}

      <style jsx>{`
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
      `}</style>
    </form>
  )
}

export default LoginForm
