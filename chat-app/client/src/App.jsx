import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './views/Index';
import Chat from './views/Chat';
import NotFoundPage from './views/404';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/chat" exact component={Chat} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
