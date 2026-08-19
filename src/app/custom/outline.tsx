import { useId } from "react"

interface OutlinedProps {
  outlineColor?: string
  radius?: number
  children: React.ReactNode
  className?: string
}

export function Outlined({ outlineColor = 'black', radius=3, children, className }: OutlinedProps) {
  const uid = useId().replace(/:/g, '')
  const filterId = `outlined-${uid}`

  return (
    <>
      <svg aria-hidden style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feMorphology operator="dilate" radius={radius} in="SourceAlpha" result="expanded" />
            <feFlood floodColor={outlineColor} result="color" />
            <feComposite in="color" in2="expanded" operator="in" result="coloredOutline" />
            <feMerge>
              <feMergeNode in="coloredOutline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <span className={className} style={{ filter: `url(#${filterId})` }}>
        {children}
      </span>
    </>
  )
}