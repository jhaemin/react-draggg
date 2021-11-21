import { DraggableCore } from 'react-draggable'
import Example1 from '../components/examples/example1'
import Example2 from '../components/examples/example2'
import Example3 from '../components/examples/example3'

export default function Home() {
  return (
    <>
      <div className="page">
        <h1 className="title">React Draggg</h1>

        <div className="example">
          <Example1 />
        </div>

        <div className="example">
          <h2 className="subtitle">Bounds</h2>
          <Example2 />
        </div>

        <div className="example">
          <h2 className="subtitle">Nested</h2>
          <Example3 />
        </div>

        {/* <h2>vs react-draggable</h2>
        <div>
          <DraggableCore
            onDrag={(e, data) => {
              console.log(data)
            }}
          >
            <div>Hello World</div>
          </DraggableCore>
        </div> */}
      </div>

      <style jsx>{`
        .page {
          text-align: center;

          padding: 50px 25px;
          margin: auto;

          max-width: 800px;
        }

        .title {
          font-size: 32px;
          font-weight: 600;
        }

        .subtitle {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .example {
          margin-top: 40px;
        }
      `}</style>
    </>
  )
}
