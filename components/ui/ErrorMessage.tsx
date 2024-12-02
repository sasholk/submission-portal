import React from 'react'

interface ErrorMessageProps {
  message: string | undefined | null
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p className='text-red-700'>{message}</p>
}

export default ErrorMessage
