import React from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { next, back } from '../features/page';  
import { info, submit } from '../features/user';  
import { toast } from 'react-toastify';  
import axios from "axios";  
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import { API_URI } from '../const/const';  

const NavigationButtons = React.forwardRef((props, ref) => {  
  const page = useSelector((e) => e.page.value);  
  const user = useSelector((e) => e.user.value);  
  const dispatch = useDispatch();  

  const { setLoading, initialize} = props;

  const nextClick=()=>{
    console.log(user, page)
    dispatch(info({...user, nextClick:true}));

    if(user.name.length>1 && user.carrierName.length>1 && ((user.haveCarrierID && user.carrierID.length>1) || !user.haveCarrierID ) && page==0) {
      dispatch(next());
      dispatch(info({...user, nextClick:false}))
    }

    if(user.unitID.length>1 && user.licenseID.length>1 && ((user.haveOdometer && user.odometer.length>1) || !user.haveOdometer)
        && ((user.haveHours && user.hours.length>1) || !user.haveHours ) && page==1) {
      dispatch(next());
      dispatch(info({...user, nextClick:false}))
    }

    if(user.year.length>1 && user.make.length>1 && user.model.length>1 && user.vin.length>1 && page==2){
      dispatch(next());
      dispatch(info({...user, nextClick:false}))
    }

    if(user.inspecDate.length>1 && page==3){
      dispatch(next());
      dispatch(info({...user, nextClick:false}))
    }
  
    // check form page
    if(page==4 ){
      dispatch(next());
      dispatch(info({...user,nextClick:false}))
    }

    if(page==5 ){
      dispatch(next());
      dispatch(info({...user,nextClick:false}))
    }


    if(page == 6) {
      if(((user.haveFluid && user.fluid.length>1) || !user.haveFluid) && ((user.haveDTCs && user.dtcs.length>1) || !user.haveDTCs) 
          && ((!user.isCertified && user.finalReason.length>1) || user.isCertified)) {
        // start loading
        setLoading(true)  
        
        dispatch(submit(user))
          .then((res) => {
            console.log("response:", res.payload.output)
            setLoading(false)
            // handleDownload(res.payload.output)
            toast.success('The checking was completed successfully!', {
              position: "top-right",
              theme: "colored"
            });
          })
          .catch(err => {
            setLoading(false)
            toast.error('The document uploading was failed!', {
              position: "top-right",
              theme: "colored"
            });
            console.log(err);
        })
        // setLoading(false)  
      }

    }
  }




  const handleDownload = (fileName) => {  
    axios({  
      url: `${API_URI}/download`,  
      method: 'GET',  
      responseType: 'blob',  
      headers: {  
        'ngrok-skip-browser-warning': true,  
      },  
      params: {  
        fileName: fileName  
      }  
    })  
    .then((response) => {  
      const url = window.URL.createObjectURL(new Blob([response.data]));  
      const a = document.createElement('a');  
      a.href = url;  
      a.download = fileName;  
      document.body.appendChild(a);  
      a.click();  
      a.remove();  
    })  
    .catch(error => {  
      console.error('Download error:', error);  
    });  
  };  





  return (  
    <div className={page === 0 ? 'navigation btnRight' : 'navigation'}>  
      {/* {page !== 0 && <button className='btn1' onClick={() => dispatch(back())}>Go Back</button>}   */}
      {page !== 0 && <Button variant="light" onClick={() => dispatch(back())}>Go Back</Button>}  
      
      {/* {page==6 && <button className='btn3' onClick={initialize}>Reboot</button>}  */}
      {page==6 && <Button variant="danger" onClick={initialize}>Reboot</Button>}  

      {/* {user.isShowPreStep ? 
        <button ref={ref} className='btn2' onClick={nextClick}> {page==6?"Confirm":"Next Step"} </button>
        :
        <button ref={ref} className='btn2' onClick={e => dispatch(info({...user, isShowPreStep: true}))} style={{padding: '15px 40px'}}> Ok </button>
      } */}

      {user.isShowPreStep ? 
        <Button variant="primary" ref={ref} onClick={nextClick}> {page==6?"Confirm":"Next Step"} </Button>
        :
        <Button variant="primary" ref={ref} className='btn2' onClick={e => dispatch(info({...user, isShowPreStep: true}))} style={{padding: '15px 40px'}}> Ok </Button>
      }

    </div>  
  );  
});  







export default NavigationButtons;