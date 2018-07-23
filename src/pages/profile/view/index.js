import React from 'react';
import types from 'prop-types';
import Router from 'next/router';
import Error from '../../../components/error';

import AuthorInfo from './author-info';
import UserPosts from './user-posts';

export default class PageView extends React.Component {
    render() {
        if (this.props.user === null) {
            return (
                <Error
                    render={
                        <div className="center">
                            <h5>This user doesn{'\''}t currently exist</h5>
                            <a onClick={() => Router.back()}>Go back to the previous page</a>
                        </div>
                    }
                />
            );
        } else {
            return (
                <div className="profile-body section container">
                    <div className="row">
                        <div className="col s12">
                            <div>
                                <AuthorInfo data={this.props.user} />
                                <UserPosts
                                    data={this.props.user}
                                    hasMore={this.props.hasMore}
                                    fetchMore={this.props.fetchMore}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

PageView.propTypes = {
    user: types.object,
    hasMore: types.bool,
    fetchMore: types.func
};
