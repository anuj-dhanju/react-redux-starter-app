import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import { loadIdToken } from '../../utils/apiUtils';
import SignupForm from '../../components/signup/SignupForm';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      // logged in, let's show redirect if any, or show home
      try {
        const redirect = this.props.location.query.redirect;
        this.context.router.replace(redirect);
      } catch (err) {
        this.context.router.replace('/dashboard');
      }
    }
  }

  handleSignup(values) {
    console.log(values);
    this.props.dispatch(signup(values));
  }

  render() {
    return (
      <div className="container">
        { 
          !loadIdToken() &&
          <div className="row">
            <div className="col-md-4" style={{ float: 'none', margin: '0 auto' }}>
              <div className="card">
                <div className="card-header">Please Log in</div>
                <SignupForm onSubmit={this.handleSignup} {...this.props} />
              </div>
            </div>
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
