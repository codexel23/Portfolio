// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <p id="abt-me">
        Welcome to my portfolio! I am a developer currently working on various projects to enhance my skills
      </p>
    </>
  )
}

export default HomePage
