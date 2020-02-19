import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Calendar } from './components/calendar/Calendar';
import { NotFoundPage } from './components/shared/NotFoundPage';
import { AppLayout } from './components/shared/appLayout/AppLayout';

const App = () => (
  <AppLayout>
    <Switch>
      <Redirect exact from="/" to="/calendar" />
      <Route path='/calendar' component={Calendar} />
      <Route component={NotFoundPage} />
    </Switch>
  </AppLayout>
);

export default App;