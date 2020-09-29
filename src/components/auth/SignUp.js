import React from 'react';
import '../styles.css';

const SignUp = ({ email, password, onChange, OnClickSignUp, onClickSignInText, loading }) => {
    return (
        <div>
            <h3>Register</h3>
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
                                className="glimming-sign-up"
                            >
                            Sign Up...</button>
                            ) : (
                            <button
                                className="action"
                                onClick={OnClickSignUp}
                            >
                            Sign Up</button>
                            )
                    }
                </div>
                <div className="input-div">
                    <span onClick={onClickSignInText}><p>Sign In</p></span>
                </div>
            </div>
        </div>
    );
};

export default SignUp;