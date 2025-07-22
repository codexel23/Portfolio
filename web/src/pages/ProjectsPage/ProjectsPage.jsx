// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Link } from '@redwoodjs/router'

const ProjectsPage = () => {
  return (
    <>
      <Metadata title="Projects" description="Projects page" />

      <ul>

       <li><Link to="/devvault">DevVault</Link></li>
       
      </ul>

    </>
  )
}

export default ProjectsPage
