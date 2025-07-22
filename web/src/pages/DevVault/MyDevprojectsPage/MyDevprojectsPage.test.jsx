import { render } from '@redwoodjs/testing/web'

import MyDevprojectsPage from './MyDevprojectsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MyDevprojectsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MyDevprojectsPage />)
    }).not.toThrow()
  })
})
