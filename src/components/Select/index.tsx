import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { FieldError, FieldLabel, FieldWrapper } from '../../styles/field'
import type { ItemDeCatalogo } from '../../types/denuncia'
import { Chevron, Control, Field } from './styles'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  /** Rótulo visível do campo, ligado ao select por `htmlFor` */
  label: string
  /** Texto da primeira opção, exibida enquanto nada foi escolhido */
  placeholder: string
  /** O `id` vai no `value` e para a API; o `nome` é o que aparece na tela. */
  options: readonly ItemDeCatalogo[]
  /** Mensagem de erro. Presente = campo inválido. */
  error?: string
  /** Deixa a opção do placeholder selecionável, para "todos" em filtros. */
  placeholderSelecionavel?: boolean
}

function Select({
  label,
  placeholder,
  options,
  error,
  placeholderSelecionavel = false,
  id,
  ...rest
}: SelectProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorId = `${fieldId}-error`

  return (
    <FieldWrapper>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <Control>
        <Field
          id={fieldId}
          $invalido={Boolean(error)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        >
          <option value="" disabled={!placeholderSelecionavel}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nome}
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
      {error && (
        <FieldError id={errorId} role="alert">
          {error}
        </FieldError>
      )}
    </FieldWrapper>
  )
}

export default Select
