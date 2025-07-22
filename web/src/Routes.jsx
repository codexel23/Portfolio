import { Router, Route, Set} from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import DevvaultLayout from 'src/layouts/DevvaultLayout/DevvaultLayout'

import ContactPage from 'src/pages/ContactPage/ContactPage'
import AboutPage from 'src/pages/AboutPage/AboutPage'
import ProjectsPage from 'src/pages/ProjectsPage/ProjectsPage'
import HomePage from 'src/pages/HomePage/HomePage'
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage'

import MyDevprojectsPage from 'src/pages/DevVault/MyDevprojectsPage/MyDevprojectsPage'
import DevvaultPage from 'src/pages/DevVault/DevvaultPage/DevvaultPage'
import LoginPage from 'src/pages/DevVault/LoginPage/LoginPage'
import AdminPanelPage from 'src/pages/DevVault/AdminPanelPage/AdminPanelPage'
import HowItWorksPage from 'src/pages/DevVault/HowItWorksPage/HowItWorksPage'

const Routes = () => {
  return (
    <Router>

      <Set wrap={MainLayout}>

        <Route path="/contact" page={ContactPage} name="contact" />
        <Route path="/about-me" page={AboutPage} name="about" />
        <Route path="/projects" page={ProjectsPage} name="projects" />
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />

      </Set>

      <Set wrap={DevvaultLayout}>

      <Route path="/devvault" page={DevvaultPage} name="projectsDevvault" />
      <Route path="/my-devprojects" page={MyDevprojectsPage} name="my-devprojects" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/admin-panel" page={AdminPanelPage} name="admin-panel" />
      <Route path="/how-it-works" page={HowItWorksPage} name="how-it-works" />

      </Set>

    </Router>
  )
}

export default Routes
