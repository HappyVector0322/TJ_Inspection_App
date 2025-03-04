import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import Steps from "./pages/Steps";
import PreStep from "./pages/PreStep";
import InspectorInfoStep from "./pages/InspectorInfoStep";
import UnitInfoStep from "./pages/UnitInfoStep";
import VehicalInfoStep from "./pages/VehicalInfoStep";
import DateInfoStep from "./pages/DateInfoStep"
import CheckInfoStep from "./pages/CheckInfoStep"
import TireCheckStep from "./pages/TireCheckStep";
import FinalStep from "./pages/FinalStep"
import NavigationButton from "./pages/NavigationButtons"

import { select } from "./features/page";
import { info, init } from "./features/user";



function App() {
  const user = useSelector(e => e.user.value);
  const page=useSelector((e)=>e.page.value)
  const dispatch = useDispatch();
  const nextButtonRef = useRef(null);  
  const [loading, setLoading] = useState(false);

  const focusNextButton = () => { 
    if (nextButtonRef.current) {  
      nextButtonRef.current.focus();  
    }  
  };  

  const initialize = () => {
    console.log("format start")
    localStorage.setItem('TJPurewal_checking_page', '');
    localStorage.setItem('TJPurewal_checking_data', '');
    dispatch(select({selectedPage: 0}))
    dispatch(init())
  }


  useEffect(() => {
    const checkPageStr = localStorage.getItem('TJPurewal_checking_page');
    const checkPageNum = checkPageStr ? Number(checkPageStr) : 0;
    const checkDataStr = localStorage.getItem('TJPurewal_checking_data');
    const checkDataJson = checkDataStr ? JSON.parse(checkDataStr) : {};
    dispatch(select({selectedPage: checkPageNum}))
    dispatch(info({...user, ...checkDataJson}))
  }, [])

  // TJPurewal_checking_page


  const PageDisplay=()=>{
    switch(page){
      case 0:
        return <InspectorInfoStep focusNextButton={focusNextButton} />
      case 1:
        return <UnitInfoStep focusNextButton={focusNextButton} />
      case 2:
        return <VehicalInfoStep focusNextButton={focusNextButton} />
      case 3:
        return <DateInfoStep focusNextButton={focusNextButton} />
      case 4:
        return <CheckInfoStep focusNextButton={focusNextButton} />
      case 5:
        return <TireCheckStep focusNextButton={focusNextButton} />
      case 6:
        return <FinalStep focusNextButton={focusNextButton} />
    }
  }

  return (
    <main>
      <div className="Container">
        <Steps/>
        { user.isShowPreStep ? 
          <div className="content">
            {PageDisplay()}
            <NavigationButton ref={nextButtonRef} setLoading={setLoading} initialize={initialize}/>
          </div> 
          :
          <div className="content">
            <PreStep />
            <NavigationButton ref={nextButtonRef} setLoading={setLoading} initialize={initialize}/>
          </div>  
        }
      </div>

      <Modal show={loading} centered>
        <Spinner animation="border" variant="primary" >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Modal>
      
      <ToastContainer />
    </main>
  );
}

export default App;
