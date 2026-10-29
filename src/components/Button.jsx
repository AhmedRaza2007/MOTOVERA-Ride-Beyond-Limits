import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Button({ to, children, variant = 'primary', className = '', onClick, type, disabled }) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-ghost'

  const handleMove = (e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`
  }
  const handleLeave = (e) => { e.currentTarget.style.transform = '' }
  const wrapProps = {
    className: 'inline-block',
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: { transition: 'transform .25s ease' },
  }

  if (to) {
    return (
      <motion.div whileTap={{ scale: 0.97 }} {...wrapProps}>
        <Link to={to} className={`${base} ${className}`}>{children}</Link>
      </motion.div>
    )
  }
  return (
    <motion.button type={type || 'button'} onClick={onClick} disabled={disabled}
      whileTap={{ scale: 0.97 }} {...wrapProps} className={`${base} ${className}`}>
      {children}
    </motion.button>
  )
}