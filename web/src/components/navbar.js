import { Link } from '@redwoodjs/router'

const navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about-me">About Me</Link></li>
      <li><Link to="/projects">Projects</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  </nav>
)