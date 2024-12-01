import { FormSchema } from '@/utils/validation/form'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface Props {
  id:
    | 'name'
    | 'email'
    | 'assignmentDescription'
    | 'githubUrl'
    | 'candidateLevel'
  label: string
  type?: 'text' | 'email' | 'url' | 'textarea'
  register: UseFormRegister<FormSchema>
  errors: FieldErrors<FormSchema>
}

const FormField: React.FC<Props> = ({
  id,
  label,
  type = 'text',
  register,
  errors,
}) => {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          {...register(id)}
          name={id}
          // value={value}
          // onChange={onChange}
          // required={required}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        />
      ) : (
        <input
          type={type}
          id={id}
          {...register(id)}
          name={id}
          // value={value}
          // onChange={onChange}
          // required={required}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        />
      )}
      <p className='text-red-700 mt-1'>{errors[id] && errors[id].message}</p>
    </div>
  )
}

export default FormField
