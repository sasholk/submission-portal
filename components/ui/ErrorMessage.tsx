import React from 'react'

interface Props {
  message: string | undefined | null
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <p className='text-red-700'>{message}</p>
}

export default ErrorMessage
