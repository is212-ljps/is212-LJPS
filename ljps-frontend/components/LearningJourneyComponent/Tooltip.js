import react, { useRef, useEffect } from 'react'


export default function Tooltip({ description }) {
  const tooltipRef = useRef()
  useEffect(() => {
    if (!tooltipRef?.current) return
    setTimeout(() => {
      bootstrap.Tooltip.getOrCreateInstance(tooltipRef.current)
    }, 100);
  }, [tooltipRef.current, tooltipRef])


  return <i
    className="bi bi-info-circle-fill mx-2 "
    data-bs-toggle="tooltip"
    data-bs-placement="bottom"
    ref={tooltipRef}
    data-trigger="manual"
    data-bs-title={description}
    
  ></i>
}