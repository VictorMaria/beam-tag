import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import '../styles.css';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp'
import Tag from '../tag/Tag';
import setAlert from '../../redux/actions/alert';
import API_SERVICE from '../../services/APIs';
import { signUpValidator, signInValidator, whitespacePattern } from '../../utils/authValidator';
import { connectToSocket } from '../../utils/sockets';

const BeamTag = ({ setAlert }) => {
    const initialState = {
        email: '',
        password: '',
      };
      const [
        { email, password },
        setState
      ] = useState(initialState);
      const [ status, setStatus ] = useState('');
      const [ loading, setLoading ] = useState(false);
      const [ socket, setSocket ] = useState({});
      const [ beamSuccessful, setBeamSuccessful ] = useState(false);
      const [ reflectionSuccessful, setReflectionSuccessful ] = useState(false);
      const [ phoneClipboard, setPhoneClipboard ] = useState('');
      useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setStatus('authSuccessful');
            const newSocket = connectToSocket();
            setSocket(newSocket);
        }
      }, [status]);
    
      const onChange = event => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
      };
      const clearState = () => {
        setState({ ...initialState });
      };
      const onClickSignUpText = () => {
        clearState();
        setStatus('signUpTextClicked');
      };
      const onClickSignInText = () => {
        clearState();
        return setStatus('');
      };
      const onClickClearLocalStorage = () => {
        localStorage.setItem('token', '');
        clearState();
        return setStatus('');
    }
      const OnClickSignUp = async () => {
        const validationError = signUpValidator({ email, password });
        if(validationError) {
            return setAlert(`${validationError}`, 'failure')
        }
        const userDetails = {
            firstName: 'FirstNameHere',
            lastName: 'LastNameHere',
            email,
            password,
            confirmPassword: password,
        };
        setLoading(true);
        try {
            const result = await API_SERVICE.post('/auth/signup', userDetails);
            localStorage.setItem('token', result.data.user.token);
            setStatus('authSuccessful');
            setLoading(false);
            return setAlert('Congrats!', 'success');
        } catch(error) {
            setLoading(false);
            return setAlert(error.response.data.errors.message, 'failure');
        };
      }
      const OnClickSignIn = async () => {
        const validationError = signInValidator({ email, password });
        if(validationError) {
            return setAlert(`${validationError}`, 'failure')
        }  
        const userDetails = {
            email,
            password,
        };
        setLoading(true);
        try {
            const result = await API_SERVICE.post('/auth/signin', userDetails);
            localStorage.setItem('token', result.data.user.token);
            setStatus('authSuccessful');
            setLoading(false);
            return setAlert('Authenticated!', 'success');
        } catch(error) {
            setLoading(false);
            return setAlert(error.response.data.errors.message, 'failure');
        };
      }
      const onClickBeamToPhone = async () => {
        const token = localStorage.getItem('token');
        setBeamSuccessful(false);
        try {
          const clipboardContent = await navigator.clipboard.readText();
          if(!clipboardContent || whitespacePattern.test(clipboardContent)) {
            return setAlert('No content to beam', 'delete-success');
          }
          socket.emit('rayFromPC', { token, clipboardContent });
          socket.on('responseToPC', (result) => {
          if(result === 'token error') {
            setAlert('Sign In required', 'delete-success');
            return onClickClearLocalStorage();
          }
          if(result === 'Oops, a hiccup!') {
            return setAlert('A hiccup! Please Retry', 'delete-success');
          }
          return setBeamSuccessful(true);
        });
        } catch (err) {
          console.error('Failed to read clipboard contents: ', err);
        }
      }
      const onClickReflectPhone = async () => {
        setAlert('Up Next...')
        const token = localStorage.getItem('token');
        setReflectionSuccessful(false);
        socket.emit('relfectPhone', { token });
        socket.on('reflectionResponseToPC', (result) => {
          if(result === 'token error') {
            setStatus('');
          }
          setPhoneClipboard(result.reflection)  
          setReflectionSuccessful(true);
        });
        try {
          await navigator.clipboard.writeText(phoneClipboard);
        } catch (err) {
          console.error('Failed writing to clipboard', err);
        }
      }
    switch (status) {
        case '':
            return (
                <SignIn email={email}
                        password={password}
                        onChange={onChange}
                        OnClickSignIn={OnClickSignIn}
                        onClickSignUpText={onClickSignUpText}
                        loading={loading}
                    />
            );
        case 'authSuccessful':
             return (<Tag 
                        beamSuccessful={beamSuccessful}
                        reflectionSuccessful={reflectionSuccessful}
                        onClickBeamToPhone={onClickBeamToPhone}
                        onClickReflectPhone={onClickReflectPhone}
                        onClickClearLocalStorage={onClickClearLocalStorage}
                    />);
        case 'signUpTextClicked':
            return (
                    <SignUp email={email}
                        password={password}
                        onChange={onChange}
                        OnClickSignUp={OnClickSignUp}
                        onClickSignInText={onClickSignInText}
                        loading={loading}
                    />);  
        default:
            return null;                   
    }
};

export default (connect(null, { setAlert })(BeamTag));