import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='login-container'>
        <div className='login-box'>
          <form className='login-form' onSubmit={(e) => onSubmit(e)}>
            <div className='login-headline'>
              <h3>Software Sensei</h3>
            </div>
            <div className='login login-label login-email'>
              <label for=''>Email</label>
            </div>
            <div className='login login-input login-email-input'>
              <input
                type='text'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='login login-label login-password'>
              <label for=''>Password</label>
            </div>
            <div className='login login-input login-password-input'>
              <input
                type='text'
                input='password'
                name='password'
                value={password}
                minLength='6'
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='login login-button'>
              <button>Log In</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
