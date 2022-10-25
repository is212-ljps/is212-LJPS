import react, { useRef, useEffect } from 'react'


export default function Tooltip({ description }) {
  const tooltip = useRef()
  useEffect(() => {
    if(!tooltip.current) return
    const tooltip = bootstrap.Tooltip.getOrCreateInstance(tooltip.current)
  }, [tooltip])
  

  return <i
    className="bi bi-info-circle-fill mx-2 "
    data-bs-toggle="tooltip"
    data-bs-placement="bottom"
    ref={tooltip}
    data-trigger="manual"
    data-bs-title={description}
  ></i>
}