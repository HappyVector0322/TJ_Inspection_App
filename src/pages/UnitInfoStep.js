import React from "react";
import { useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import Resizer from 'react-image-file-resizer';
import Webcam from "react-webcam";
import { info, licensePlateOCR } from "../features/user";
import { Container, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons




const UnitInfoStep = ({focusNextButton}) => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);
  const [unitInfo, setUnitInfo] = useState({
    id: "",
    odometer: ""
  });
  const [haveOdometer, setHaveOdometer] = useState(true)
  const [license, setLicense] = useState("")
  const [hours, setHours] = useState("")
  const [haveHours, setHaveHours] = useState(true)

  
  const handleFileChange = (selectedFile) => {
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

  // Refs for each input field  
  const fileInputRef = useRef(null);
  const unitIdRef = useRef(null);  
  const odometerRef = useRef(null);  
  const licenseRef = useRef(null);  
  const hoursRef = useRef(null);  
  const webcamRef = useRef(null);

  useEffect(()=>{
    setUnitInfo({...unitInfo, id:user.unitID, odometer: user.odometer })
    setHaveOdometer(user.haveOdometer)
    setLicense(user.licenseID)
    setHours(user.hours)
    setHaveHours(user.haveHours)

    if (unitIdRef.current) {  
      unitIdRef.current.focus();  
    }  
  },[])

  
  useEffect(() => {
    dispatch(info({...user, 
      unitID: unitInfo.id.toUpperCase(), 
      odometer: haveOdometer? unitInfo.odometer.toUpperCase():"", 
      haveOdometer: haveOdometer,
      licenseID: license.toUpperCase(), 
      hours: haveHours?hours.toUpperCase():"", 
      haveHours: haveHours
    }));
  }, [unitInfo.id, unitInfo.odometer, haveOdometer, license, hours, haveHours]);

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
      setUnitInfo({ ...unitInfo, odometer: "" })
      setHaveOdometer(!e.target.checked)
    } else {
      setHaveOdometer(!e.target.checked)
    }
  }

  const handleCheckChange = (e) => {
    if (e.target.checked) {
      setHours("")
      setHaveHours(!e.target.checked)
    } else {
      setHaveHours(!e.target.checked)
    }
  }

  // Capture image from webcam
  const handleCapture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    handleFileChange(screenshot)
    // setImage(screenshot);
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
              defaultValue={unitInfo.id}
              onChange={e => setUnitInfo({ ...unitInfo, id: e.target.value.replace(/\s+/g, '')})}
              style={{ textTransform: 'uppercase' }}
              placeholder="T-22"
              ref={unitIdRef}
              onKeyPress={(e) => handleKeyPress(e, odometerRef)}
            />
          </div>

          <div className="fields">
            <div className="dflex">
              <label>Unit Mileage</label>
              <div className="dflex checkMark">
                <label>is N/A?</label>
                <input 
                  type="checkbox"
                  checked={!haveOdometer}
                  onChange={haveOdometerChange}
                />
              </div>
            </div>
            <input
              type="number" autoComplete="on"
              className={user.odometer.length < 2 && user.nextClick && user.haveOdometer ? "erorr" : ""}
              defaultValue={unitInfo.odometer}
              onChange={e => setUnitInfo({ ...unitInfo, odometer: e.target.value })}
              disabled={!haveOdometer}
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
                // defaultValue={license}
                // onChange={e => setLicense(e.target.value)}
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

                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={300}
                  height={200}
                  className="d-none"
                  videoConstraints={{ facingMode: "user" }} // "environment" for rear camera
                />
                <Button onClick={handleCapture} variant="secondary" className="camera-button">
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
                  checked={!haveHours}
                  onChange={handleCheckChange}
                />
              </div>
            </div>
            <input
              type="number" autoComplete="on"
              className={user.hours.length < 1 && user.nextClick && user.haveHours ? "erorr" : ""}
              defaultValue={hours}
              onChange={e => setHours(e.target.value)}
              disabled={!haveHours}
              style={{ textTransform: 'uppercase' }}
              ref={hoursRef}  
              onKeyPress={(e) => handleKeyPress(e, null)} // No next input, focus the next button  
            />
          
          </div>
        </form>
      </div>

    </div>
  );
};

export default UnitInfoStep;




// function CameraCapture() {
//     const webcamRef = useRef(null);
//     const [image, setImage] = useState(null);

//     // Capture image from webcam
//     const capture = () => {
//         const screenshot = webcamRef.current.getScreenshot();
//         setImage(screenshot);
//     };

//     return (
//         <Container className="mt-5 text-center">
//             <h2>Capture Image</h2>

//             {!image ? (
//                 <Webcam
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     width={300}
//                     height={200}
//                     videoConstraints={{ facingMode: "user" }} // "environment" for rear camera
//                 />
//             ) : (
//                 <Image src={image} alt="Captured" thumbnail width="300" />
//             )}

//             <div className="mt-3">
//                 {!image ? (
//                     <Button variant="primary" onClick={capture}>📷 Take Picture</Button>
//                 ) : (
//                     <Button variant="danger" onClick={() => setImage(null)}>🔄 Retake</Button>
//                 )}
//             </div>
//         </Container>
//     );
// }

// export default CameraCapture;