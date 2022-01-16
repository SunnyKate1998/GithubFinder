import './App.css';
import Navbar from './components/layouts/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './components/users/User';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import GithubState from './components/context/github/GithubState';
import AlertState from './components/context/alert/AlertState';

const App = () => {
    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Alert />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/user/:login" component={User} />
                            <Route exact path="/about" component={About} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
