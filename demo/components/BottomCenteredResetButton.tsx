import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import ResetButton from './ResetButton'

const BottomCenteredResetButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  return (
    <>
      <div className="bottom-centered-reset-button">
        <ResetButton {...props} />
      </div>

      <style jsx>{`
        .bottom-centered-reset-button {
          position: absolute;

          bottom: 10px;
          left: 50%;

          transform: translateX(-50%);
        }
      `}</style>
    </>
  )
}

export default BottomCenteredResetButton
