import styles from './DevvaultLayout.module.css'
import { useState } from 'react'
import { Link } from '@redwoodjs/router'


const DevvaultLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.button} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
        <h1 className={styles.title}>DevVault 2.0</h1>
      </header>
      <div className={styles.layout}>
        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
          <div className={`${styles.sidebarContent} ${isSidebarOpen ? styles.slideDown : ''}`}>
            <ul>
              <li><Link to='/devvault'>Dashboard</Link></li>
              <li><Link to='/my-devprojects'>My Projects</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/admin-panel'>Admin Panel</Link></li>
              <li><Link to='/how-it-works'>How It Works</Link></li>
              <li><Link to='/projects'>Back To Portfolio</Link></li>
            </ul>
          </div>
        </aside>
        <main className={`${styles['main']} ${styles['layout-content']}`}>{children}</main>
      </div>
    </div>
  )
}

export default DevvaultLayout