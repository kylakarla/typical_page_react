import React, { useState, useEffect } from 'react'
import MainHeader from './components/MainHeader/MainHeader'
import Login from '../src/components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import AuthContext from './components/store/auth-context.jsx'


function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    if(JSON.parse(localStorage.getItem('isLoggedUser')) !== null) {
      return JSON.parse(localStorage.getItem ('isLoggedUser')).isLogged
    } else {
      return false;
    }
  })

  useEffect(() => {
    const storedLoggedUserData = JSON.parse(localStorage.getItem('isLoggedUser'));
    if (storedLoggedUserData !== null) {
      if (storedLoggedUserData.isLogged === true) {
        setLoggedIn(true);
      }
    }
  }, []);

  const loginHandler = (user, password) => {

    if (user && password && password.length > 6) {

      localStorage.setItem('isLoggedUser', JSON.stringify({
        username: user,
        isLogged: true
      }));
      setLoggedIn(true);
    } else {
      alert("Invalid credentials, please try again.");
    }
  };


  const logoutHandler = () => {

    localStorage.removeItem('isLoggedUser');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={
      {
        loggedIn: loggedIn,
        onLogout:logoutHandler
      }
    }>
      <React.Fragment>
        <MainHeader isAuthenticated={loggedIn} onLogout={logoutHandler} />
        
        <main>
          {}
          {!loggedIn && <Login onLogin={loginHandler} />}
          
          {/* Show Home if user is logged in */}
          {loggedIn && <Home />}
        </main>
      </React.Fragment>
    </AuthContext.Provider>
  );
}

export default App;