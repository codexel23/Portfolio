import { render } from '@redwoodjs/testing/web'

import DevvaultLayout from './DevvaultLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DevvaultLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DevvaultLayout />)
    }).not.toThrow()
  })
})
