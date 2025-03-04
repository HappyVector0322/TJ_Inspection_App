import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../features/user";
import { useState, useEffect,useRef} from "react";

const PreStep = () => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);

  return (
    <div className="preInfo info">
      <h2>NOTES FOR INSPECTOR / TECH</h2>
      <ul>
        <li> CORRECT PSI LOW AND/OR INBALANCE ISSUE AT TIME OF INSPECTION. </li>
        <li> FOR ITEMS THAT SHOULD BE ASSIGNED TO CARRIER - PLEASE NOTE IT. </li>
        <li> OBSERVED FLUID LEAKS– NOTE &FUEL CLEAN FOR LATER SERVICE. </li>
        <li> ENSURE WIRING / HOSES NOT RUBBING AGAINST FRAME OR TIRES. </li>
      </ul>
      {/* <button className='btn2' onClick={e => dispatch(info({...user, isShowPreStep: true}))}> OK </button> */}
    </div>
  );
};

export default PreStep;
