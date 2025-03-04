import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../features/user";
import { useState, useEffect,useRef} from "react";

import CheckItem from "../components/CheckItem";
import TireStat from "../components/TireStat";
import BrakeStat from "../components/BrakeStat";


const CheckInfoStep = () => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);

  const [totalPages, setTotalPages] = useState(1)

  useEffect(()=>{
    if (user.isTruck) {
      const truckCheckList = user.truckCheckList
      setTotalPages(truckCheckList.length)
    } else {
      const trailerCheckList = user.trailerCheckList
      setTotalPages(trailerCheckList.length)
    }
  },[])


  return (
    <div className="checkInfo info">
      <h2>Check info</h2>
      <p>Complete the checking step by step.</p>
      
      <div className="formContainer">
        {[...Array(totalPages).keys()].map((idx) => (
          <>
            <CheckItem checkNum={idx+1} isTruck={user.isTruck} key={'form_'+idx+user.isTruck}/>

            { user.isTruck && idx == 20 ? 
              <BrakeStat key={'form_'+idx+user.isTruck+"brake"}/> : null              
            }

            { user.isTruck && idx == 26 ? 
              <TireStat key={'form_'+idx+user.isTruck+"tire"}/> : null              
            }

            { !user.isTruck && idx == 4 ? 
              <BrakeStat key={'form_'+idx+user.isTruck+"brake"}/> : null              
            }

            { !user.isTruck && idx == 8 ? 
              <TireStat key={'form_'+idx+user.isTruck+"tire"}/> : null              
            }

            
            { idx < totalPages-1 ? 
              <div className="split-bar" id="splitBar" key={'split_'+idx} /> : null
            }          
          </>
        ))}
      </div>
    </div>
  );
};

export default CheckInfoStep;

