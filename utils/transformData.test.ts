import { transformData } from './transformData'

describe('transformData', () => {
  it('transforms a simple object from camelCase to snake_case', () => {
    const input = {
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
    }

    const expectedOutput = {
      first_name: 'John',
      last_name: 'Doe',
      email_address: 'john.doe@example.com',
    }

    const result = transformData<typeof expectedOutput>(input)
    expect(result).toEqual(expectedOutput)
  })

  it('transforms a nested object from camelCase to snake_case', () => {
    const input = {
      userProfile: {
        firstName: 'John',
        lastName: 'Doe',
      },
      contactInfo: {
        emailAddress: 'john.doe@example.com',
        phoneNumber: '123-456-7890',
      },
    }

    const expectedOutput = {
      user_profile: {
        first_name: 'John',
        last_name: 'Doe',
      },
      contact_info: {
        email_address: 'john.doe@example.com',
        phone_number: '123-456-7890',
      },
    }

    const result = transformData<typeof expectedOutput>(input)
    expect(result).toEqual(expectedOutput)
  })

  it('handles empty objects', () => {
    const input = {}
    const expectedOutput = {}

    const result = transformData<typeof expectedOutput>(input)
    expect(result).toEqual(expectedOutput)
  })

  it('handles objects with null values', () => {
    const input = {
      firstName: 'John',
      lastName: null,
    }

    const expectedOutput = {
      first_name: 'John',
      last_name: null,
    }

    const result = transformData<typeof expectedOutput>(input)
    expect(result).toEqual(expectedOutput)
  })
})
