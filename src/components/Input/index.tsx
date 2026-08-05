import type { InputHTMLAttributes } from 'react'
import { VisuallyHidden } from '../../styles/typography'
import { Field, Wrapper } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Rótulo do campo. Fica oculto visualmente, mas é lido por leitores de tela. */
  label: string
}

function Input({ label, ...rest }: InputProps) {
  return (
    <Wrapper>
      <VisuallyHidden>{label}</VisuallyHidden>
      <Field {...rest} />
    </Wrapper>
  )
}

export default Input
