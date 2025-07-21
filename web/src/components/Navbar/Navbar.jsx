import { Link } from '@redwoodjs/router'
import styles from './Navbar.module.css'

const navbar = () => {
  return (
  <nav className={styles.navbar}>
    <ul className={styles.navList}>
      <li><Link to="/" className={styles.navLink}>Home</Link></li>
      <li><Link to="/about-me" className={styles.navLink}>About Me</Link></li>
      <li><Link to="/projects" className={styles.navLink}>Projects</Link></li>
      <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
    </ul>
  </nav>
  )
}

export default navbar