import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { FieldError, FieldHint, FieldLabel, FieldWrapper } from '../../styles/field'
import { Field } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Rótulo visível do campo, ligado ao input por `htmlFor` */
  label: string
  /** Regras de preenchimento, mostradas abaixo do campo. Some quando há erro. */
  hint?: string
  /** Mensagem de erro. Presente = campo inválido. */
  error?: string
}

function Input({ label, hint, error, id, ...rest }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`

  // A dica dá lugar ao erro: as duas juntas empurram o campo seguinte e competem pela leitura.
  const mostrarHint = Boolean(hint) && !error

  return (
    <FieldWrapper>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <Field
        id={inputId}
        $invalido={Boolean(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : mostrarHint ? hintId : undefined}
        {...rest}
      />
      {mostrarHint && <FieldHint id={hintId}>{hint}</FieldHint>}
      {error && (
        <FieldError id={errorId} role="alert">
          {error}
        </FieldError>
      )}
    </FieldWrapper>
  )
}

export default Input
