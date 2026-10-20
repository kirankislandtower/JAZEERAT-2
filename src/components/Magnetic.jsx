// Wrapper kept for existing call sites. Buttons no longer follow the cursor.
export default function Magnetic({ children, className = '' }) {
  return <div className={`inline-block ${className}`}>{children}</div>
}
