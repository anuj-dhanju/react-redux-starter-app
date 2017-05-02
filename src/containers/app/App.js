import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

class App extends Component {

  render() {
    const { user } = this.props;
    return (
      <div>
        { user &&
          "Dashboard"
        }
        <div className={user && 'container-body'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    user: auth ? auth.user : null,
  };
};

export default connect(
  mapStateToProps
)(App);
