import styles from './DevvaultLayout.module.css'
import { useState, useEffect } from 'react'
import { Link } from '@redwoodjs/router'
import { DevVaultAdminProvider } from 'src/pages/DevVault/DevVaultAdminContext'
import { DevVaultAuthProvider } from 'src/pages/DevVault/DevVaultAuthContext'
import { useDevVaultAdmin } from 'src/pages/DevVault/DevVaultAdminContext'


const DevvaultLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <DevVaultAuthProvider>
      <DevVaultAdminProvider>
        <LayoutContent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
          {children}
        </LayoutContent>
      </DevVaultAdminProvider>
    </DevVaultAuthProvider>
  )
}


const LayoutContent = ({ isSidebarOpen, setIsSidebarOpen, children }) => {
  const { isAdmin } = useDevVaultAdmin()

  return (
    <DevVaultAuthProvider>
      <DevVaultAdminProvider>
        <div className={styles.container}>
          <header className={styles.header}>
            <button
              className={styles.button}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </button>
            <h1 className={styles.title}>DevVault 2.0</h1>
          </header>

          <div className={styles.layout}>
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
              <div className={`${styles.sidebarContent} ${isSidebarOpen ? styles.slideDown : ''}`}>
                <ul>
                  <li><Link to='/devvault'>Dashboard</Link></li>
                  <li><Link to='/my-devprojects'>My Projects</Link></li>
                  <li><Link to='/login'>Login</Link></li>
                  {isAdmin && <li><Link to='/admin-panel'>Admin Panel</Link></li>}
                  <li><Link to='/how-it-works'>How It Works</Link></li>
                  <li><Link to='/projects'>Back To Portfolio</Link></li>
                </ul>
              </div>
            </aside>

            <main className={`${styles['main']} ${styles['layout-content']}`}>
              {children}
            </main>
          </div>
        </div>
      </DevVaultAdminProvider>
    </DevVaultAuthProvider>
  )
}

export default DevvaultLayout
