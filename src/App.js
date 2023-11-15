import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import logging from './logging';

function App() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
      logging.info('Initiating SAML check.', 'SAML');

      axios({
          method: 'GET',
          url: 'http://priceupdateonline-dev.ap-southeast-3.elasticbeanstalk.com/whoami',
          withCredentials: true
      })
      .then(response => {
          logging.info(response.data.user, 'SAML');

          if (response.data.user.nameID)
          {
              setEmail(response.data.user.nameID);
              setLoading(false);
          }
          else
          {
              RedirectToLogin();    
          }
      })
      .catch(error => {
          logging.error(error, 'SAML');
          RedirectToLogin();
      })
  }, []);

  const RedirectToLogin = () => {
      window.location.replace('http://priceupdateonline-dev.ap-southeast-3.elasticbeanstalk.com/login');
  }

  if (loading){
    return <p>loading ...</p>
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
