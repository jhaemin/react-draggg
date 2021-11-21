import { FC, MutableRefObject, useEffect, useRef } from 'react'

const Boundary: FC<{
  bindRef?: (ref: MutableRefObject<HTMLDivElement>) => void
}> = ({ children, bindRef }) => {
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    bindRef?.(ref)
  }, [bindRef])

  return (
    <>
      <div ref={ref} className="boundary">
        {children}
      </div>

      <style jsx>{`
        .boundary {
          position: relative;

          display: grid;
          align-items: center;
          justify-items: center;

          width: 100%;
          height: 320px;

          background-color: #f0f0f3;

          overflow: hidden;

          border-radius: 25px;
        }
      `}</style>
    </>
  )
}

export default Boundary
