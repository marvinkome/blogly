/**
 * ./src/components/post/view/topbar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TopBar extends Component {
    render() {
        return (
            <nav className="topbar nav-extended">
                <div className="nav-wrapper">
                    <div className="blog-info">
                        <Link to="/" className="brand-logo">
                            <span className="blog-title">ReactPress</span>
                        </Link>
                        <div className="social">
                            <a title="Twitter">
                                <i className="fa fa-twitter" />
                            </a>
                            <a title="Facebook">
                                <i className="fa fa-facebook" />
                            </a>
                        </div>
                    </div>
                    {this.props.user_data != undefined ? (
                        <ul className="right hide-on-small-only">
                            <li>
                                <Link
                                    to="/admin/dashboard"
                                    title="Go to dashboard"
                                >
                                    <span>
                                        Logged in as:{' '}
                                        {this.props.user_data.user.fullName}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard"
                                    title="Go to dashboard"
                                    className="user-profile"
                                >
                                    <img
                                        className="user-image responsive-img circle"
                                        src={
                                            this.props.user_data.user
                                                .gravatarUrl
                                        }
                                    />
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="right hide-on-small-only">
                            <li>
                                <Link to="/auth/login" className="sign-in">
                                    Sign in
                                </Link>
                            </li>
                            <li>
                                <Link to="/auth/signup" className="sign-up btn">
                                    Get started
                                </Link>
                            </li>
                        </ul>
                    )}
                    {this.props.user_data != undefined ? (
                        <ul className="right hide-on-med-and-up">
                            <li>
                                <a className="user-profile">
                                    <img
                                        className="user-image responsive-img circle"
                                        src={
                                            this.props.user_data.user
                                                .gravatarUrl
                                        }
                                    />
                                </a>
                            </li>
                        </ul>
                    ) : (
                        <ul className="right hide-on-med-and-up">
                            <li>
                                <Link
                                    className="hide-on-med-and-up"
                                    to="/auth/login"
                                >
                                    <i className="fa fa-sign-in" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hide-on-med-and-up"
                                    to="/auth/login"
                                >
                                    <i className="fa fa-user-plus" />
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        );
    }
}

TopBar.propTypes = {
    user_data: PropTypes.object
};

export default TopBar;
