import React from 'react'

interface ErrorMessageProps {
  message: string | null
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null
  return <p className='text-red-500 mb-4'>{message}</p>
}

export default ErrorMessage
