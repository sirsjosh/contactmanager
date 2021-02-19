import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Header=(props)=>{
    const {branding}=props;
    return (
        <div className='navbar navbar-expand-sm navbar-dark bg-danger mb-3 PY-0'>
            <div className='container '>
                <a className='navbar-brand' href='/'>
                    {branding}
                </a>
                <div>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'><i className='fa fa-home'></i> Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/contact/add'><i className='fa fa-plus'></i> Add Contact</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/about'><i className='fa fa-question'></i> About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

Header.defaultProps={
    branding:"My App"
}

Header.propTypes={
    branding:PropTypes.string.isRequired
}

export default Header;
