import { useCandidateLevels } from '@/hooks/useCandidateLevels'
import { submitForm } from '@/services/submit'
import '@testing-library/jest-dom' // Import this to extend Jest matchers
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { redirect } from 'next/navigation' // Import to mock later
import AssignmentSubmissionForm from './AssignmentSubmissionForm'

jest.mock('@/hooks/useCandidateLevels')
jest.mock('@/services/submit')

beforeEach(() => {
  ;(useCandidateLevels as jest.Mock).mockReturnValue({
    levels: ['Junior', 'Middle', 'Senior', 'Principal'],
    error: null,
    isLoading: false,
  })
})

it('renders all form fields correctly', () => {
  render(<AssignmentSubmissionForm />)

  expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Assignment Description/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/GitHub Repository URL/i)).toBeInTheDocument()
  // TODO: fix this test
  // expect(screen.getByLabelText(/Candidate Level/i)).toBeInTheDocument()
})

it('displays validation errors when inputs are invalid', async () => {
  render(<AssignmentSubmissionForm />)

  fireEvent.submit(screen.getByRole('button', { name: /Submit Assignment/i }))

  await waitFor(() => {
    expect(
      screen.getByText(/Name must be at least 2 characters/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Description must be at least 10 character/i)
    ).toBeInTheDocument()
    // TODO: fix this test
    // expect(screen.getByText(/Invalid GitHub URL/i)).toBeInTheDocument()
    expect(screen.getByText(/Invalid candidate level/i)).toBeInTheDocument()
  })
})

it('disables submit button if required fields are missing', () => {
  render(<AssignmentSubmissionForm />)

  const submitButton = screen.getByRole('button', {
    name: /Submit Assignment/i,
  })
  expect(submitButton).toBeDisabled()
})

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  redirect: jest.fn(), // Mock the redirect function
}))

it('calls submitForm with correct data including Candidate Level', async () => {
  // Mock the submitForm API response
  ;(submitForm as jest.Mock).mockResolvedValue({ data: true, errors: null })

  // Render the AssignmentSubmissionForm component
  render(<AssignmentSubmissionForm />)

  // Fill out all required form fields
  fireEvent.input(screen.getByLabelText(/Name/i), {
    target: { value: 'John Doe' },
  })
  fireEvent.input(screen.getByLabelText(/Email/i), {
    target: { value: 'john@example.com' },
  })
  fireEvent.input(screen.getByLabelText(/Assignment Description/i), {
    target: { value: 'This is my assignment description.' },
  })
  fireEvent.input(screen.getByLabelText(/GitHub Repository URL/i), {
    target: { value: 'https://github.com/johndoe/assignment' },
  })

  // Interact with the Candidate Level select field
  const candidateLevelDropdown = screen.getByLabelText(/Candidate Level/i)
  fireEvent.keyDown(candidateLevelDropdown, { key: 'ArrowDown' })
  fireEvent.click(screen.getByText('Junior'))

  // Submit the form
  fireEvent.submit(screen.getByRole('button', { name: /Submit Assignment/i }))

  // Assert that submitForm was called with the correct data
  await waitFor(() => {
    expect(submitForm).toHaveBeenCalled()

    // Verify the content of FormData
    const formData = (submitForm as jest.Mock).mock.calls[0][0] // Retrieve FormData passed to submitForm
    expect(formData.get('name')).toBe('John Doe')
    expect(formData.get('email')).toBe('john@example.com')
    expect(formData.get('assignmentDescription')).toBe(
      'This is my assignment description.'
    )
    expect(formData.get('githubRepoUrl')).toBe(
      'https://github.com/johndoe/assignment'
    )
    expect(formData.get('candidateLevel')).toBe('Junior')
  })

  // Ensure redirect was called
  expect(redirect).toHaveBeenCalledWith(expect.stringMatching(/\/thank-you\?/))
})

it('renders dropdown options correctly when levels are fetched', async () => {
  render(<AssignmentSubmissionForm />)

  // Open the dropdown
  fireEvent.mouseDown(screen.getByLabelText(/Candidate Level/i))

  // Check if the dropdown options are rendered correctly
  await waitFor(() => {
    expect(
      screen.getByText(content => content.includes('Junior'))
    ).toBeInTheDocument()
    expect(
      screen.getByText(content => content.includes('Middle'))
    ).toBeInTheDocument()
    expect(
      screen.getByText(content => content.includes('Senior'))
    ).toBeInTheDocument()
    expect(
      screen.getByText(content => content.includes('Principal'))
    ).toBeInTheDocument()
  })
})

it('displays an error message when levels fail to fetch', async () => {
  ;(useCandidateLevels as jest.Mock).mockReturnValue({
    levels: [],
    error: 'Failed to fetch levels',
    isLoading: false,
  })

  render(<AssignmentSubmissionForm />)

  await waitFor(() => {
    const errorMessage = screen.queryByText('Failed to fetch levels')
    expect(errorMessage).toBeInTheDocument()
  })
})
