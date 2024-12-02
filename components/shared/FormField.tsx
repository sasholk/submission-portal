import { FormFieldEnum } from '@/types/form'
import { FormSchema } from '@/utils/validation/form'
import cn from 'classnames'
import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import ErrorMessage from '../ui/ErrorMessage'

interface Props {
  id: FormFieldEnum
  label: string
  type?: 'text' | 'email' | 'url' | 'textarea'
  register: UseFormRegister<FormSchema>
  error?: FieldError
}

const FormField: React.FC<Props> = ({
  id,
  label,
  type = 'text',
  register,
  error,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={id}
          {...register(id)}
          name={id}
          className={cn(
            'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm',
            {
              'border-2 border-red-500': error,
            }
          )}
        />
      ) : (
        <input
          type={type}
          id={id}
          {...register(id)}
          name={id}
          className={cn(
            'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm',
            {
              'border-2 border-red-500': error,
            }
          )}
        />
      )}

      {error && <ErrorMessage message={error.message} />}
    </div>
  )
}

export default FormField
