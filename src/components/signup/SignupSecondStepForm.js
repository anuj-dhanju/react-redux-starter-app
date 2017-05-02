import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {renderField, required, maxLength15, number, minValue18, tooOld, aol, email } from '../fieldValidation'

const SignupFirstStepForm = (props) => {
  const { handleSubmit, previousPage, pristine, reset, submitting, submitArrow } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <div className="form-title text-center">Sign up</div>
        <div className="form-progress">
          <div className="progress-bar" style={{width: '66'}}></div>
        </div>
        <div className="clearfix"></div>
        <div className="sos-form">
          <div className="form-group">
            <label className="text-center">Date of birth</label>
            <div className="input-group custom-input-group">
              <input type="text" className="custom-control text-uppercase" placeholder="DD" />
              <input type="text" className="custom-control text-uppercase" placeholder="MM"/>
              <input type="text" className="custom-control text-uppercase" placeholder="YYYY" />
            </div>
          </div>
          <div className="form-group">
            <label className="text-center">Gender</label>
            <div className="btn-group btn-group-lg custom-group" role="group" aria-label="Large button group"> 
              <button type="button" className="btn btn-default btn-selected text-uppercase">Male</button> 
              <button type="button" className="btn btn-default text-uppercase">Female</button>
              <button type="button" className="btn btn-default text-uppercase">Unspecified</button> 
            </div>
          </div>
          <div className="form-group">
            <label className="text-center">Where did you hear about us?</label>
              <select className="form-control">
                <option>option 1</option>
              </select>
          </div>
          <div className="form-footer">
            <button type="button" onClick={previousPage} className="back-btn pull-left">Back</button>
            <button type="submit" className="submit-btn pull-right">Next <img src={submitArrow} /></button>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'signupForm',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(SignupFirstStepForm)
