import React from 'react';
import { useState, useContext } from 'react';
import GithubContext from '../context/github/githubContext';
import AlertContext from '../context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const { clearUsers, users } = githubContext;
    const { setAlert } = alertContext;

    const [text, setText] = useState('');
    const onChange = e => {
        setText(e.target.value);
    };
    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please enter something!', 'light');
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
    };
    const onClick = () => {
        clearUsers();
    };

    return (
        <>
            <form onSubmit={onSubmit} className="form">
                <input
                    type="text"
                    name="text"
                    placeholder="Search..."
                    value={text}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"
                />
            </form>
            {users.length > 0 && (
                <button className="btn btn-light btn-block" onClick={onClick}>
                    Clear
                </button>
            )}
        </>
    );
};

export default Search;
