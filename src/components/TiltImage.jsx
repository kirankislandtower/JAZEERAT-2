// Plain image block. It used to tilt in 3D on hover; that was removed to keep
// the blog pages calm.
export default function TiltImage({ src, alt, className = '', loading = 'lazy' }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        className="w-full h-full object-cover shadow-2xl rounded-sm"
      />
    </div>
  )
}
