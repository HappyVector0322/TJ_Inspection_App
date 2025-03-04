import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { select } from "../features/page";

const Step = ({step,title,active, handleClick}) => {
  const dispatch = useDispatch();

  return (
    <div className='Step' onClick={e => handleClick(step-1)}>
        <span className={active?"stepNumber active":"stepNumber"}>{step}</span>
        {/* <div className='stepInfo'>
            <span>STEP {step}</span>
            <p>{title}</p>
        </div> */}
    </div>
  )
}

export default Step