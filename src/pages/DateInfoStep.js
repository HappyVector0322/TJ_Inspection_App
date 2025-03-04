import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../features/user";
import { useState, useEffect,useRef} from "react";

import DateSelector from "../components/DateSelector";


const DateInfoStep = ({focusNextButton}) => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);

  const [curDate, setCurDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isTruck, setIsTruck] = useState(true)

  const curDateRef = useRef(null);  
  const radioTruckRef = useRef(null);  
  const radioTrailerRef = useRef(null);  


  useEffect(()=>{
    const dueDateInfo = new Date(user.inspecDate); 
    const leftDate = user.isDotInspection ? 366:91;
    dueDateInfo.setUTCDate(dueDateInfo.getUTCDate() + leftDate);
    setCurDate(user.inspecDate)
    setDueDate(getFormattedDate(dueDateInfo))
    setIsTruck(user.isTruck)
    
    if (curDateRef.current) {  
      curDateRef.current.focus();  
    }  
  },[])

  
  useEffect(() => {
    const dueDateInfo = new Date(curDate); 
    const leftDate = user.isDotInspection ? 365:90;
    dueDateInfo.setUTCDate(dueDateInfo.getUTCDate() + leftDate);
    setDueDate(getFormattedDate(dueDateInfo))

    dispatch(info({...user, 
      inspecDate: curDate.toUpperCase(),
      isTruck: isTruck
    }));
  }, [curDate, isTruck]);

  
  const handleKeyPress = (e, nextRef) => {  
    if (e.key === "Enter") {  
      e.preventDefault();  
      if (nextRef && nextRef.current) {  
        nextRef.current.focus();  
      } else if (focusNextButton) {  
        focusNextButton();  
      }  
    }  
  };  

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    console.log("selected date:", selectedDate)
    setCurDate(selectedDate)
  };

  const handleRadioChange = (e) => {
    if (e.target.value == "truck") 
      setIsTruck(true)
    else
      setIsTruck(false)
  };


  const getFormattedDate = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0'); // Days are one-based
    return `${year}-${month}-${day}`;
  };


  return (
    <div className="info">
      <h2>Date info</h2>
      <p>Please provide Date of inspection.</p>

      <div className="formContainer">
        <form className="form" autoComplete="on">

          <div className="fields">
            <div className="dflex">
              <label>Date of inspection</label>
              {user.nextClick && (
                <span>{user.inspecDate.length < 3 && "This field is required"}</span>
              )}
            </div>
            <input
              type="date"
              className={user.inspecDate.length < 3 && user.nextClick ? "erorr" : ""}
              defaultValue={curDate} 
              onChange={handleDateChange}  
              onKeyPress={(e) => handleKeyPress(e, radioTruckRef)}  
              ref={curDateRef}  
            />
          </div>

          <div className="fields">
            <div className="dflex">
              <label>Next Inspection Due</label>
            </div>
            <input
              type="date"
              readOnly
              defaultValue={dueDate} 
              onKeyPress={(e) => handleKeyPress(e, radioTrailerRef)}  
              ref={radioTruckRef}  
            />
          </div>

          <div className="fields">
            <div className="dflex">
              <label>Is this a truck or a trailer?</label>
            </div>
            <div className="radioGroup">
              <label>
                <input
                  type="radio"
                  value="truck"
                  checked={isTruck}
                  onChange={handleRadioChange}
                />
                <span> Truck </span> 
              </label>
              <label>
                <input
                  type="radio"
                  value="trailer"
                  checked={!isTruck}
                  onChange={handleRadioChange}
                  onKeyPress={(e) => handleKeyPress(e, null)}  
                  ref={radioTrailerRef}  
                />
                <span> Trailer </span> 
              </label>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default DateInfoStep;
