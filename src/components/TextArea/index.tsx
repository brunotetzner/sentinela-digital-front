import { useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { FieldLabel, FieldWrapper } from '../../styles/field'
import { Field } from './styles'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Rótulo visível do campo, ligado ao textarea por `htmlFor` */
  label: string
}

function TextArea({ label, id, ...rest }: TextAreaProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <FieldWrapper>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <Field id={fieldId} {...rest} />
    </FieldWrapper>
  )
}

export default TextArea
