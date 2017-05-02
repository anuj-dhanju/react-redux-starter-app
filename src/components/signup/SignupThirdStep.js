import React, { Component } from 'react';


export default class Signup extends Component {
  render() {
    const { submitArrow } = this.props
    return (
      <div className="form-wrapper">
        <div className="form-title text-center">Thank you</div>
        <div className="form-progress">
          <div className="progress-bar"  style={{width: '100%'}}></div>
        </div>
        <div className="clearfix"></div>
        <div className="sos-form">
          <div className="thank-you-circle">

          </div>
          <div className="text-center">
            <a href="javascript:void(0)" className="btn btn-hollow">
              Go to dashboard <img src={submitArrow} />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

