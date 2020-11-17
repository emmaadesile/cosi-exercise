import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CheckinForm from '../components/CheckinForm';
import InfoForm from '../components/InfoForm';
import ConfirmationForm from '../components/ConfirmationForm';
import ReviewForm from '../components/ReviewForm';

const PageRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <CheckinForm />
      </Route>
      <Route path="/info">
        <InfoForm />
      </Route>
      <Route path="/review" render={(routeProps) => <ReviewForm {...routeProps} />} />
      <Route path="/confirmation">
        <ConfirmationForm />
      </Route>
    </Switch>
  </Router>
);

export default PageRoutes;
