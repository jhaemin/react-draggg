import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import { ArrowCounterclockwise } from 'framework7-icons-plus/react'

const ResetButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  return (
    <>
      <button {...props} className="reset-button">
        <div className="icon">
          <ArrowCounterclockwise />
        </div>
        <span>Reset</span>
      </button>

      <style jsx>{`
        .reset-button {
          margin: 0;

          border: none;
          border-radius: 4px;

          appearance: none;
          background: none;

          display: flex;
          align-items: center;

          font: inherit;
          color: #0070ff;

          width: auto;

          cursor: pointer;
        }

        .icon {
          display: flex;
          transform: translateY(-4%);
        }

        span {
          margin-left: 5px;
        }
      `}</style>
    </>
  )
}

export default ResetButton
