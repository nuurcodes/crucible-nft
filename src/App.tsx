import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Header from './components/layout/header';
import NoMatch from './pages/no-match';
import Stake from './pages/stake';
import { Box, Flex } from '@chakra-ui/layout';
import { ReactElement } from 'react';

function App (): ReactElement {
  return (
    <Flex minH="100vh" flexDirection="column">
      <Router>
        <Header />
        <Box flexGrow={1}>
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
        </Box>
      </Router>
    </Flex>
  );
}

export default App;
