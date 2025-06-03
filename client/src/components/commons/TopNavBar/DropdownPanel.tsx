import { ReactNode, forwardRef } from "react"
import { CSSTransition } from "react-transition-group"

type DropdownPanelProps = {
  inProp: boolean
  classNames: string
  onEnter: (node: HTMLElement, isAppearing: boolean) => void
  children: ReactNode
}

const DropdownPanel = forwardRef<HTMLDivElement, DropdownPanelProps>(
  (props, ref) => {
    const { inProp, classNames, onEnter, children } = props

    return (
      <CSSTransition
        in={inProp}
        timeout={500}
        classNames={classNames}
        unmountOnExit
        onEnter={onEnter}
        nodeRef={ref as any}
      >
        <div className="menu" ref={ref}>
          {children}
        </div>
      </CSSTransition>
    )
  }
)

export default DropdownPanel
