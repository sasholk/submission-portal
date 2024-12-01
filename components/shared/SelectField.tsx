import { FormSchema } from '@/utils/validation/form'
import React from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form'
import Select from 'react-select'

interface SelectFieldProps {
  id:
    | 'name'
    | 'email'
    | 'assignmentDescription'
    | 'githubUrl'
    | 'candidateLevel'
  label: string
  options: { value: string; label: string }[]
  control: Control<FormSchema>
  register: UseFormRegister<FormSchema>
  errors: FieldErrors<FormSchema>
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  options,
  control,
  register,
  errors,
}) => {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <Controller
        {...register(id)}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            id={id}
            options={options}
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
      <p className='text-red-700 mt-1'>{errors[id] && errors[id].message}</p>
    </div>
  )
}

export default SelectField
