import { useEffect, useRef } from "react"

function useTimeout(cbFn: () => void, delay: number = 3000) {
  const savedCBRef = useRef(cbFn)

  useEffect(() => {
    savedCBRef.current = cbFn
  }, [cbFn])

  useEffect(() => {
    const fnId = setTimeout(() => savedCBRef.current(), delay)
    return () => clearTimeout(fnId)
  }, [])
}

export default useTimeout
