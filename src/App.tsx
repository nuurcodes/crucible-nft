import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Landing from './pages/landing';
import Header from './components/layout/header';
import NoMatch from './pages/no-match';
import Stake from './pages/stake';

function App () {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/stake">
          <Stake />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
