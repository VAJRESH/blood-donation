import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import FormComponent from './components/form-component';
import DonationDate from './components/donation-date-form';
import ShowList from './components/show-list-component';
import Profile from './components/donor-profile';

function App() {
  return (
    <div>
      <Router>
        <Route exact path='/' component={ShowList}/>
        <Route path='/add' component={FormComponent}/>
        <Route path='/edit/:id' component={FormComponent}/>
        <Route path='/donation/:id' component={DonationDate}/>
        <Route path='/profile/:id' component={Profile}/>
      </Router>
    </div>
  );
}

export default App;
