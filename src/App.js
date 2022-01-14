import './App.css';
import Navbar from './components/layouts/Navbar';
import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [repos, setRepos] = useState([]);
    const [alert, setAlert] = useState(null);
    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     const res = await axios.get('https://api.github.com/users');
    //     console.log(res.data);
    //     this.setState({ users: res.data, loading: false });
    // }
    const searchUsers = async text => {
        setLoading(true);
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}`
        );
        setUsers(res.data.items);
        setLoading(false);
    };
    const getUser = async username => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}`);
        //console.log(res);
        setUser(res.data);
        setLoading(false);
    };
    const getUserRepos = async username => {
        setLoading(true);
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
        );
        //console.log(res);
        setRepos(res.data);
        setLoading(false);
    };
    const clearUsers = () => {
        setLoading(false);
        setUsers([]);
    };
    const showAlert = (msg, type) => {
        setAlert({ msg, type });
        setTimeout(() => setAlert(null), 3000);
    };
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Alert alert={alert} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <Fragment>
                                <Search
                                    searchUsers={searchUsers}
                                    clearUsers={clearUsers}
                                    showClear={users.length > 0 ? true : false}
                                    setAlert={showAlert}
                                />
                                <div className="container">
                                    <Users users={users} loading={loading} />
                                </div>
                            </Fragment>
                        )}
                    />
                    <Route
                        exact
                        path="/user/:login"
                        render={props => (
                            <User
                                {...props}
                                getUser={getUser}
                                getUserRepos={getUserRepos}
                                repos={repos}
                                user={user}
                                loading={loading}
                            />
                        )}
                    ></Route>
                    <Route exact path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
