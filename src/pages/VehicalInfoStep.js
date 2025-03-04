import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info, parseVIN } from "../features/user";
import { useState, useEffect, useRef} from "react";
import axios from "axios";

import Webcam from "react-webcam";
import { Container, Button } from "react-bootstrap";



const VehicalInfoStep = ( {focusNextButton} ) => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  
  // Refs for each input box  
  const yearRef = useRef(null);  
  const makeRef = useRef(null);  
  const modelRef = useRef(null);  
  const vinRef = useRef(null);  
  const webcamRef = useRef(null);
  

  useEffect(()=>{
    if (yearRef.current) {  
      yearRef.current.focus();  
    }  
  },[])


  // Capture image from webcam
  const handleCapture = async () => {
    const GOOGLE_VISION_API_KEY = "AIzaSyB0xxkXHpzxbCikZOb6AxT-jozAJ6OFqPQ"
    const screenshot = webcamRef.current.getScreenshot();
    setIsCameraOpen(false); // Exit full screen after capturing
    if (!screenshot) {
      console.error("Error capturing image.");
      return;
    }

    try {
      const base64Image = screenshot.split(",")[1]; // Remove metadata
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
        {
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: "TEXT_DETECTION" }],
            },
          ],
        }
      );

      const detectedText = response.data.responses[0].textAnnotations?.[0]?.description || "No text found";
      console.log("OCR Text:", detectedText);

      const detectedVINNumber = extractVINNumber(detectedText)
      console.log("VIN ID:", detectedVINNumber)

      if (detectedVINNumber) {
        dispatch(parseVIN(detectedVINNumber))
      }
    } catch (error) {
      console.error("Google Vision Error:", error);
      // setVin("Error detecting VIN.");
    } 
  };

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

  const extractVINNumber = (text) => {
    // Normalize text: Remove extra spaces, convert to uppercase
    text = text.toUpperCase().replace(/\s+/g, " ");
    // New VIN format (17 characters, no I/O/Q)
    const newVinPattern = /\b[A-HJ-NPR-Z0-9]{17}\b/g;
    // Old VIN format (5-13 characters, only letters & numbers, avoiding very short matches)
    const oldVinPattern = /\b[A-Z0-9]{5,13}\b/g;

    // Extract possible VINs
    const newVinMatches = text.match(newVinPattern) || [];
    const oldVinMatches = text.match(oldVinPattern) || [];

    // Ensure old VINs are not part of a longer word (avoid false positives)
    const filteredOldVins = oldVinMatches.filter(vin => {
        // Ignore old VINs that are just numbers (likely not real VINs)
        if (/^\d+$/.test(vin)) return false;

        // Ignore if it's a substring of a detected 17-char VIN
        return !newVinMatches.some(newVin => newVin.includes(vin));
    });

    // Merge results
    const vinNumbers = [...newVinMatches, ...filteredOldVins];

    console.log("VIN numbers:", vinNumbers)

    return vinNumbers.length ? vinNumbers[0] : "";
}

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
            {/* <input
              type="text" autoComplete="on"
              placeholder="1HTKJPVK2NH"
              value={user.vin}
              onChange={e => dispatch(info({...user, vin: e.target.value}))}
              onBlur={e => dispatch(parseVIN(e.target.value))}
              className={user.vin.length < 2 && user.nextClick ? "erorr" : ""}
              style={{ textTransform: 'uppercase' }}
              ref={vinRef}
              onKeyPress={(e) => handleKeyPress(e, null)}
            /> */}
            <div className={user.carrierID.length < 2 && user.nextClick && user.haveCarrierID ? "customInput erorr" : "customInput"}>
              <input
                type="text" autoComplete="on"
                placeholder="1HTKJPVK2NH"
                value={user.vin}
                onChange={e => dispatch(info({...user, vin: String(e.target.value).toUpperCase()}))}
                onBlur={e => dispatch(parseVIN(String(e.target.value).toUpperCase()))}
                className={user.vin.length < 2 && user.nextClick ? "erorr" : ""}
                style={{ textTransform: 'uppercase' }}
                ref={vinRef}
                onKeyPress={(e) => handleKeyPress(e, yearRef)}
              />
              <Button onClick={() => setIsCameraOpen(true)} variant="secondary" className="camera-button">
                <i className="bi bi-camera"></i>
              </Button> 
            </div>
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
              onChange={e => dispatch(info({...user, year: String(e.target.value).toUpperCase()}))}
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
              onChange={e => dispatch(info({...user, make: String(e.target.value).toUpperCase()}))}
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
              onChange={e => dispatch(info({...user, model: String(e.target.value).toUpperCase()}))}
              className={user.model.length < 2 && user.nextClick ? "erorr" : ""}
              style={{ textTransform: 'uppercase' }}
              ref={modelRef}
              onKeyPress={(e) => handleKeyPress(e, null)}
            />
          </div>
        </form>
      </div>

      <Container className="mt-5 text-center">
        {isCameraOpen ? (
          <div className="full-screen-camera">
              <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width="100%"
                  height="80%"
                  videoConstraints={{ facingMode: "environment" }}
              />
              <div className="dflex p-5" style={{width: '100%', justifyContent: 'center'}}>
                <Button variant="secondary" style={{margin: '0 20px'}} onClick={() => setIsCameraOpen(false)}>Cancel</Button>
                <Button variant="primary" style={{margin: '0 20px'}} onClick={() => handleCapture()}>Take Picture</Button>
              </div>
          </div>
        ) : null}
      </Container>


    </div>
  );
};

export default VehicalInfoStep;
