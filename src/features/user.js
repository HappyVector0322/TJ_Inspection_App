import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from '../services/user'
import axios from "axios";

// Function to get initial state dynamically
const INITIALSTATE = {
    name: "",
    initials: "",
    isDotInspection: true,
    carrierName: "",
    carrierID: "",
    carrierType: "DOT#",
    haveCarrierID: true,
    inspecDate: "",
    unitID: "",
    odometer: "",
    haveOdometer: true,      
    licenseID: "",
    hours: "",
    haveHours: true,   
    year: "",
    make: "",
    model: "",
    vin: "",
    isTruck: true,
    fluid: "",
    dtcs: "",
    haveFluid: true,
    haveDTCs: true,
    isCertified: true,
    finalReason: "",

    truckCheckList:[
      {
        title: "CHECK LICENSE, REGISTRATION, EXTERIORSTICKERS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"
      },
      {
        title: "FIRE EXTINGUISHER/REFLECTORS SECURED CERT",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "HORN-DEFROSTERS GAUGES/SPEEDOMETER/SEATBELT",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title:  "MIRRORS AND SUPPORTS SECURITY CRACKS OPERATE",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "WINDSHIELD WIPERS/WINDOW CRACKS, CONDITION",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "CHECK ALL LIGHTS, TURN SIGNALS, MUD FLAPS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "CHECK ELECTRICAL WIRING, CONDITIONPROTECTION",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "CHECK BATTERIES, TERMINALS, CABLE CONDITION",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "WARNING DEVICES, AIR, OIL, TEMP, VACCUUM ,DTC’S",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "RADIATOR AND HOSES, CONDITION, AND LEAKS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },


      {
        title: "BELTS-COMPRESSOR, FAN AND WATER PUMP",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "HOOD, VISOR, GRILL, ENTRY STEP FOR MOUNTING",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "AIRLINES-LEAKS CONDITION AND PROTECTION",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "FUEL TANKS-LINES-PUMP, CONDITION AND PROTECTION",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "MANIFOLD AND FLANGE GASKET, MUFFLER, CONDITION",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "ENGINE MOUNTS, OIL AND FUEL LEAKS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "CLUTCH ADJUSTMENT AND FREEPLAY",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "THROTTLE AND LINKAGE, AIR FILTER",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "GENERATOR/ALTERNATOR, STARTER, WIRING",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "TRACTOR PROTECTION VALVE, BREAK-AWAY TEST",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },


      {
        title: "BRAKES-LINING, DRUMS, AND ADJUSTMENTS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "HOSES AND TUBING ,CONDITION",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "AIR LEAKS AND 1 MIN BRAKE APPLICATION TEST",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "AIR GOVERNER ADJUSTMENT, MIN 85 MAX 130",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "IDENTIFY #1 AIR TANK-DRAIN-TEST CHECK VALVE",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "ALL TANKS SECURE, DRAINS OPERABLE, DRAINED",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "TIRES, WHEELS, NUTS AND STUDS CONDITION, PRESS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "PARKING BRAKE CONDITION, ADJUSTMENT",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "EMERGENCY STOPPING SYSTEM, LABLED, OPERABLE",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "RELEASE AFTER LOSS OF SERVICE AIR",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "CHECK STEERING GEAR BOX MOUNTING FREE-LASH",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },


      {
        title: "STEERING ARMS, DRAG LINKS AND TIE ROD ENDS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "FIFTH WHEEL CONDITION AND MOUNTING",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "SPRINGS SHACKLES AND U-JOINTS-TORQUE ARMS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "CHECK FRAME, CROSS MEMBERS CONDITION CRACKS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "CHECK DRIVE SHAFT AND UNIVERSAL JOINTS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "TRANSMISSION, DIFFERENTIALS-MOUNTING, SEALS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "WHEEL SEALS LEAKS, HYDRAULIC BRAKES LEAK",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "CLEAN UNDER CARRIAGE",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      },
      {
        title: "HAS THE BIT STICKER BEEN ATTACHED",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        type: "O.A",             
        note: ""          
      }
    ],

    trailerCheckList:[
      {
        title: "LIGHTS-STOP, TAIL, TURN-REFLECTORS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "AIR LEAKS-BRAKE SYSTEM",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "AIR/HYDRAULIC LEAKS DUMP SYSTEM",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "CRACKS IN BODY AND FRAME",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "BRAKES-ADJUSTMENT DRUMS, NEAR CAM OVER",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "SPRINGS, U-BOLTS TORQUE ARMS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "DRAWBAR-HITCH & SAFETY CABLE, CHECK STRANDS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "FIFTH WHEEL ON PULL TRAILER",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "TIRES, WHEELS, NUTS AND STUDS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "FIFTH WHEEL ON PIN, WEAR AND SAFETY LOCK",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "EMERGENCY RELAY VALVES, TANKS-MOUNTING",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "TARPS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "BED FLOOR/BOX WALLS ,BODY FOR DAMAGE",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "ELECTRICAL CONNECTORS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "AIRLINES-BETWEEN TRAILERS-GLADHANDS, RUBBERS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "MUDFLAPS AND FENDERS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "HAS THE BIT STICKER BEEN ATTACHED",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      },
      {
        title: "CHECK LICENSE, REGISTRATION, EXTERIOR STICKERS",
        result: "ok",     // available values: 'ok', 'n/a', 'repaired', 'deferred'
        defect: "",
        note: "",
        type: "O.A"        
      }
      
    ],

    nextClick: false,
    isShowPreStep: false,
    hasFrontAxle: true,
    hasAxle1: true,
    axle1IsDouble: true,
    hasAxle2: true,
    axle2IsDouble: true,

    frontTire: {
      dri: "",
      pass: ""
    },
    axel1Tire: {
      driInbd: "",
      driOtbd: "",
      passInbd: "",
      passOtbd: ""
    },
    axel2Tire: {
      driInbd: "",
      driOtbd: "",
      passInbd: "",
      passOtbd: ""
    },
    frontBrake: {
      dri: "",
      pass: ""
    },
    axel1Brake: {
      dri: "",
      pass: ""
    },
    axel2Brake: {
      dri: "",
      pass: ""
    }
}


export const submit = createAsyncThunk(
  "user/submit",
  async (info) => {
    const res = await userService.submitData(info);
    return res.data;
  }
);


export const licensePlateOCR = createAsyncThunk("user/licensePlateOCR", async (licensePlateImg, { dispatch }) => {
  const API_URL = 'https://api.platerecognizer.com/v1/plate-reader/';
  const PLATE_RECOGNIZER_API_TOKEN = "877866e9d8d7040725188a3b6469f3234c47d05f";
  const PLATE_VIN_BASE_URL = 'https://platetovin.com/api/convert';
  const PLATE_VIN_API_TOKEN = "LaCxJGzY8xa4JDT"   

  try {
    const form = new FormData();
    // form.append('upload', fs.createReadStream(imagePath));
    form.append('upload', licensePlateImg);
    form.append("regions", "us"); // Change to your country

    axios({  
      url: API_URL,
      method: 'POST',  
      headers: {  
        // 'ngrok-skip-browser-warning': true,  
        'Authorization': `Token ${PLATE_RECOGNIZER_API_TOKEN}`,
        'Content-Type': 'multipart/form-data'
      },
      data: form
    })  
    .then((response) => {  
      const { results } = response.data
      console.log("plate api result:", results)
      const plateNumber = results.length ? String(results[0].plate).toUpperCase() : ""
      const plateRegion = results.length ? results[0].region.code : ""
      const regionInfoArray = plateRegion.split("-")
      const plateState = regionInfoArray.length == 2 ? String(regionInfoArray[1]).toUpperCase() : ""

      if(plateState && plateNumber) {
        // get VIN, Year, Make and Model from License Plate
        axios({  
          url: PLATE_VIN_BASE_URL,
          method: 'POST',  
          headers: {  
            "Authorization": PLATE_VIN_API_TOKEN,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          data: {
            state: plateState,
            plate: plateNumber
          }
        })  
        .then((response) => {  
          const vinData = response.data? response.data.vin : {};
          const { vin } = vinData
          console.log("vehicle vin number:", vin)
          // update license plate info and VIN #
          dispatch(updateVehicleData({
            licenseID: plateNumber,
            vin: vin,
            year: '',
            make: '',
            model: ''
          }))
          // update Year, Make and Model with VIN #
          dispatch(parseVIN(vin))
        })  
        .catch(error => {  
          console.error('licensePlateOCR API failed:', error);  
          dispatch(updateVehicleData({
            licenseID: plateNumber,
            vin: '',
            year: '',
            make: '',
            model: ''
          }))
        }); 
      } else {
        console.log("plate info:", plateState, plateNumber)
        dispatch(updateVehicleData({
          licenseID: plateNumber,
          vin: '',
          year: '',
          make: '',
          model: ''
        }))
      }
    })  
    .catch(error => {  
      console.error('licensePlateOCR API failed:', error);  
    }); 
  } catch (error) {
    console.log(error)
    // dispatch(invoiceSlice.actions.hasError('licensePlateOCR failed'));
  }
});


export const parseVIN = createAsyncThunk("user/parseVIN", async (vinID, { dispatch }) => {
  try {
    axios({  
      url: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vinID}?format=json`,
      method: 'GET',  
      headers: {  
        'ngrok-skip-browser-warning': true,  
      }
    })  
    .then((response) => {  
      const vehicleData = response.data;
      if (vehicleData.Results && vehicleData.Results.length > 0) {
        const yearResults = vehicleData.Results.filter(result => result.Variable == "Model Year")
        const makeResults = vehicleData.Results.filter(result => result.Variable == "Make")
        const modelResults = vehicleData.Results.filter(result => result.Variable == "Model")
        console.log("parseVIN data:", yearResults, makeResults, modelResults)
        dispatch(updateVehicleData({
          vin: vinID,
          year: yearResults[0].Value ? yearResults[0].Value : "" ,
          make: makeResults[0].Value ? makeResults[0].Value : "" ,
          model: modelResults[0].Value ? modelResults[0].Value : "" ,
        }))
      } else {
        throw new Error('No vehicle information found.');
      }
    })  
    .catch(error => {  
      console.error('parseVIN API failed:', error);  
    });  
  } catch (error) {
    console.error('parseVIN failed:', error);  
    // dispatch(invoiceSlice.actions.hasError('parseVIN failed'));
  }
});



export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {...INITIALSTATE}
  },
  reducers: {
    info: (state, action) => {
      state.value = action.payload;
      // save checking data to the localstorage
      localStorage.setItem('TJPurewal_checking_data', JSON.stringify(state.value));
    },
    
    updateCheckData: (state, action) => {
      const {isTruck, index, data} = action.payload
      if(isTruck) {
        state.value.truckCheckList[index] = data
      } else {
        state.value.trailerCheckList[index] = data
      }
      // save checking data to the localstorage
      localStorage.setItem('TJPurewal_checking_data', JSON.stringify(state.value));
    },

    updateAxleState: (state, action) => {
      const {axleType, axleStatus} = action.payload
      // Does this Unit have a Front Axle?
      if(axleType == "hasFrontAxle") {
        state.value.hasFrontAxle = axleStatus
        if(axleStatus) {
          state.value.frontTire = {...state.value.frontTire, dri: "", pass: ""}
          state.value.frontBrake = {...state.value.frontBrake, dri: "", pass: ""}
        } else {
          state.value.frontTire = {...state.value.frontTire, dri: "N/A", pass: "N/A"}
          state.value.frontBrake = {...state.value.frontBrake, dri: "N/A", pass: "N/A"}
        }
      } 
      // Does this Unit have a Axle 1?
      if(axleType == "hasAxle1") {
        state.value.hasAxle1 = axleStatus
        if(axleStatus) {
          state.value.axel1Tire = {...state.value.axel1Tire, 
            driInbd: state.value.axle1IsDouble? "":"N/A", 
            driOtbd: "", 
            passInbd: state.value.axle1IsDouble? "":"N/A", 
            passOtbd: ""
          }
          state.value.axel1Brake = {...state.value.axel1Brake, dri: "", pass: ""}
        } else {
          state.value.axel1Tire = {...state.value.axel1Tire, 
            driInbd: "N/A", 
            driOtbd: "N/A", 
            passInbd: "N/A", 
            passOtbd: "N/A"
          }
          state.value.axel1Brake = {...state.value.axel1Brake, dri: "N/A", pass: "N/A"}
        }
      } 
      // Does this Axle 1 have 2 tires on each side?
      if(axleType == "axle1IsDouble") {
        state.value.axle1IsDouble = axleStatus
        if(axleStatus) {
          state.value.axel1Tire = {...state.value.axel1Tire, 
            driInbd: "",
            passInbd: ""
          }
        } else {
          state.value.axel1Tire = {...state.value.axel1Tire, 
            driInbd: "N/A",
            passInbd: "N/A"
          }
        }
      } 
      // Does this Unit have a Axle 2?
      if(axleType == "hasAlex2") {
        state.value.hasAxle2 = axleStatus
        if(axleStatus) {
          state.value.axel2Tire = {...state.value.axel2Tire, 
            driInbd: state.value.axle2IsDouble? "":"N/A", 
            driOtbd: "", 
            passInbd: state.value.axle2IsDouble? "":"N/A", 
            passOtbd: ""
          }
          state.value.axel2Brake = {...state.value.axel2Brake, dri: "", pass: ""}
        } else {
          state.value.axel2Tire = {...state.value.axel2Tire, 
            driInbd: "N/A", 
            driOtbd: "N/A", 
            passInbd: "N/A", 
            passOtbd: "N/A"
          }
          state.value.axel2Brake = {...state.value.axel2Brake, dri: "N/A", pass: "N/A"}
        }
      } 
      // Does this Axle 2 have 2 tires on each side?
      if(axleType == "axle2IsDouble") {
        state.value.axle2IsDouble = axleStatus
        if(axleStatus) {
          state.value.axel2Tire = {...state.value.axel2Tire, 
            driInbd: "",
            passInbd: ""
          }
        } else {
          state.value.axel2Tire = {...state.value.axel2Tire, 
            driInbd: "N/A",
            passInbd: "N/A"
          }
        }
      } 
      // save checking data to the localstorage
      localStorage.setItem('TJPurewal_checking_data', JSON.stringify(state.value));
    },

    updateLicenseId: (state, action) => {
      console.log("updateLicenseId payload:", action.payload)
      state.value.licenseID = action.payload
    },

    updateVehicleData: (state, action) => {
      console.log("updateVehicleData payload:", action.payload)
      state.value = {...state.value, ...action.payload}
    },

    init: (state, action) => {
      state.value = INITIALSTATE
    }
  },
  extraReducers: (builder) => {
    builder.addCase(submit.fulfilled, (state, action) => {
      // const {access_token, type} = action.payload;    
    })

    builder.addCase(licensePlateOCR.fulfilled, (state, action) => {
      console.log("licensePlateOCR builder:", action.payload)
      // const {access_token, type} = action.payload;    
    })
  }
});

export const { info, updateCheckData, updateAxleState, init, updateLicenseId, updateVehicleData } = userSlice.actions;

export default userSlice.reducer;



