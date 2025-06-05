import { useContext } from "react"

import Navbar from "@/components/commons/TopNavBar/Navbar"
import NavItem from "@/components/commons/TopNavBar/NavItem"
import DropdownMenu from "@/components/commons/TopNavBar/DropdownMenu"

import BellIcon from "@/icons/bell.svg?react"
import Plus from "@/icons/plus.svg?react"
import Caret from "@/icons/caret.svg?react"

import { AuthContext } from "@/contexts/auth-context"

import "./Topbar.css"

const TopNavbar = () => {
  const authContext = useContext(AuthContext)
  if (!authContext?.state?.user) return null

  return (
    <Navbar>
      <NavItem icon={<Plus />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<Caret />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  )
}

export default TopNavbar
