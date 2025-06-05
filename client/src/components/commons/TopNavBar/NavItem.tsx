import { useState, ReactNode, MouseEvent } from "react"

type NavItemProps = {
  icon: ReactNode
  children?: ReactNode
}

function NavItem({ icon, children }: NavItemProps) {
  const [open, setOpen] = useState(false)

  const onToggle = (e: MouseEvent) => {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={onToggle}>
        {icon}
      </a>
      {open && children}
    </li>
  )
}

export default NavItem
