import { FC } from 'react'

export const defaultDragBoxSize = 100

const DragBox: FC<{ width?: number; height?: number }> = ({
  children,
  width,
  height,
}) => {
  return (
    <>
      <div className="drag-box">{children}</div>

      <style jsx>{`
        .drag-box {
          display: grid;
          align-items: center;
          justify-items: center;

          width: ${width ?? defaultDragBoxSize}px;
          height: ${height ?? defaultDragBoxSize}px;

          background-color: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1),
            0 10px 20px rgba(0, 0, 0, 0.07);

          color: #999;
          font-weight: 400;
          font-size: 0.95em;

          border-radius: 12%;
          border: 1px solid #cccccc;

          user-select: none;
          cursor: move;

          transition: transform 150ms ease, box-shadow 150ms ease,
            color 150ms ease;
        }

        .drag-box:active {
          transform: scale(0.97);
          box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1),
            0 4px 4px rgba(0, 0, 0, 0.05);
          color: #fff;
        }
      `}</style>
    </>
  )
}

export default DragBox
