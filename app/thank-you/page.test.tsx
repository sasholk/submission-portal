import '@testing-library/jest-dom' // Import this to extend Jest matchers
import { render, screen } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'
import Home from './page'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/thank-you',
    query: {},
    asPath: '/thank-you',
  })),
}))

describe('Home', () => {
  beforeEach(() => {
    ;(useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: { [key: string]: string } = {
          name: 'John Doe',
          email: 'john@example.com',
          assignmentDescription: 'This is my assignment description.',
          githubRepoUrl: 'https://github.com/johndoe/assignment',
          candidateLevel: 'Junior',
        }
        return params[key] || null // Return null if key doesn't exist
      },
    })
  })

  it('displays the correct confirmation message', () => {
    render(<Home />)

    expect(
      screen.getByText('Thank you for your submission!')
    ).toBeInTheDocument()
    expect(
      screen.getByText('We sent this data to server🥳')
    ).toBeInTheDocument()
  })

  it('displays the correct user data', () => {
    render(<Home />)

    expect(screen.getByText(/Name: John Doe/)).toBeInTheDocument()
    expect(screen.getByText(/Email: john@example.com/)).toBeInTheDocument()
    expect(
      screen.getByText(
        /Assignment Description: This is my assignment description./
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(/GitHub URL: https:\/\/github\.com\/johndoe\/assignment/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Candidate Level: Junior/)).toBeInTheDocument()
  })
})
