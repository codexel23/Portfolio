import { render } from '@redwoodjs/testing/web'

import ProjectsDevvaultPage from './DevvaultPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProjectsDevvaultPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProjectsDevvaultPage />)
    }).not.toThrow()
  })
})
