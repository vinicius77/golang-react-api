import { useState, useRef } from "react"

import DropdownItem from "@/components/commons/TopNavBar/DropdownItem"

import Arrow from "@/icons/arrow.svg?react"
import Bolt from "@/icons/bolt.svg?react"
import Chevron from "@/icons/chevron.svg?react"
import Cog from "@/icons/cog.svg?react"

import { CSSTransition } from "react-transition-group"

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const mainMenuRef = useRef<HTMLDivElement>(null)
  const settingsMenuRef = useRef<HTMLDivElement>(null)
  const animalsMenuRef = useRef<HTMLDivElement>(null)

  return (
    <div className="dropdown" ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        nodeRef={mainMenuRef} // pass nodeRef here
      >
        <div className="menu" ref={mainMenuRef}>
          <DropdownItem leftIcon="🦧" onClick={setActiveMenu}>
            My Profile
          </DropdownItem>
          <DropdownItem
            onClick={setActiveMenu}
            leftIcon={<Cog />}
            rightIcon={<Chevron />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            onClick={setActiveMenu}
            leftIcon="🦧"
            rightIcon={<Chevron />}
            goToMenu="animals"
          >
            Animals
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        nodeRef={settingsMenuRef} // pass nodeRef here
      >
        <div className="menu" ref={settingsMenuRef}>
          <DropdownItem
            goToMenu="main"
            leftIcon={<Arrow />}
            onClick={setActiveMenu}
          >
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<Bolt />} onClick={setActiveMenu}>
            HTML
          </DropdownItem>
          <DropdownItem leftIcon={<Bolt />} onClick={setActiveMenu}>
            CSS
          </DropdownItem>
          <DropdownItem leftIcon={<Bolt />} onClick={setActiveMenu}>
            JavaScript
          </DropdownItem>
          <DropdownItem leftIcon={<Bolt />} onClick={setActiveMenu}>
            Awesome!
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        nodeRef={animalsMenuRef}
      >
        <div className="menu" ref={animalsMenuRef}>
          <DropdownItem
            goToMenu="main"
            leftIcon={<Arrow />}
            onClick={setActiveMenu}
          >
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘" onClick={setActiveMenu}>
            Kangaroo
          </DropdownItem>
          <DropdownItem leftIcon="🐸" onClick={setActiveMenu}>
            Frog
          </DropdownItem>
          <DropdownItem leftIcon="🦋" onClick={setActiveMenu}>
            Horse
          </DropdownItem>
          <DropdownItem leftIcon="🦔" onClick={setActiveMenu}>
            Hedgehog
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

export default DropdownMenu
