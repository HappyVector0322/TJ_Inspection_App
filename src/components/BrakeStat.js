import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { info, updateAxleState } from "../features/user";
import { useState, useEffect,useRef} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SuffixInput from "./SuffixInput";

import 'bootstrap/dist/css/bootstrap.min.css';


const BrakeStat = () => {
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

        <Container className="axleCheckTable">
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
  );
};

export default BrakeStat;
