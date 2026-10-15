import { IS_PREVIEW } from '../lib/env'

/**
 * Visible only in local dev and preview builds (VITE_PREVIEW): marks where an owner input (contact,
 * date, asset) is still missing. Renders nothing in production builds, so no
 * placeholder contacts or dead buttons are ever public.
 */
export default function OwnerTodo({ children }) {
  if (!IS_PREVIEW) return null
  return <span className="owner-todo">Owner input needed: {children}</span>
}
