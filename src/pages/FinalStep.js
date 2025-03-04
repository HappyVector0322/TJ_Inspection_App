import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../features/user";
import { useState, useEffect,useRef} from "react";


const FinalStep = ({focusNextButton}) => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);
  const [fluid, setFluid] = useState("")
  const [dtcs, setDTCs] = useState("")
  const [haveFluid, setHaveFluid] = useState(true)
  const [haveDTCs, setHaveDTCs] = useState(true)

  const [isCertified, setIsCertified] = useState(true)
  const [finalReason, setFinalReason] = useState("")

  // Refs for input focus control  
  const fluidRef = useRef(null);  
  const dtcsRef = useRef(null);  
  const finalReasonRef = useRef(null);  

  useEffect(()=>{
    setFluid(user.fluid)
    setDTCs(user.dtcs)
    setHaveFluid(user.haveFluid)
    setHaveDTCs(user.haveDTCs)
    setIsCertified(user.isCertified)
    setFinalReason(user.finalReason)
    
    if (fluidRef.current) {  
      fluidRef.current.focus();  
    }  
  },[])
  
  useEffect(() => {
    dispatch(info({...user, 
      fluid: haveFluid? fluid.toUpperCase():"",
      dtcs: haveDTCs? dtcs.toUpperCase():"",
      haveDTCs: haveDTCs,
      haveFluid: haveFluid,
      isCertified: isCertified, 
      finalReason: finalReason.toUpperCase()}));
  }, [fluid, dtcs, haveFluid, haveDTCs, isCertified, finalReason]);
  
  const handleKeyPress = (e, nextRef) => {  
    if (e.key === 'Enter') {  
      e.preventDefault();  
      if (nextRef && nextRef.current) {  
        nextRef.current.focus();  
      } else if (focusNextButton) {  
        focusNextButton(); // Call the focus function for "Next" button  
      }  
    }  
  };  

  const handleChange = (event) => {
    if (event.target.value == "yes") 
      setIsCertified(true)
    else
      setIsCertified(false)
  };


  return (
    <div className="finalInfo info">
      <h2>Final Step</h2>
      <p>Please provide your name,email address,and phone number.</p>

      <div className="formContainer">
        <form className="form" autoComplete="on">
          <div className="fields">
            <div className="dflex">
              <label> FLUID CHECK (OIL, COOLANT, POWER STEERING) </label>
              <div className="dflex checkMark">
                <label>is N/A?</label>
                <input 
                  type="checkbox"
                  checked={!haveFluid}
                  onChange={e => setHaveFluid(!e.target.checked)}
                />
              </div>
            </div>
            <input
              type="text" autoComplete="on"
              className={user.fluid.length < 2 && user.nextClick && user.haveFluid ? "erorr" : ""}
              defaultValue={fluid}
              onChange={e => setFluid(e.target.value)}
              disabled={!haveFluid}
              style={{ textTransform: 'uppercase' }}
              ref={fluidRef}
              onKeyPress={(e) => handleKeyPress(e, dtcsRef)}
            />
          </div>

          <div className="fields">
            <div className="dflex">
              <label> DTCs (ACTIVE, INACTIVE – CRITICAL OR HIGH FREQ.) </label>
              <div className="dflex checkMark">
                <label>is N/A?</label>
                <input 
                  type="checkbox"
                  checked={!haveDTCs}
                  onChange={e => setHaveDTCs(!e.target.checked)}
                />
              </div>
            </div>
            <input
              type="text" autoComplete="on"
              className={user.dtcs.length < 2 && user.nextClick && user.haveDTCs ? "erorr" : ""}
              defaultValue={dtcs}
              onChange={e => setDTCs(e.target.value)}
              disabled={!haveDTCs}
              style={{ textTransform: 'uppercase' }}
              ref={dtcsRef}
              onKeyPress={(e) => handleKeyPress(e, isCertified ? null : finalReasonRef)}
            />

          </div>

          <div className="dflex" style={{marginTop:'30px'}}>
            <div className="fields">
              <div className="dflex">
                <label>Is this unit certified?</label>
              </div>
              <div className="radioGroup">
                <label>
                    <input
                        type="radio"
                        value="yes"
                        checked={isCertified}
                        onChange={handleChange}
                        onKeyPress={(e) => handleKeyPress(e, focusNextButton)}
                    />
                    <span> Yes </span> 
                </label>
                <label>
                    <input
                        type="radio"
                        value="no"
                        checked={!isCertified}
                        onChange={handleChange}
                    />
                    <span> No </span> 
                </label>
              </div>
            </div>
          </div>

          {
            isCertified ?
            null :
            <div className="fields" style={{marginTop:'30px'}}>
              <div className="dflex">
                <label>Tech notes</label>
              </div>
              <textarea
                value={finalReason} // Controlled component
                onChange={ e => setFinalReason(e.target.value) } // Handle change event
                rows="5" // Number of visible text lines
                cols="30" // Number of visible character columns
                placeholder="Please write the reason in 3-4 words." // Placeholder text
                style={{ textTransform: 'uppercase' }}
                className={user.finalReason.length < 2 && user.nextClick && !user.isCertified ? "erorr" : ""}
                ref={finalReasonRef}
                // onKeyPress={(e) => handleKeyPress(e, focusNextButton)}
              />
            </div>
          }
        </form>
      </div>
    </div>
  );
};

export default FinalStep;
