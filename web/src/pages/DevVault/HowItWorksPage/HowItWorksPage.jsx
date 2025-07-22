// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HowItWorksPage = () => {
  return (
    <>
      <Metadata title="How It Works" description="HowItWorks page" />

      <h1>HowItWorksPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/HowItWorksPage/HowItWorksPage.jsx</code>
      </p>
      {/*
           My default route is named `howItWorks`, link to me with:
           `<Link to={routes.howItWorks()}>HowItWorks</Link>`
        */}
    </>
  )
}

export default HowItWorksPage
