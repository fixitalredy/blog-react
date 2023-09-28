/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { loginAuth } from '../../store/authSlice';
import './SignForms.scss';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  const submitHandler = (data) => {
    dispatch(loginAuth(data));
  };
  return (
    <div className="main__sign-container">
      <h2 className="main__sign-title">Sign In</h2>
      <form
        className="main__sign-up-form"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label htmlFor="emailLog">Email address</label>
        <input
          type="text"
          className={
            errors.email ? 'main__sign-input--invalid' : 'main__sign-input'
          }
          id="emailLog"
          placeholder="Email address"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: regEmail,
              message: 'Invalid email format',
            },
          })}
        />
        {errors.email && (
          <p className="main__sign-input-warning">{errors.email.message}</p>
        )}
        <label htmlFor="passwordLog">Password</label>
        <input
          type="text"
          className={
            errors.password ? 'main__sign-input--invalid' : 'main__sign-input'
          }
          id="passwordLog"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && (
          <p className="main__sign-input-warning">{errors.password.message}</p>
        )}
        <input
          type="submit"
          className="main__sign-submit"
          id="sumbitReg"
          value="Login"
        />
        <p className="main__footer">
          Don’t have an account?{' '}
          <NavLink
            to="/sign-up"
            style={{ color: '#1890FF', textDecoration: 'none' }}
            href="213"
          >
            Sign Up
          </NavLink>
          .
        </p>
      </form>
    </div>
  );
}

export default SignIn;
