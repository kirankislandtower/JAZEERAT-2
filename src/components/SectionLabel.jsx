// `as` lets a page put its keyword H1/H2 in this small eyebrow label while the
// large slogan stays as the visual headline (same look, better heading text).
export default function SectionLabel({ index, children, as: Tag = 'span' }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {index && <span className="font-mono text-xs text-steel-light">{index}</span>}
      <span className="h-px w-8 bg-steel-light" />
      <Tag className="font-display uppercase tracking-[0.2em] text-sm text-steel font-normal m-0">{children}</Tag>
    </div>
  )
}
