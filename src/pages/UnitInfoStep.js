import React from "react";
import { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import Resizer from 'react-image-file-resizer';
import Webcam from "react-webcam";
import { info, licensePlateOCR } from "../features/user";
import { Container, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons




const CameraCapture = () => {
  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log('Captured image:', imageUrl);
      // Use this image URL to preview or upload
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment" // "user" for front camera
        onChange={handleCapture}
        style={{ display: 'none' }}
        id="cameraInput"
      />
      <label htmlFor="cameraInput">
        <button>📷 Take a Picture</button>
      </label>
    </div>
  );
}


const UnitInfoStep = ({focusNextButton}) => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  // Refs for each input field  
  const fileInputRef = useRef(null);
  const unitIdRef = useRef(null);  
  const odometerRef = useRef(null);  
  const licenseRef = useRef(null);  
  const hoursRef = useRef(null);  
  const webcamRef = useRef(null);

  useEffect(()=>{
    if (unitIdRef.current) {  
      unitIdRef.current.focus();  
    }  
  },[])

  
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

  const haveOdometerChange = (e) => {
    if (e.target.checked) {
      dispatch(info({...user, odometer: "", haveOdometer: !e.target.checked}))
    } else {
      dispatch(info({...user, haveOdometer: !e.target.checked}))
    }
  }

  const handleCheckChange = (e) => {
    if (e.target.checked) {
      dispatch(info({...user, hours: "", haveHours: !e.target.checked}))
    } else {
      dispatch(info({...user, haveHours: !e.target.checked}))
    }
  }

  const handleFileChange = (selectedFile) => {
    console.log("image:", selectedFile)
    if (!selectedFile) {
      console.log("Please select a file first!");
      return;
    }

    Resizer.imageFileResizer(
      selectedFile,
      800, // max width
      600, // max height
      'JPEG', // output format
      70, // quality (0-100)
      0, // rotation
      (uri) => {
        fetch(uri)
          .then(res => res.blob())
          .then(blob => {
            if (blob.size <= 3 * 1024 * 1024) {
              console.log("resized blob size:", blob.size)
              dispatch(licensePlateOCR(uri))
            } else {
              console.log('Resized image exceeds 3MB. Please try a smaller image.');
            }
          });
      },
      'base64' // output type
    );
  }

  // Capture image from webcam
  const handleCapture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setIsCameraOpen(false); // Exit full screen after capturing

    if (!screenshot) {
        console.error("Error capturing image.");
        return;
    }

    // Convert base64 to Blob for Resizer
    fetch(screenshot)
      .then(res => res.blob())
      .then(blob => {
        handleFileChange(blob)
      })
      .catch(error => {
        console.error("Error processing image:", error);
        setIsCameraOpen(false);
      });
  };


  return (
    <div className="unitInfo info">
      <h2>Unit info</h2>
      <p>Please provide Unit Identifier and Unit Mileage.</p>

      <div className="formContainer">
        <form className="form" autoComplete="on">
          <div className="fields">
            <div className="dflex">
              <label>Unit Identifier</label>
              {user.nextClick && (
                <span>{user.unitID.length < 2 && "This field is required"}</span>
              )}
            </div>
            <input
              type="text" autoComplete="on"
              className={user.unitID.length < 2 && user.nextClick ? "erorr" : ""}
              value={user.unitID}
              onChange={e => dispatch(info({...user, unitID: e.target.value.replace(/\s+/g, '').toUpperCase()}))}
              style={{ textTransform: 'uppercase' }}
              placeholder="T-22"
              ref={unitIdRef}
              onKeyPress={(e) => handleKeyPress(e, odometerRef)}
            />
          </div>

          
          <div className="fields">
            <CameraCapture />
          </div>


          <div className="fields">
            <div className="dflex">
              <label>Unit Mileage</label>
              <div className="dflex checkMark">
                <label>is N/A?</label>
                <input 
                  type="checkbox"
                  checked={!user.haveOdometer}
                  onChange={haveOdometerChange}
                />
              </div>
            </div>
            <input
              type="number" autoComplete="on"
              className={user.odometer.length < 2 && user.nextClick && user.haveOdometer ? "erorr" : ""}
              value={user.odometer}
              onChange={e => dispatch(info({...user, odometer: e.target.value.toUpperCase()}))}
              disabled={!user.haveOdometer}
              style={{ textTransform: 'uppercase' }}
              placeholder="111698"
              ref={odometerRef}
              onKeyPress={(e) => handleKeyPress(e, licenseRef)}
            />
          
          </div>

          <div className="fields">
            <div className="dflex">
              <label>License Identifier</label>
              {user.nextClick && (
                <span>{user.licenseID.length < 2 && "This field is required"}</span>
              )}
            </div>

            <div className={user.carrierID.length < 2 && user.nextClick && user.haveCarrierID ? "customInput erorr" : "customInput"}>
              <input
                type="text" autoComplete="on"
                className={user.licenseID.length < 2 && user.nextClick ? "erorr" : ""}
                value={user.licenseID}
                onChange={e => dispatch(info({...user, licenseID: e.target.value}))}
                style={{ textTransform: 'uppercase' }}
                placeholder="41216P3"
                ref={licenseRef}  
                onKeyPress={(e) => handleKeyPress(e, hoursRef)} 
              />
              <div>
                {/* <input
                  type="file"
                  ref={fileInputRef}
                  onChange={e => handleFileChange(e.target.files[0])}
                  className="d-none"
                  accept="image/*"
                />
                <Button onClick={() => fileInputRef.current.click()} variant="secondary" className="camera-button">
                  <i className="bi bi-camera"></i>
                </Button> */}
                <Button onClick={() => setIsCameraOpen(true)} variant="secondary" className="camera-button">
                  <i className="bi bi-camera"></i>
                </Button> 
              </div>
            </div>
          </div>

          <div className="fields">
            <div className="dflex">
              <label>Equipment mounted hours</label>
              <div className="dflex checkMark">
                <label>is N/A?</label>
                <input 
                  type="checkbox"
                  checked={!user.haveHours}
                  onChange={handleCheckChange}
                />
              </div>
            </div>
            <input
              type="number" autoComplete="on"
              className={user.hours.length < 1 && user.nextClick && user.haveHours ? "erorr" : ""}
              value={user.hours}
              onChange={e => dispatch(info({...user, hours: e.target.value.toUpperCase()}))}
              disabled={!user.haveHours}
              style={{ textTransform: 'uppercase' }}
              ref={hoursRef}  
              onKeyPress={(e) => handleKeyPress(e, null)} // No next input, focus the next button  
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

export default UnitInfoStep;


