import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FormComponent from './components/form-component';
import ShowList from './components/show-list-component';

function App() {
  return (
    <div>
      <Router>
        <Route exact path='/' component={ShowList}/>
        <Route path='/add' component={FormComponent}/>
      </Router>
    </div>
  );
}

export default App;
