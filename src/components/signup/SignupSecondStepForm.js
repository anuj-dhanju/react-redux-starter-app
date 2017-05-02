import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {renderDateField, required, minValue1, maxValue31, maxValue12 } from '../fieldValidation'

const SignupFirstStepForm = (props) => {
  const { handleSubmit, previousPage, pristine, reset, submitting, submitArrow } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <div className="form-title text-center">Sign up</div>
        <div className="form-progress">
          <div className="progress-bar" style={{width: '66%'}}></div>
        </div>
        <div className="clearfix"></div>
        <div className="sos-form">
          <div className="form-group">
            <label className="text-center">Date of birth</label>
            <div className="input-group custom-input-group date-group">
            	<Field name="date" type="number"
              component={renderDateField} className="custom-control text-uppercase" label="DD"
              validate={[ required, minValue1, maxValue31 ]}
            	/>
            	<Field name="month" type="number"
              component={renderDateField} className="custom-control text-uppercase" label="MM"
              validate={[ required, minValue1, maxValue12 ]}
            	/>
              <Field name="year" type="number"
              component={renderDateField} className="custom-control text-uppercase" label="YYYY"
              validate={[ required ]}
            	/>
            </div>
          </div>
          <div className="form-group">
            <label className="text-center">Gender</label>
            <div className="btn-group btn-group-lg radio-toolbar custom-group" role="group" aria-label="Large button group"> 
            	<Field name="gender" type="radio" value="male" id="male" defaultChecked={true}
              component='input'  validate={[ required ]}
            	/>
              <label type="button" htmlFor="male" className="btn btn-default text-uppercase">Male</label> 
            	<Field name="gender" type="radio" value="female" id="female"
              component='input' validate={[ required ]}
            	/>
              <label type="button" htmlFor="female" className="btn btn-default text-uppercase">Female</label>
            	<Field name="gender" type="radio" value="unspecified"
              component='input' validate={[ required ]} id="unspecified"
            	/>
              <label type="button" htmlFor="unspecified" className="btn btn-default text-uppercase">Unspecified</label> 
            </div>
          </div>
          <div className="form-group">
            <label className="text-center">Where did you hear about us?</label>
            <Field name="how_hear_about_us" className="form-control" component="select">
              <option value="">Select</option>
              <option value="newspaper">Newspaper</option>
              <option value="internet">Internet</option>
            </Field>
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
