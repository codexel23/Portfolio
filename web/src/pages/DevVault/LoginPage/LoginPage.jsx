// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const LoginPage = () => {
  return (
    <>
      <Metadata title="Login" description="Login page" />

      <h1>LoginPage</h1>
      <p>
        Find me in <code>./web/src/pages/LoginPage/LoginPage.jsx</code>
      </p>
      {/*
           My default route is named `login`, link to me with:
           `<Link to={routes.login()}>Login</Link>`
        */}
    </>
  )
}

export default LoginPage
