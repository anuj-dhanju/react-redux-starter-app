import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import { loadIdToken } from '../../utils/apiUtils';
import SignupFirstStepForm from '../../components/signup/SignupFirstStepForm';
import SignupSecondStepForm from '../../components/signup/SignupSecondStepForm';
import SignupThirdStep from '../../components/signup/SignupThirdStep';

import submitArrow from './images/submitArrow.jpg' 

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
    this.nextPage = this.nextPage.bind(this)
    this.state = {
      page: 1
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  handleSignup(values) {
    console.log(values);
    alert("Form values "+ JSON.stringify(values));
    this.nextPage();
    this.props.dispatch(signup(values));
  }

  render() {
    const { page } = this.state
    return (
      <div>
        { 
          !loadIdToken() &&
            <div>
              {page === 1 && <SignupFirstStepForm onSubmit={this.nextPage} submitArrow={submitArrow} initialValues={{gender: 'male'}}/>}
              {page === 2 && <SignupSecondStepForm previousPage={this.previousPage.bind(this)} onSubmit={this.handleSignup} submitArrow={submitArrow}/>}
              {page === 3 && <SignupThirdStep submitArrow={submitArrow}/>}
            </div>
        }
      </div>
    );
  }
}

Signup.propTypes = {
  user: PropTypes.object,
  signupError: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  const { auth } = state;
  if (auth) {
    return { user: auth.user, signupError: auth.signupError };
  }

  return { user: null };
}

export default connect(mapStateToProps)(Signup);
