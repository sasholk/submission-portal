import { FormFieldEnum } from '@/types/form'
import { FormSchema } from '@/utils/validation/form'
import cn from 'classnames'
import React from 'react'
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from 'react-hook-form'
import Select from 'react-select'
import ErrorMessage from '../ui/ErrorMessage'

interface SelectFieldProps {
  id: FormFieldEnum
  label: string
  options: { value: string; label: string }[]
  control: Control<FormSchema>
  register: UseFormRegister<FormSchema>
  error?: FieldError
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  options,
  control,
  error,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>

      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            className={cn('rounded-md', { 'border-2 border-red-500': error })}
            id={id}
            isClearable
            onChange={selectedOption => {
              // Update the value correctly for react-hook-form
              field.onChange(selectedOption?.value || '')
            }}
            value={options.find(option => option.value === field.value) || null}
            theme={theme => ({
              ...theme,
              borderRadius: 4,
              colors: {
                ...theme.colors,
                primary50: '#d6aa9f',
                primary25: '#f4e2d1',
                primary: '#987185',
              },
            })}
          />
        )}
      />

      {error && <ErrorMessage message={error.message} />}
    </div>
  )
}

export default SelectField
