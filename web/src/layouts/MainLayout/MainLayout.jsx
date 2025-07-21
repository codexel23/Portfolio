import Navbar from 'src/components/Navbar/Navbar'
import styles from './MainLayout.module.css'

const MainLayout = ({ children }) => {
  return (
    <div>
      <header className={styles.header}>
      <h1 className={styles.h1}>My Developing Developer Portfolio</h1>
      </header>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default MainLayout