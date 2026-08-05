import type { ButtonHTMLAttributes } from 'react'
import { StyledButton } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Texto exibido dentro do botão */
  text: string
}

function Button({ text, type = 'button', ...rest }: ButtonProps) {
  return (
    <StyledButton type={type} {...rest}>
      {text}
    </StyledButton>
  )
}

export default Button
