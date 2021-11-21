# React Draggg

Make your React elements draggable.

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
```

## API

```tsx
export type DragggData = {
  /**
   * Updated x-axis position based on the given `basePosition`.
   * If you don't pass anything to `basePosition`, it is same as `deltaX`.
   */
  x: number
  /**
   * Updated y-axis position based on the given base position.
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

- Draggg has a simpler API
- **Draggg can correctly stop touch event propagation**
- Draggg doesn't have its own state (it works like React-Draggable's `DraggableCore`)
- Draggg doesn't expose the event objects which means you don't have full control over the events
