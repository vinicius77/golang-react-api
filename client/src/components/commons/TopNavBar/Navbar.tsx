import { ReactNode } from "react"

type NavbarProps = {
  children: ReactNode
}

function Navbar({ children }: NavbarProps) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{children}</ul>
    </nav>
  )
}

export default Navbar
