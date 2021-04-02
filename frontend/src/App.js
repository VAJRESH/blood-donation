import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import FormComponent from './pages/Forms/NewDonorEntryForm/DonorEntryForm';
import DonationDate from './pages/Forms/NewDonationByDonor/RecentDonationForm';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route exact path='/' component={LandingPage}/>
        <Route path='/add' component={FormComponent}/>
        <Route path='/donation/:id' component={DonationDate}/>
        <Route path='/edit/:id' component={FormComponent}/>
        <Route path='/profile/:id' component={Profile}/>
      </Router>
    </div>
  );
}

export default App;
