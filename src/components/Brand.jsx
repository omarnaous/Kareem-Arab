export default function Brand({ className = '' }) {
  return (
    <span className={`brand ${className}`}>
      BUILT<span className="brand__by">BY</span>ARAB
    </span>
  )
}
