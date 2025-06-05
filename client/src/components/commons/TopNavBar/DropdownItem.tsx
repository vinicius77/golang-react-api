import { ReactNode } from "react"

type DropdownItemProps = {
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  goToMenu?: string
  onClick?: (menu: string) => void
}

function DropdownItem(props: DropdownItemProps) {
  const { children, leftIcon, rightIcon, goToMenu, onClick } = props

  return (
    <a
      href="#"
      className="menu-item"
      onClick={(e) => {
        e.preventDefault()
        if (goToMenu && onClick) onClick(goToMenu)
      }}
    >
      <span className="icon-button">{leftIcon}</span>
      {children}
      <span className="icon-right">{rightIcon}</span>
    </a>
  )
}

export default DropdownItem
