import React from 'react'
import Step from "./Step"
import { useSelector, useDispatch } from 'react-redux'
import { select } from "../features/page";


const Steps = () => {
  const dispatch = useDispatch();
  const page=useSelector((e)=>e.page.value)

  const handleClick = (selectedPage) => {
    if (selectedPage <= page) {
      dispatch(select({selectedPage: selectedPage}))
    }
  }

  return (
    <div className='Steps'>
      <Step step={1} title={"INSPECTOR"} active={page==0} handleClick={handleClick} />
      <Step step={2} title={"INSPECTION"} active={page==1} handleClick={handleClick}/>
      <Step step={3} title={"CARRIER"} active={page==2} handleClick={handleClick}/>
      <Step step={4} title={"DATE"} active={page==3} handleClick={handleClick}/>
      <Step step={5} title={"UNIT"} active={page==4} handleClick={handleClick}/>
      <Step step={6} title={"LICENSE"} active={page==5} handleClick={handleClick}/>
      <Step step={7} title={"LICENSE"} active={page==6} handleClick={handleClick}/>
    </div>
  )
}

export default Steps