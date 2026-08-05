import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { FieldLabel, FieldWrapper } from '../../styles/field'
import { Field } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Rótulo visível do campo, ligado ao input por `htmlFor` */
  label: string
}

function Input({ label, id, ...rest }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <FieldWrapper>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <Field id={inputId} {...rest} />
    </FieldWrapper>
  )
}

export default Input
