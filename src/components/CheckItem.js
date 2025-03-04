import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info, updateCheckData } from "../features/user";
import { useState, useEffect,useRef} from "react";
import { TRUCK_CHECK_LIST } from "../constants";
import { Select, MenuItem, TextField, InputLabel, FormControl, Chip, Box, Autocomplete } from '@mui/material';



const PrefixInput = ({inputValue, setInputValue}) => {

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleBlur = () => {
    // Append the suffix when the input loses focus
    if (inputValue) {
      const newValue = inputValue.split("  ").pop()
      console.log("new value:", newValue)
      if (newValue) {
        setInputValue(`Will ${newValue} at a scheduled service interval`);
      }
    } else {
      setInputValue(`Will Blank at a scheduled service interval`);
    }
  };

  const handleFocus = () => {
    setInputValue(`${inputValue}  `)
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={{ textTransform: 'uppercase' }}
    />
  );
};


const CustomInput = ({inputValue, setInputValue}) => {

  const [DIType, setDIType] = useState("FIX")
  const typeArray = ["FIX", "REPAIR", "INSPECT & ADVISE", "CLEAN", "REPLACE", "ADJUST", "SERVICE", "INSPECT", "ALIGN", "MONITOR & DECIDE", "TEST"]

  useEffect(() => {
    // const regex = /will\s+(\S+)/i;
    const regex = /will\s+(.*?)\s+at/i;
    const match = regex.exec(inputValue);
    const inputType = match? match[1].toUpperCase() : "";
    typeArray.includes(inputType)? setDIType(inputType) : setDIType(typeArray[0])
  }, [inputValue])

  const handleChange = (event) => {
    const newType = event.target.value;
    setInputValue(`Will ${newType} at a scheduled service interval`)
  };

  return (
    <div className={"wrapSelect"}>
      <span>Will </span>
      <TextField
        select
        variant="standard" // Use standard variant
        value={DIType}
        onChange={handleChange}


        InputProps={{
            disableUnderline: true, // Disable the underline
        }}
        sx={{
          '& .MuiSelect-select': {
            padding: '0px',
            paddingRight: '24px',
            border: 'none', // Remove border
            fontSize: '16px',
            color: '#02295a',
            fontWeight: '500',
            fontFamily: '"Ubuntu", sans-serif',
            paddingLeft: '5px',
            lineHeight: '24px'
          },
          '& .MuiOutlinedInput-notchedOutline': {
              border: 'none', // Remove outline for focused state
          },
        }}
      >
        <MenuItem value="FIX">FIX</MenuItem>
        <MenuItem value="REPAIR">REPAIR</MenuItem>
        <MenuItem value="INSPECT & ADVISE">INSPECT & ADVISE</MenuItem>
        <MenuItem value="CLEAN">CLEAN</MenuItem>
        <MenuItem value="REPLACE">REPLACE</MenuItem>
        <MenuItem value="ADJUST">ADJUST</MenuItem>
        <MenuItem value="SERVICE">SERVICE</MenuItem>
        <MenuItem value="INSPECT">INSPECT</MenuItem>
        <MenuItem value="ALIGN">ALIGN</MenuItem>
        <MenuItem value="MONITOR & DECIDE">MONITOR & DECIDE</MenuItem>
        <MenuItem value="TEST">TEST</MenuItem>
      </TextField>
      <span> at a scheduled service interval</span>
    </div>
  )
}

const EditableSelect = ({inputValue, setInputValue}) => {
  const [options, setOptions] = useState([
    'Will FIX at a scheduled service interval',
    'Will REPAIR at a scheduled service interval',
    'Will INSPECT & ADVISE at a scheduled service interval',
    'Will CLEAN at a scheduled service interval',
    'Will REPLACE at a scheduled service interval',
    'Will ADJUST at a scheduled service interval',
    'Will SERVICE at a scheduled service interval',
    'Will INSPECT at a scheduled service interval',
    'Will ALIGN at a scheduled service interval',
    'Will MONITOR & DECIDE at a scheduled service interval',
    'Will TEST at a scheduled service interval'
  ]);

  const handleInputChange = (event, newInputValue) => {
      setInputValue(newInputValue);
  };

  const handleOptionChange = (event, newValue) => {
      if (newValue && !options.includes(newValue)) {
          setOptions([...options, newValue]); // Add new option if it doesn't exist
      }
      setInputValue(newValue || ''); // Update input value
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Autocomplete
        freeSolo
        options={options}
        value={inputValue}
        onInputChange={handleInputChange}
        onChange={handleOptionChange}
        variant="plain"
        renderInput={(params) => (
            <TextField {...params} variant="outlined" />
        )}
        sx={{
          '& .MuiAutocomplete-input': {
            padding: '0px',
            paddingRight: '24px',
            border: 'none', // Remove border
            fontSize: '16px',
            color: '#02295a',
            fontWeight: '500',
            fontFamily: '"Ubuntu", sans-serif',
            paddingLeft: '5px',
            lineHeight: '24px',
            textTransform: 'uppercase',
            width: '100%'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none', // Remove outline for focused state
          },
        }}
      />
    </Box>
  );
};



const CheckItem = ({checkNum}) => {

  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);
  const [checkInfo, setCheckInfo] = useState({
    title: "",
    result: "",
    defect: "",
    note: "",
    type: ""
  });

  const onChangeCheckType = (e) => {
    switch(e.target.value) {
      case "C.R":
        setCheckInfo({ ...checkInfo, type: e.target.value, note: "This is a Carrier Task"})
        break;
      case "O.R":
        setCheckInfo({ ...checkInfo, type: e.target.value, note: "Carrier will outsource for remediation"})
        break;
      case "D.I":
        setCheckInfo({ ...checkInfo, type: e.target.value, note: "Will FIX at a scheduled service interval"})
        break;
      case "O.A":
        setCheckInfo({ ...checkInfo, type: e.target.value, note: ""})
        break;
      default:
        setCheckInfo({ ...checkInfo, type: e.target.value, note: ""})
        break;
    }
  }


  useEffect(()=>{    
    if (user.isTruck) {
      const curCheckData = user.truckCheckList[checkNum-1]
      setCheckInfo({...checkInfo, ...curCheckData})
    } else {
      const curCheckData = user.trailerCheckList[checkNum-1]
      setCheckInfo({...checkInfo, ...curCheckData})
    }
  },[])

  useEffect(()=>{
    dispatch(updateCheckData({isTruck: user.isTruck, index: checkNum-1, data: checkInfo}))
  },[checkInfo])


  return (
    <form className="form checkForm" autoComplete="on">
      <div className="fields">
        <div className="dflex">
          <label> {checkNum}. {checkInfo.title} ? </label>
        </div>
        <div className="radioGroup">
          <label>
            <input
              type="radio"
              value="ok"
              checked={checkInfo.result === 'ok'}
              onChange={e => setCheckInfo({ ...checkInfo, result: e.target.value })}
            />
            <span> OK </span> 
          </label>
          <label>
            <input
              type="radio"
              value="n/a"
              checked={checkInfo.result === 'n/a'}
              onChange={e => setCheckInfo({ ...checkInfo, result: e.target.value })}
            />
            <span> N/A </span> 
          </label>
          <label>
            <input
              type="radio"
              value="repaired"
              checked={checkInfo.result === 'repaired'}
              onChange={e => setCheckInfo({ ...checkInfo, result: e.target.value })}
            />
            <span> REPAIRED ITEM </span> 
          </label>
          <label>
            <input
              type="radio"
              value="deferred"
              checked={checkInfo.result === 'deferred'}
              onChange={e => setCheckInfo({ ...checkInfo, result: e.target.value })}
            />
            <span> DEFERRED ITEM </span> 
          </label>
        </div>
      </div>

      {
        checkInfo.result === "repaired" || checkInfo.result === "deferred" ?
        <div className="fields">
          <div className="dflex">
            <label>Describe the defect observed on this item</label>
          </div>
          <input
            type="text" autoComplete="on"
            placeholder="WASHER FLUID EMPTY"
            // className={user.name.length < 3 && user.nextClick ? "erorr" : ""}
            defaultValue={checkInfo.defect}
            onChange={e => setCheckInfo({ ...checkInfo, defect: e.target.value.toUpperCase()})}
            style={{ textTransform: 'uppercase' }}
          />
        </div>
        : null
      }
      {
        checkInfo.result === "repaired" ?
        <div className="fields">
          <div className="dflex">
            <label>Write Repair Completed Note</label>
            {/* {user.nextClick && (
              <span>{user.name.length < 3 && "This field is required"}</span>
            )} */}
          </div>
          <input
            type="text" autoComplete="on"
            placeholder="RE-FILLED WASHER FLUID TO FULL"
            // className={user.name.length < 3 && user.nextClick ? "erorr" : ""}
            defaultValue={checkInfo.note}
            onChange={e => setCheckInfo({ ...checkInfo, note: e.target.value.toUpperCase()})}
            style={{ textTransform: 'uppercase' }}
          />
        </div>
        : null
      }
      {
        checkInfo.result === "deferred" ?
        <div className="fields">
          <div className="dflex">
            <label>
              { checkInfo.type == "D.I" ? "Write Deferred Reason and Information" : "Write Repair Completed Note" }
            </label>
          </div>

          <div className="customInput">
            {/* <select value={checkInfo.type} onChange={e => setCheckInfo({ ...checkInfo, type: e.target.value})}> */}
            <select value={checkInfo.type} onChange={e => onChangeCheckType(e) }>
              <option value="O.R" >O.R</option>
              <option value="D.I"> D.I</option>
              <option value="C.R"> C.R</option>
              <option value="O.A"> O.A</option>
            </select>
            { checkInfo.type == "D.I" ?
              <EditableSelect 
                inputValue={checkInfo.note} 
                setInputValue={value => setCheckInfo({...checkInfo, note: String(value).toUpperCase()})}
              />
              :
              <input
                type="text" autoComplete="on"
                value={checkInfo.note}
                onChange={e => setCheckInfo({ ...checkInfo, note: e.target.value.toUpperCase()})}
                style={{ textTransform: 'uppercase' }}
              />
            }
          </div>
        </div>
        : null
      }

    </form>
  );
};

export default CheckItem;