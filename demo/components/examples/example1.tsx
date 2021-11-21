import { FC, useCallback, useRef, useState } from 'react'
import Draggable from 'react-draggg'
import BottomCenteredResetButton from '../BottomCenteredResetButton'
import Boundary from '../Boundary'
import DragBox from '../DragBox'

const Example1: FC = () => {
  const [{ deltaX, deltaY }, setPosition] = useState({
    deltaX: 0,
    deltaY: 0,
  })

  const reset = useCallback(() => {
    setPosition({
      deltaX: 0,
      deltaY: 0,
    })
  }, [])

  return (
    <div className="demo-1">
      <Boundary>
        <Draggable
          onDrag={(data) => {
            setPosition({
              deltaX: deltaX + data.deltaX,
              deltaY: deltaY + data.deltaY,
            })
          }}
        >
          <div
            style={{
              transform: `translateX(${deltaX}px) translateY(${deltaY}px)`,
            }}
          >
            <DragBox />
          </div>
        </Draggable>

        <BottomCenteredResetButton onClick={reset} />
      </Boundary>
    </div>
  )
}

export default Example1
