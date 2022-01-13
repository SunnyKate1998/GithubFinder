import './App.css';
import Navbar from './components/layouts/Navbar';
import { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';

class App extends Component {
    state = {
        loading: false,
        user: {},
        users: [],
        repos: [],
        alert: null,
    };
    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     const res = await axios.get('https://api.github.com/users');
    //     console.log(res.data);
    //     this.setState({ users: res.data, loading: false });
    // }
    searchUsers = async text => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}`
        );

        this.setState({
            users: res.data.items,
            loading: false,
        });
    };
    getUser = async username => {
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/users/${username}`);
        //console.log(res);

        this.setState({
            user: res.data,
            loading: false,
        });
    };
    getUserRepos = async username => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
        );
        //console.log(res);

        this.setState({
            repos: res.data,
            loading: false,
        });
    };
    clearUsers = () => {
        this.setState({ loading: false, users: [] });
    };
    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type } });
        setTimeout(() => this.setState({ alert: null }), 3000);
    };
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <Alert alert={this.state.alert} />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Fragment>
                                    <Search
                                        searchUsers={this.searchUsers}
                                        clearUsers={this.clearUsers}
                                        showClear={
                                            this.state.users.length > 0
                                                ? true
                                                : false
                                        }
                                        setAlert={this.setAlert}
                                    />
                                    <div className="container">
                                        <Users
                                            users={this.state.users}
                                            loading={this.state.loading}
                                        />
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
                                    getUser={this.getUser}
                                    getUserRepos={this.getUserRepos}
                                    repos={this.state.repos}
                                    user={this.state.user}
                                    loading={this.state.loading}
                                />
                            )}
                        ></Route>
                        <Route exact path="/about" component={About} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
