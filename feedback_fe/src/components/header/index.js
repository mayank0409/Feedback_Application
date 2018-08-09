import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../src/xebiaLogo.svg';
import './header.css';

class Header extends Component {
    render() {
        return (<div className='header'>
                <div className='header img'>
            <Link to='/'>
                    <img src={logo} height={30} />
            </Link>
                </div>
            <div className='header title'>
                <h1>Feedback Quiz</h1>
            </div>
            <div className='header user'>
            {this.props.user && <h2>Hi, {this.props.user}</h2>}
            </div>
        </div>
        )
    }
}


export default Header;