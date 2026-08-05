import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Field, Label, Wrapper } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Rótulo visível do campo, ligado ao input por `htmlFor` */
  label: string
}

function Input({ label, id, ...rest }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <Wrapper>
      <Label htmlFor={inputId}>{label}</Label>
      <Field id={inputId} {...rest} />
    </Wrapper>
  )
}

export default Input
