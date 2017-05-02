import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {renderField, required, maxLength15, number, minLength6, tooOld, aol, email } from '../fieldValidation'

const SignupFirstStepForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, submitArrow } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <div className="form-title text-center">Sign up</div>
        <div className="form-progress">
          <div className="progress-bar" style={{width: '33'}}></div>
        </div>
        <div className="clearfix"></div>
        <div className="sos-form">
          <Field name="email" type="text"
              component={renderField} label="Email"
              validate={[ required, email ]}
            />
          <Field name="password" type="password"
              component={renderField} label="Password"
              validate={[ required, minLength6 ]}
            />
          <Field name="password_confirmation" type="password"
              component={renderField} label="Confirm Password"
              validate={[ required, minLength6 ]}
            />
          <div className="form-footer">
            <button type="submit" className="submit-btn pull-right" disabled={submitting}>Next <img src={submitArrow} /></button>
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
