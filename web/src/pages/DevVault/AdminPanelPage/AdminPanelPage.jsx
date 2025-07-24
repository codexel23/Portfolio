import { useState } from 'react'
import { gql, useMutation } from '@redwoodjs/web'
import styles from './AdminPanelPage.module.css'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
    }
  }
`

const AdminUserCreator = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
  onCompleted: () => {
    setStatus('✅ Created!')
    setUsername('')
    setPassword('')
  },
  onError: (err) => {
    setStatus(`❌ ${err.message}`)
  },
  })

    const handleSubmit = (e) => {
    e.preventDefault()
    createUser({ variables: { input: { username, password } } })
  }

  return (
    <div className={styles['create-user-panel']}>
    <form onSubmit={handleSubmit} style={{ margin: '2rem' }}>
      <h3>Create User (Admin Only)</h3>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
        </button>
      <p>{status}</p>
      {error && <p className='error'>GraphQL Error: {error.message}</p>}
    </form>
    </div>
  )
}

export default AdminUserCreator
