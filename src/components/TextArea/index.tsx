import { useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { FieldError, FieldLabel, FieldWrapper } from '../../styles/field'
import { Field } from './styles'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Rótulo visível do campo, ligado ao textarea por `htmlFor` */
  label: string
  /** Mensagem de erro. Presente = campo inválido. */
  error?: string
}

function TextArea({ label, error, id, ...rest }: TextAreaProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorId = `${fieldId}-error`

  return (
    <FieldWrapper>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <Field
        id={fieldId}
        $invalido={Boolean(error)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && (
        <FieldError id={errorId} role="alert">
          {error}
        </FieldError>
      )}
    </FieldWrapper>
  )
}

export default TextArea
