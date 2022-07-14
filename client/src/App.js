import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Logging } from './components/Logging';
import Home from './components/Home'

import { Backdrop, CircularProgress } from '@material-ui/core';
import PrivateRoute from './components/PrivateRoute'
import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {

  const classes = useStyles();
  const state = useSelector(state => state.status.isLoading)

  return (
    <div className="App">
      <Backdrop className={classes.backdrop} open={state}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Router>
        <Route exact path="/login" component={Logging} />
        <PrivateRoute exact path="/" component={Home} />
      </Router>
    </div >
  );
}

export default App;
