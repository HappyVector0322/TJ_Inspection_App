import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info, parseVIN } from "../features/user";
import { useState, useEffect, useRef} from "react";



const VehicalInfoStep = ( {focusNextButton} ) => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);
  const [vehicleInfo , setVehicleInfo] = useState({
    year: "",
    make: "",
    model: "",
    vin: ""
  });
  
  // Refs for each input box  
  const yearRef = useRef(null);  
  const makeRef = useRef(null);  
  const modelRef = useRef(null);  
  const vinRef = useRef(null);  

  useEffect(()=>{
    // console.log("year info:", user.year, vehicleInfo.year)
    // setVehicleInfo({...vehicleInfo, year: user.year, make: user.make, model: user.model, vin: user.vin })
  },[])

  // useEffect(() => {
  //   console.log("year change:",vehicleInfo.year)
  //   dispatch(info({...user, 
  //     year: vehicleInfo.year.toUpperCase(), 
  //     make: vehicleInfo.make.toUpperCase(), 
  //     model: vehicleInfo.model.toUpperCase(), 
  //     vin: vehicleInfo.vin.toUpperCase()
  //   }));
  // }, [vehicleInfo.year, vehicleInfo.make, vehicleInfo.model, vehicleInfo.vin]);

  const handleKeyPress = (e, nextRef) => {  
    if (e.key === "Enter") {  
      e.preventDefault();  
      if (nextRef && nextRef.current) {  
        nextRef.current.focus();  
      } else if (focusNextButton) {  
        focusNextButton();  // Move focus to the "Next" button if it's the last input  
      }  
    }  
  };  

  return (
    <div className="info">
      <h2>Vehical info</h2>
      <p>Please provide vechical information.</p>
      <div className="formContainer">
        <form className="form" autoComplete="on">
          <div className="fields">
            <div className="dflex">
              <label>VIN</label>
              {user.nextClick && (
                <span>{user.vin.length < 2 && "This field is required"}</span>
              )}
            </div>
            <input
              type="text" autoComplete="on"
              placeholder="1HTKJPVK2NH"
              value={user.vin}
              onChange={e => dispatch(info({...user, vin: e.target.value}))}
              onBlur={e => dispatch(parseVIN(e.target.value))}

              // defaultValue={vehicleInfo.vin}
              // onChange={e => setVehicleInfo({ ...vehicleInfo, vin: e.target.value })}
              className={user.vin.length < 2 && user.nextClick ? "erorr" : ""}
              style={{ textTransform: 'uppercase' }}
              ref={vinRef}
              onKeyPress={(e) => handleKeyPress(e, null)}
            />
          </div>

          <div className="fields">
            <div className="dflex">
              <label>Year</label>
              {user.nextClick && (
                <span>{user.year.length < 2 && "This field is required"}</span>
              )}
            </div>
            <input
              type="number" autoComplete="on"
              placeholder="2022"
              value={user.year}
              onChange={e => dispatch(info({...user, year: e.target.value}))}

              // defaultValue={vehicleInfo.year}
              // onChange={e => setVehicleInfo({ ...vehicleInfo, year: e.target.value })}

              className={user.year.length < 2 && user.nextClick ? "erorr" : ""}
              style={{ textTransform: 'uppercase' }}
              ref={yearRef}
              onKeyPress={(e) => handleKeyPress(e, makeRef)}
            />          
          </div>

          <div className="fields">
            <div className="dflex">
              <label>Make</label>
              {user.nextClick && (
                <span>{user.make.length < 2 && "This field is required"}</span>
              )}
            </div>
            <input
              type="text" autoComplete="on"
              placeholder="CHEVY"
              value={user.make}
              onChange={e => dispatch(info({...user, make: e.target.value}))}
              // defaultValue={vehicleInfo.make}
              // onChange={e => setVehicleInfo({ ...vehicleInfo, make: e.target.value })}
              className={user.make.length < 2 && user.nextClick ? "erorr" : ""}
              style={{ textTransform: 'uppercase' }}
              ref={makeRef}
              onKeyPress={(e) => handleKeyPress(e, modelRef)}
            />
          </div>

          <div className="fields">
            <div className="dflex">
              <label>Model</label>
              {user.nextClick && (
                <span>{user.model.length < 2 && "This field is required"}</span>
              )}
            </div>
            <input
              type="text" autoComplete="on"
              placeholder="SILVERADO"
              value={user.model}
              onChange={e => dispatch(info({...user, model: e.target.value}))}
              // defaultValue={vehicleInfo.model}
              // onChange={e => setVehicleInfo({ ...vehicleInfo, model: e.target.value })}
              className={user.model.length < 2 && user.nextClick ? "erorr" : ""}
              style={{ textTransform: 'uppercase' }}
              ref={modelRef}
              onKeyPress={(e) => handleKeyPress(e, vinRef)}
            />
          </div>
        </form>
      </div>

    </div>
  );
};

export default VehicalInfoStep;
