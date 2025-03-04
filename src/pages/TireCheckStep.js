import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../features/user";
import { useState, useEffect,useRef} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SuffixInput from "../components/SuffixInput";

import 'bootstrap/dist/css/bootstrap.min.css';


const TireCheckStep = () => {
  const dispatch = useDispatch();
  const user = useSelector(e => e.user.value);

  return (
    <div className="info tireCheckInfo">
      <h2>Tire & Brake info</h2>
      <p>Please review tire and brake stats for accuracy and edit if required.</p>

      <div className="formContainer">
        <form className="form" autoComplete="on">
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
            <Row>
              <Col sm={12} className="brakeTable">
                <Row>
                  <Col xs={4} sm={4} className="brakeTableTitle">BRAKES</Col>
                  <Col xs={4} sm={4} style={{fontWeight: 'bold'}}>DRIVER</Col>
                  <Col xs={4} sm={4} style={{fontWeight: 'bold'}}>PASS.</Col>
                </Row>
                <Row>
                  <Col xs={4} sm={4} className="brakeCheckItems">FRONT</Col>
                  <Col xs={4} sm={4} className="tireCheckValues">
                    <SuffixInput 
                      inputValue={user.frontBrake.dri} 
                      setInputValue={value => dispatch(info({...user, frontBrake: {...user.frontBrake, dri: String(value).toUpperCase()}}))}
                      disabled={!user.hasFrontAxle}
                      suffix={"%"}
                    />
                  </Col>
                  <Col xs={4} sm={4} className="tireCheckValues">
                    <SuffixInput 
                      inputValue={user.frontBrake.pass} 
                      setInputValue={value => dispatch(info({...user, frontBrake: {...user.frontBrake, pass: String(value).toUpperCase()}}))}
                      disabled={!user.hasFrontAxle}
                      suffix={"%"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={4} sm={4} className="brakeCheckItems">AXLE1</Col>
                  <Col xs={4} sm={4} className="tireCheckValues">
                    <SuffixInput 
                      inputValue={user.axel1Brake.dri} 
                      setInputValue={value => dispatch(info({...user, axel1Brake: {...user.axel1Brake, dri: String(value).toUpperCase()}}))}
                      disabled={!user.hasAxle1}
                      suffix={"%"}
                    />
                  </Col>
                  <Col xs={4} sm={4} className="tireCheckValues">
                    <SuffixInput 
                      inputValue={user.axel1Brake.pass} 
                      setInputValue={value => dispatch(info({...user, axel1Brake: {...user.axel1Brake, pass: String(value).toUpperCase()}}))}
                      disabled={!user.hasAxle1}
                      suffix={"%"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={4} sm={4} className="brakeCheckItems">AXLE2</Col>
                  <Col xs={4} sm={4} className="tireCheckValues">
                    <SuffixInput 
                      inputValue={user.axel2Brake.dri} 
                      setInputValue={value => dispatch(info({...user, axel2Brake: {...user.axel2Brake, dri: String(value).toUpperCase()}}))}
                      disabled={!user.hasAxle2}
                      suffix={"%"}
                    />
                  </Col>
                  <Col xs={4} sm={4} className="tireCheckValues">
                    <SuffixInput 
                      inputValue={user.axel2Brake.pass} 
                      setInputValue={value => dispatch(info({...user, axel2Brake: {...user.axel2Brake, pass: String(value).toUpperCase()}}))}
                      disabled={!user.hasAxle2}
                      suffix={"%"}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>

        </form>
      </div>
    </div>
  );
};

export default TireCheckStep;
