import { FC, useCallback, useRef, useState } from 'react'
import Draggable from 'react-draggg'
import BottomCenteredResetButton from '../BottomCenteredResetButton'
import Boundary from '../Boundary'
import DragBox, { defaultDragBoxSize } from '../DragBox'
import minmax from 'minmax.js'
import { DraggableCore } from 'react-draggable'

const outerBoxSize = 160
const innerBoxSize = 70

const Example3: FC = () => {
  let boundaryRef = useRef<HTMLDivElement>(null!)

  const [{ deltaX, deltaY }, setDelta] = useState({
    deltaX: 0,
    deltaY: 0,
  })

  const [{ innerDeltaX, innerDeltaY }, setInnerDelta] = useState({
    innerDeltaX: 0,
    innerDeltaY: 0,
  })

  const reset = useCallback(() => {
    setDelta({
      deltaX: 0,
      deltaY: 0,
    })

    setInnerDelta({
      innerDeltaX: 0,
      innerDeltaY: 0,
    })
  }, [])

  return (
    <div>
      <Boundary bindRef={(ref) => (boundaryRef = ref)}>
        <Draggable
          onDrag={(data) => {
            const boundaryRect = boundaryRef.current.getBoundingClientRect()

            setDelta({
              deltaX: minmax(
                deltaX + data.deltaX,
                -(boundaryRect.width / 2 - outerBoxSize / 2) + 10,
                boundaryRect.width / 2 - outerBoxSize / 2 - 10
              ),
              deltaY: minmax(
                deltaY + data.deltaY,
                -(boundaryRect.height / 2 - outerBoxSize / 2) + 10,
                boundaryRect.height / 2 - outerBoxSize / 2 - 10
              ),
            })
          }}
        >
          <div
            style={{
              transform: `translateX(${deltaX}px) translateY(${deltaY}px)`,
            }}
          >
            <DragBox width={outerBoxSize} height={outerBoxSize}>
              <Draggable
                stopPropagation
                onDrag={(data) => {
                  setInnerDelta({
                    innerDeltaX: minmax(
                      innerDeltaX + data.deltaX,
                      -(outerBoxSize / 2 - innerBoxSize / 2) + 10,
                      outerBoxSize / 2 - innerBoxSize / 2 - 10
                    ),
                    innerDeltaY: minmax(
                      innerDeltaY + data.deltaY,
                      -(outerBoxSize / 2 - innerBoxSize / 2) + 10,
                      outerBoxSize / 2 - innerBoxSize / 2 - 10
                    ),
                  })
                }}
              >
                <div
                  style={{
                    transform: `translateX(${innerDeltaX}px) translateY(${innerDeltaY}px)`,
                  }}
                >
                  <DragBox width={innerBoxSize} height={innerBoxSize} />
                </div>
              </Draggable>
            </DragBox>
          </div>
        </Draggable>

        <BottomCenteredResetButton onClick={reset} />
      </Boundary>
      <h3>React Draggg</h3>

      <Boundary bindRef={(ref) => (boundaryRef = ref)}>
        <DraggableCore
          onDrag={(e, data) => {
            const boundaryRect = boundaryRef.current.getBoundingClientRect()

            setDelta({
              deltaX: minmax(
                deltaX + data.deltaX,
                -(boundaryRect.width / 2 - outerBoxSize / 2) + 10,
                boundaryRect.width / 2 - outerBoxSize / 2 - 10
              ),
              deltaY: minmax(
                deltaY + data.deltaY,
                -(boundaryRect.height / 2 - outerBoxSize / 2) + 10,
                boundaryRect.height / 2 - outerBoxSize / 2 - 10
              ),
            })
          }}
        >
          <div
            style={{
              transform: `translateX(${deltaX}px) translateY(${deltaY}px)`,
            }}
          >
            <DragBox width={outerBoxSize} height={outerBoxSize}>
              <DraggableCore
                onStart={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onStop={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onDrag={(e, data) => {
                  e.preventDefault()
                  e.stopPropagation()

                  setInnerDelta({
                    innerDeltaX: minmax(
                      innerDeltaX + data.deltaX,
                      -(outerBoxSize / 2 - innerBoxSize / 2) + 10,
                      outerBoxSize / 2 - innerBoxSize / 2 - 10
                    ),
                    innerDeltaY: minmax(
                      innerDeltaY + data.deltaY,
                      -(outerBoxSize / 2 - innerBoxSize / 2) + 10,
                      outerBoxSize / 2 - innerBoxSize / 2 - 10
                    ),
                  })
                }}
              >
                <div
                  style={{
                    transform: `translateX(${innerDeltaX}px) translateY(${innerDeltaY}px)`,
                  }}
                >
                  <DragBox width={innerBoxSize} height={innerBoxSize} />
                </div>
              </DraggableCore>
            </DragBox>
          </div>
        </DraggableCore>

        <BottomCenteredResetButton onClick={reset} />
      </Boundary>
      <h3>React Draggable</h3>

      <style jsx>{`
        h3 {
          font-size: 16px;
          font-weight: 500;
          margin-top: 10px;
          margin-bottom: 25px;
        }
        `}</style>
    </div>
  )
}

export default Example3
