import React from 'react';
import '../styles.css';

const SignIn = ({ email, password, onChange, OnClickSignIn, onClickSignUpText, loading }) => {
    return (
        <div>
            <h3>Welcome Back!</h3>
            <div className="input-wrapper">
                <div className="input-div">
                    <input
                        name="email"
                        value={email}
                        type="text"
                        placeholder="Email"
                        onChange={onChange}
                />
                </div>
                <div className="input-div">
                    <input
                        name="password"
                        value={password}
                        type="password"
                        placeholder="Password"
                        onChange={onChange}
                />
                </div>
                <div className="input-div">
                    {
                        loading ? (
                            <button
                                className="glimming-sign-in"
                            >
                    Sign In...</button>
                        ) : (
                            <button
                            className="action"
                            onClick={OnClickSignIn}
                        >
                    Sign In</button>
                        )
                    }
                </div>
                <div className="input-div">
                    <span onClick={onClickSignUpText}><p>Sign Up</p></span>
                </div>
            </div>
        </div>
    );
};

export default SignIn;