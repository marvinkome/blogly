import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';

export class SideNav extends React.Component {
    constructor(props){
        super(props);

        this.sidenav = React.createRef();
        this.sidenavIns;
    }
    componentDidMount(){
        const sidenav = this.sidenav.current;
        if (window.M) {
            this.sidenavIns = window.M.Sidenav.init(sidenav);
        }
    }
    componentWillUnmount() {
        if (this.sidenavIns !== undefined && this.sidenavIns !== null) {
            this.sidenavIns.close();
            this.sidenavIns.destroy();
        }
    }
    render(){
        return (
            <ul ref={this.sidenav} className="sidenav hide-on-med-and-up" id="mobile-topbar">
                <li>
                    <div className="user-view">
                        <a>
                            <img 
                                className={'circle' + this.props.data.imageClass} 
                                src={this.props.data.image} 
                            />
                        </a>
                        <span className="email">
                            Hello, {this.props.data.isLoggedIn ? this.props.data.username : 'Guest'}
                        </span>
                    </div>
                </li>
        
                {this.props.data.isLoggedIn ? (
                    <React.Fragment>
                        <li>
                            <Link to="/admin/new-post">
                                <span>New Post</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/posts">
                                <span>All Posts</span>
                            </Link>
                        </li>
                        <div className="divider" />
                        <li>
                            <Link to="/admin/posts">
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <a title="Logout" onClick={this.props.logout}>
                                <span>Logout</span>
                            </a>
                        </li>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <li>
                            <Link className="hide-on-med-and-up" to="/auth/login">
                                Sign In
                            </Link>
                        </li>
                        <div className="divider" />
                        <li>
                            <Link className="hide-on-med-and-up" to="/auth/signup">
                                Get Started
                            </Link>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        );
    }
}

SideNav.propTypes = {
    data: types.object.isRequired,
    logout: types.func.isRequired
};