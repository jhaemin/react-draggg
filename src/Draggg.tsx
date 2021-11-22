import React, { useCallback, useEffect, useRef } from 'react'

const isTouchScreen =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches

const { map, only } = React.Children

const getScreenDistance = (
  e: MouseEvent | TouchEvent,
  direction: 'screenX' | 'screenY'
) => {
  if (isTouchScreen) {
    return (e as TouchEvent).touches[0][direction]
  }

  return (e as MouseEvent)[direction]
}

export type DragggData = {
  /**
   * Updated x-axis position based on the given `basePosition`.
   * If you don't pass anything to `basePosition`, it is same as `deltaX`.
   */
  x: number
  /**
   * Updated y-axis position based on the given `basePosition`.
   * If you don't pass anything to `basePosition`, it is same as `deltaY`.
   */
  y: number
  /**
   * x-axis Distance from the drag start.
   */
  deltaX: number
  /**
   * y-axis Distance from the drag start.
   */
  deltaY: number
}

export type DragggCallback = (data: DragggData) => void

export type DragggProps = {
  stopPropagation?: boolean
  onDrag?: DragggCallback
  onStart?: DragggCallback
  onEnd?: DragggCallback
  /**
   * The initial x, y on every drag start.
   */
  basePosition?: { x: number; y: number }
}

const Draggg: React.FC<DragggProps> = ({
  children,
  stopPropagation,
  onDrag,
  onStart,
  onEnd,
  basePosition = { x: 0, y: 0 },
}) => {
  const childRef = useRef<HTMLElement>(null!)
  const dragInfoRef = useRef({
    eventsAttached: false,
    dragging: false,
    initX: NaN,
    initY: NaN,
    deltaX: 0,
    deltaY: 0,
    baseX: basePosition.x,
    baseY: basePosition.y,
  })

  let clonedChildren = null

  const move = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const deltaX = getScreenDistance(e, 'screenX') - dragInfoRef.current.initX
      const deltaY = getScreenDistance(e, 'screenY') - dragInfoRef.current.initY

      dragInfoRef.current.deltaX = deltaX
      dragInfoRef.current.deltaY = deltaY

      // console.log({ deltaX, deltaY })

      const { baseX, baseY } = dragInfoRef.current

      onDrag?.({ x: baseX + deltaX, y: baseY + deltaY, deltaX, deltaY })
    },
    [onDrag]
  )

  const end = useCallback(() => {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', end)

    window.removeEventListener('touchmove', move)
    window.removeEventListener('touchend', end)

    const { deltaX, deltaY, baseX, baseY } = dragInfoRef.current

    onEnd?.({ x: baseX + deltaX, y: baseY + deltaY, deltaX, deltaY })
  }, [move, onEnd])

  const start = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (stopPropagation) {
        e.stopPropagation()
      }

      e.preventDefault()

      dragInfoRef.current.initX = getScreenDistance(e, 'screenX')
      dragInfoRef.current.initY = getScreenDistance(e, 'screenY')

      dragInfoRef.current.deltaX = 0
      dragInfoRef.current.deltaY = 0

      dragInfoRef.current.baseX = basePosition.x
      dragInfoRef.current.baseY = basePosition.y

      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', end)

      window.addEventListener('touchmove', move)
      window.addEventListener('touchend', end)

      onStart?.({ x: basePosition.x, y: basePosition.y, deltaX: 0, deltaY: 0 })

      return () => {
        window.removeEventListener('mousemove', move)
        window.removeEventListener('mouseup', end)

        window.removeEventListener('touchmove', move)
        window.removeEventListener('touchend', end)
      }
    },
    [move, end, stopPropagation, basePosition, onStart]
  )

  useEffect(() => {
    const childElm = childRef.current

    childElm.addEventListener('mousedown', start)
    childElm.addEventListener('touchstart', start, { passive: false })

    return () => {
      childElm.removeEventListener('mousedown', start)
      childElm.removeEventListener('touchstart', start)
    }
  }, [start])

  try {
    clonedChildren = map(only(children), (child) =>
      React.cloneElement(child as React.ReactElement, {
        ref: (ref: any) => (childRef.current = ref),
      })
    )
  } catch (error) {
    console.error('[Draggg] You should pass a single child component.')
    return <>{children}</>
  }

  return <>{clonedChildren}</>
}

export default Draggg
