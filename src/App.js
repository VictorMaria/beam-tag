import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BeamTag from './components/beamTag/BeamTag';
import Alert from './components/alert/Alert';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <>
       <Alert />
         <div className="App">
             <img src={logo} alt="logo" />
                 <BeamTag />
              <div className="footer">
                <p>Powered by NoTeTHat!</p>
                <p>Copyright © 2020 Owls and Robins Publishing</p>
              </div>
         </div>
      </>
                  </Provider>
  );
}

export default App;
