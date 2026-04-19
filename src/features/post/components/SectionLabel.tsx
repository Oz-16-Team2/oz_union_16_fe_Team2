type SectionLabelProps = {
  label: string
  required?: boolean
}

export function SectionLabel({ label, required = false }: SectionLabelProps) {
  return (
    <span className="flex items-center gap-0.5 text-sm font-semibold text-text-primary">
      {label}
      {required && <span className="text-status-error-text">*</span>}
    </span>
  )
}
