import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import FormComponent from './components/form-component';
import DonationDate from './components/donation-date-form';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route exact path='/' component={LandingPage}/>
        <Route path='/add' component={FormComponent}/>
        <Route path='/donation/:id' component={DonationDate}/>
        <Route path='/profile/:id' component={Profile}/>
      </Router>
    </div>
  );
}

export default App;
