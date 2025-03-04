import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info, updateAxleState } from "../features/user";
import { useState, useEffect,useRef} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SuffixInput from "./SuffixInput";

import 'bootstrap/dist/css/bootstrap.min.css';


const TireStat = () => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);


  const hasFrontAxleChange = (e) => {
    if(e.target.value == "yes") {
      dispatch(updateAxleState({axleType: "hasFrontAxle", axleStatus: true}))
    } else {
      dispatch(updateAxleState({axleType: "hasFrontAxle", axleStatus: false}))
    }
  };

  const hasAxle1Change = (e) => {
    if(e.target.value == "yes") {
      dispatch(updateAxleState({axleType: "hasAxle1", axleStatus: true}))
    } else {
      dispatch(updateAxleState({axleType: "hasAxle1", axleStatus: false}))
    }
  };

  const axle1IsDoubleChange = (e) => {
    if(e.target.value == "yes") {
      dispatch(updateAxleState({axleType: "axle1IsDouble", axleStatus: true}))
      
    } else {
      dispatch(updateAxleState({axleType: "axle1IsDouble", axleStatus: false}))
    }
  }

  const hasAxle2Change = (e) => {
    if(e.target.value == "yes") {
      dispatch(updateAxleState({axleType: "hasAlex2", axleStatus: true}))
    } else {
      dispatch(updateAxleState({axleType: "hasAlex2", axleStatus: false}))
    }
  };

  const axle2IsDoubleChange = (e) => {
    if(e.target.value == "yes") {
      dispatch(updateAxleState({axleType: "axle2IsDouble", axleStatus: true}))
    } else {
      dispatch(updateAxleState({axleType: "axle2IsDouble", axleStatus: false}))
    }
  }



  return (
    <div className="tireCheckInfo">
      <form className="form" autoComplete="on">
        <div className="fields">
          <div className="dflex">
            <label>Does this Unit have a Front Axle?</label>
          </div>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                value="yes"
                checked={user.hasFrontAxle}
                onChange={hasFrontAxleChange}
              />
              <span> Yes </span> 
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={!user.hasFrontAxle}
                onChange={hasFrontAxleChange}
              />
              <span> No </span> 
            </label>
          </div>
        </div>
        <div className="fields">
          <div className="dflex">
            <label>Does this Unit have a Axle 1?</label>
          </div>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                value="yes"
                checked={user.hasAxle1}
                onChange={hasAxle1Change}
              />
              <span> Yes </span> 
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={!user.hasAxle1}
                onChange={hasAxle1Change}
              />
              <span> No </span> 
            </label>
          </div>
        </div>
        { user.hasAxle1 ?
          <div className="fields">
            <div className="dflex">
              <label>Does this Axle 1 have 2 tires on each side?</label>
            </div>
            <div className="radioGroup">
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={user.axle1IsDouble}
                  onChange={axle1IsDoubleChange}
                />
                <span> Yes </span> 
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={!user.axle1IsDouble}
                  onChange={axle1IsDoubleChange}
                />
                <span> No </span> 
              </label>
            </div>
          </div>
          :
          null
        }
        <div className="fields">
          <div className="dflex">
            <label>Does this Unit have a Axle 2?</label>
          </div>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                value="yes"
                checked={user.hasAxle2}
                onChange={hasAxle2Change}
              />
              <span> Yes </span> 
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={!user.hasAxle2}
                onChange={hasAxle2Change}
              />
              <span> No </span> 
            </label>
          </div>
        </div>
        { user.hasAxle2 ?
          <div className="fields">
            <div className="dflex">
              <label>Does this Axle 2 have 2 tires on each side?</label>
            </div>
            <div className="radioGroup">
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={user.axle2IsDouble}
                  onChange={axle2IsDoubleChange}
                />
                <span> Yes </span> 
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={!user.axle2IsDouble}
                  onChange={axle2IsDoubleChange}
                />
                <span> No </span> 
              </label>
            </div>
          </div>
          :
          null
        }

        <Container className="axleCheckTable">
          <Row>
            <Col sm={12} className="tireTable" >
              <Row>
                <Col>
                  <Row>
                    <Col xs={4} sm={4} className="tireTableTitle">TIRE TREAD</Col>
                    <Col xs={4} sm={4}>
                      <Row>
                        <Col xs={6} sm={6} style={{fontWeight: 'bold'}}> 
                          <span> DRIVER INBD </span> 
                        </Col>
                        <Col xs={6} sm={6} style={{fontWeight: 'bold'}}>DRIVER OTBD</Col>
                      </Row>
                    </Col>
                    <Col xs={4} sm={4}>
                      <Row>
                        <Col xs={6} sm={6} style={{fontWeight: 'bold'}}>PASS. INBD</Col>
                        <Col xs={6} sm={6} style={{fontWeight: 'bold'}}>PASS. OTBD</Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col xs={4} sm={4} className="tireCheckItems">FRONT</Col>
                <Col xs={4} sm={4} className="tireCheckValues">                    
                  <SuffixInput 
                    inputValue={user.frontTire.dri} 
                    setInputValue={value => dispatch(info({...user, frontTire: {...user.frontTire, dri: String(value).toUpperCase()}}))}
                    disabled={!user.hasFrontAxle}
                    suffix={"/32"}
                  />
                </Col>
                <Col xs={4} sm={4} className="tireCheckValues">
                  <SuffixInput 
                    inputValue={user.frontTire.pass} 
                    setInputValue={value => dispatch(info({...user, frontTire: {...user.frontTire, pass: String(value).toUpperCase()}}))}
                    disabled={!user.hasFrontAxle}
                    suffix={"/32"}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={4} sm={4} className="tireCheckItems">AXLE1</Col>
                <Col xs={4} sm={4}>
                  <Row className="tireAxle1Driver">
                    <Col xs={6} sm={6} className="tireCheckValues">
                      <SuffixInput 
                        inputValue={user.axel1Tire.driInbd} 
                        setInputValue={value => dispatch(info({...user, axel1Tire: {...user.axel1Tire, driInbd: String(value).toUpperCase()}}))}
                        disabled={!user.hasAxle1 || !user.axle1IsDouble}
                        suffix={"/32"}
                      />
                    </Col>
                    <Col xs={6} sm={6} className="tireCheckValues">
                      <SuffixInput 
                        inputValue={user.axel1Tire.driOtbd} 
                        // setInputValue={value => setAxel1Tire({...axel1Tire, driOtbd: String(value).toUpperCase()}) }
                        setInputValue={value => dispatch(info({...user, axel1Tire: {...user.axel1Tire, driOtbd: String(value).toUpperCase()}}))}
                        disabled={!user.hasAxle1}
                        suffix={"/32"}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={4} sm={4}>
                  <Row className="tireAxle1Pass">
                    <Col xs={6} sm={6} className="tireCheckValues">
                      <SuffixInput 
                        inputValue={user.axel1Tire.passInbd} 
                        // setInputValue={value => setAxel1Tire({...axel1Tire, passInbd: String(value).toUpperCase()}) }
                        setInputValue={value => dispatch(info({...user, axel1Tire: {...user.axel1Tire, passInbd: String(value).toUpperCase()}}))}
                        disabled={!user.hasAxle1 || !user.axle1IsDouble}
                        suffix={"/32"}
                      />
                    </Col>
                    <Col xs={6} sm={6} className="tireCheckValues">
                      <SuffixInput 
                        inputValue={user.axel1Tire.passOtbd} 
                        // setInputValue={value => setAxel1Tire({...axel1Tire, passOtbd: String(value).toUpperCase()}) }
                        setInputValue={value => dispatch(info({...user, axel1Tire: {...user.axel1Tire, passOtbd: String(value).toUpperCase()}}))}
                        disabled={!user.hasAxle1}
                        suffix={"/32"}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col xs={4} sm={4} className="tireCheckItems">AXLE2</Col>
                <Col xs={4} sm={4}>
                  <Row className="tireAxle1Driver">
                    <Col xs={6} sm={6} className="tireCheckValues">
                      <SuffixInput 
                        inputValue={user.axel2Tire.driInbd} 
                        // setInputValue={value => setAxel2Tire({...axel2Tire, driInbd: String(value).toUpperCase()}) }
                        setInputValue={value => dispatch(info({...user, axel2Tire: {...user.axel2Tire, driInbd: String(value).toUpperCase()}}))}
                        disabled={!user.hasAxle2 || !user.axle2IsDouble}
                        suffix={"/32"}
                      />
                    </Col>
                    <Col xs={6} sm={6} className="tireCheckValues">
                      <SuffixInput 
                        inputValue={user.axel2Tire.driOtbd} 
                        // setInputValue={value => setAxel2Tire({...axel2Tire, driOtbd: String(value).toUpperCase()}) }
                        setInputValue={value => dispatch(info({...user, axel2Tire: {...user.axel2Tire, driOtbd: String(value).toUpperCase()}}))}
                        disabled={!user.hasAxle2}
                        suffix={"/32"}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={4} sm={4}>
                  <Row className="tireAxle1Pass">
                    <Col xs={6} sm={6} className="tireCheckValues">
                      <SuffixInput 
                        inputValue={user.axel2Tire.passInbd} 
                        // setInputValue={value => setAxel2Tire({...axel2Tire, passInbd: String(value).toUpperCase()}) }
                        setInputValue={value => dispatch(info({...user, axel2Tire: {...user.axel2Tire, passInbd: String(value).toUpperCase()}}))}
                        disabled={!user.hasAxle2 || !user.axle2IsDouble}
                        suffix={"/32"}
                      />
                    </Col>
                    <Col xs={6} sm={6} className="tireCheckValues">
                      <SuffixInput 
                        inputValue={user.axel2Tire.passOtbd} 
                        // setInputValue={value => setAxel2Tire({...axel2Tire, passOtbd: String(value).toUpperCase()}) }
                        setInputValue={value => dispatch(info({...user, axel2Tire: {...user.axel2Tire, passOtbd: String(value).toUpperCase()}}))}
                        disabled={!user.hasAxle2}
                        suffix={"/32"}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

      </form>
    </div>
  );
};

export default TireStat;
