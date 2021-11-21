import { FC, useCallback, useRef, useState } from 'react'
import Draggable from 'react-draggg'
import BottomCenteredResetButton from '../BottomCenteredResetButton'
import Boundary from '../Boundary'
import DragBox, { defaultDragBoxSize } from '../DragBox'
import minmax from 'minmax.js'

const Example2: FC = () => {
  let boundaryRef = useRef<HTMLDivElement>(null!)

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
      <Boundary bindRef={(ref) => (boundaryRef = ref)}>
        <Draggable
          onDrag={(data) => {
            const boundaryRect = boundaryRef.current.getBoundingClientRect()

            setPosition({
              deltaX: minmax(
                deltaX + data.deltaX,
                -(boundaryRect.width / 2 - defaultDragBoxSize / 2) + 10,
                boundaryRect.width / 2 - defaultDragBoxSize / 2 - 10
              ),
              deltaY: minmax(
                deltaY + data.deltaY,
                -(boundaryRect.height / 2 - defaultDragBoxSize / 2) + 10,
                boundaryRect.height / 2 - defaultDragBoxSize / 2 - 10
              ),
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

export default Example2
