import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../features/user";
import { useState, useEffect, useRef} from "react";



const InspectorInfoStep = ({ focusNextButton }) => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);
  
  const [inspectorName, setInspectorName] = useState("")
  const [carrierInfo, setCarrierInfo] = useState({name: "", id: "", type: ""});
  const [haveCarrierID, setHaveCarrierID] = useState(true)
  const [isDotInspection, setIsDotInspection] = useState(true)

  const inspectorNameRef = useRef(null);  
  const carrierNameRef = useRef(null);  
  const carrierIdRef = useRef(null);  

  useEffect(()=>{
    // Focus the first input field on component mount  
    if (inspectorNameRef.current) {  
      inspectorNameRef.current.focus();  
    } 
        
    setInspectorName(user.name)
    setCarrierInfo({...carrierInfo, name: user.carrierName, id: user.carrierID, type: user.carrierType})
    setHaveCarrierID(user.haveCarrierID)
    setIsDotInspection(user.isDotInspection)
  },[])

  useEffect(() => {
    dispatch(info({...user, name: inspectorName.toUpperCase(), 
      carrierName: carrierInfo.name.toUpperCase(), 
      carrierID: carrierInfo.id.toUpperCase(), 
      carrierType: carrierInfo.type.toUpperCase(), 
      haveCarrierID: haveCarrierID,
      isDotInspection: isDotInspection
    }));
  }, [inspectorName, carrierInfo.name, carrierInfo.id, carrierInfo.type, haveCarrierID, isDotInspection]);

  const handleKeyPress = (e, nextRef) => {  
    if (e.key === "Enter") {  
      e.preventDefault();  
      if (nextRef && nextRef.current) {  
        nextRef.current.focus();  
      } else {
        focusNextButton();
      }
    }  
  };  
  
  const handleCheckChange = (e) => {
    if (e.target.checked) {
      console.log("carrier info:", carrierInfo)
      setCarrierInfo({...carrierInfo, id: ""})
      setHaveCarrierID(!e.target.checked)
    } else {
      setHaveCarrierID(!e.target.checked)
    }
  }

  const handleRadioChange = (e) => {
    if (e.target.value == "dot") 
      setIsDotInspection(true)
    else
      setIsDotInspection(false)
  };


  return (
    <div className="info">
      <h2>Inspector info</h2>
      <p>Please provide Inspector and Carrier Informations.</p>
      <div className="formContainer">
        <form className="form" autoComplete="on">
          <div className="fields">
            <div className="dflex">
              <label>Inspector Name</label>
              {user.nextClick && (
                <span>{user.name.length < 2 && "This field is required"}</span>
              )}
            </div>
            <input
              type="text" autoComplete="on"
              placeholder="VLADIMIR KISHOV"
              className={user.name.length < 2 && user.nextClick ? "erorr" : ""}
              defaultValue={inspectorName}
              ref={inspectorNameRef}
              onKeyPress={(e) => handleKeyPress(e, carrierNameRef)}
              onChange={e => setInspectorName(e.target.value )}
              style={{ textTransform: 'uppercase' }}
            />
          </div>

          <div className="fields">
            <div className="dflex">
              <label>Carrier Name</label>
              {user.nextClick && (
                <span>{user.carrierName.length < 2 && "This field is required"}</span>
              )}
            </div>
            <input
              type="text" autoComplete="on"
              placeholder="WESTERN AREA POWER ADMINISTRATION"
              className={user.carrierName.length < 2 && user.nextClick ? "erorr" : ""}
              defaultValue={carrierInfo.name}
              ref={carrierNameRef}
              onKeyPress={(e) => handleKeyPress(e, carrierIdRef)}
              onChange={e => setCarrierInfo({ ...carrierInfo, name: e.target.value })}
              style={{ textTransform: 'uppercase' }}
            />
          </div>

          <div className="fields">
            <div className="dflex" style={{alignItems: 'flex-end'}}>
              <label>Carrier Identifier</label>
              <div className="dflex checkMark">
                <label>is N/A?</label>
                <input 
                  type="checkbox"
                  checked={!haveCarrierID}
                  onChange={handleCheckChange}
                  placeholder="0485352"
                />
              </div>
            </div>
            <div className={user.carrierID.length < 2 && user.nextClick && user.haveCarrierID ? "customInput erorr" : "customInput"}>
              <select value={carrierInfo.type} onChange={e => setCarrierInfo({...carrierInfo, type: e.target.value})} disabled={!haveCarrierID}>
                <option value="CA#" >CA#</option>
                <option value="MC#">MC#</option>
                <option value="DOT#">DOT#</option>
              </select>
              <input
                type="text" autoComplete="on"
                placeholder="DOT 123"
                value={carrierInfo.id}
                ref={carrierIdRef}
                disabled={!haveCarrierID}
                onKeyPress={(e) => handleKeyPress(e, null)}
                onChange={e => setCarrierInfo({ ...carrierInfo, id: e.target.value })}
                style={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>

          <div className="fields">
            <div className="dflex">
              <label>Inspection method</label>
            </div>
            <div className="radioGroup">
              <label>
                <input
                  type="radio"
                  value="dot"
                  checked={isDotInspection}
                  onChange={handleRadioChange}
                />
                <span> DOT Annual Inspection </span> 
              </label>
              <label>
                <input
                  type="radio"
                  value="bit"
                  checked={!isDotInspection}
                  onChange={handleRadioChange}
                />
                <span> 90-Day BIT Inspection </span> 
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InspectorInfoStep;
