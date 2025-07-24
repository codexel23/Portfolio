import { useDevVaultAuth } from './DevVaultAuthContext'

const DevVaultStatus = () => {
  const { user, logOut } = useDevVaultAuth()

  return (
    <div style={{ padding: '1rem', background: '#eee', borderRadius: '8px' }}>
      {user ? (
        <>
          <p>👋 Logged in as: <strong>{user.email}</strong></p>
          <button onClick={logOut}>Log Out</button>
        </>
      ) : (
        <p>❌ Not logged in</p>
      )}
    </div>
  )
}

export default DevVaultStatus
