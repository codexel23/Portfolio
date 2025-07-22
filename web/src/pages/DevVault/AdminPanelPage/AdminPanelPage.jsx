// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AdminPanelPage = () => {
  return (
    <>
      <Metadata title="Admin Panel" description="AdminPanel page" />

      <h1>AdminPanelPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/AdminPanelPage/AdminPanelPage.jsx</code>
      </p>
      {/*
           My default route is named `adminPanel`, link to me with:
           `<Link to={routes.adminPanel()}>AdminPanel</Link>`
        */}
    </>
  )
}

export default AdminPanelPage
