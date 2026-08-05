import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { FieldLabel, FieldWrapper } from '../../styles/field'
import { Chevron, Control, Field } from './styles'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  /** Rótulo visível do campo, ligado ao select por `htmlFor` */
  label: string
  /** Texto da primeira opção, exibida enquanto nada foi escolhido */
  placeholder: string
  options: readonly string[]
}

function Select({ label, placeholder, options, id, ...rest }: SelectProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <FieldWrapper>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <Control>
        <Field id={fieldId} defaultValue="" {...rest}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Field>
        <Chevron>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Chevron>
      </Control>
    </FieldWrapper>
  )
}

export default Select
