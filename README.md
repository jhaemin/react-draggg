# React Dragggggggggggggggggg

Make your React elements draggable.

![Screen Recording 2021-11-22 at 10 50 10 AM](https://user-images.githubusercontent.com/19797697/142789473-4aeb72f7-3aa2-4311-abb7-73dbf63f037c.gif)

[Demo](https://jhaemin.github.io/react-draggg/)

### Installation

```zsh
npm install react-draggg@latest
```

### Usage

```tsx
import Draggg from 'react-draggg'

const Page = () => {
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 })

  const onDrag = ({ deltaX, deltaY }) => {
    setPosition({
      x: x + deltaX,
      y: y + deltaY,
    })
  }

  return (
    <div className="page">
      <Draggg onDrag={onDrag}>
        <div style={{ left: x, top: y }}>Drag Me</div>
      </Draggg>
    </div>
  )
}

// Alternative usage (with basePosition)
const Page = () => {
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 })

  const onDrag = ({ x, y }) => setPosition({ x, y })

  return (
    <div className="page">
      <Draggg basePosition={{ x, y }} onDrag={onDrag}>
        <div style={{ left: x, top: y }}>Drag Me</div>
      </Draggg>
    </div>
  )
}
```

### How it works?

It simply remembers the initial position when drag starts, then calculates the distance from the original position.

## API

```tsx
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
```

## Comparison with [React-Draggable](https://github.com/react-grid-layout/react-draggable)

- React Draggg has a simpler API
- React Draggg is batteries-not-included
- **React Draggg correctly stops touch event propagation**
- React Draggg doesn't have its own state (it works like React-Draggable's `DraggableCore`)
- React Draggg doesn't expose the event objects which means you don't have full control over the events

## License

[MIT](https://github.com/jhaemin/react-draggg/blob/main/LICENSE)
