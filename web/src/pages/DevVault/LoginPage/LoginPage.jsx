import LoginForm from '../LoginForm'
import { Metadata } from '@redwoodjs/web'

const LoginPage = () => {
  return (
    <>
      <Metadata title="Login" description="Login page" />

      <LoginForm />

    </>
  )
}

export default LoginPage
