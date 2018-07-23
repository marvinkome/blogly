import React from 'react';
import types from 'prop-types';
import { Query } from 'react-apollo';

import { decodeUri } from '../../lib/helpers';
import Error from '../../components/error';
import MainPage from '../../components/app';
import PageView from './view';
import query from './query';

import './style.less';

class Profile extends React.Component {
    static async getInitialProps({ query }) {
        return {
            user_name: decodeUri(query.user)
        };
    }

    renderServerError = () => {
        return (
            <Error
                render={
                    <div className="valign-wrapper center">
                        <h5>
                            It{'\''}s not you it{'\''}s us. Please reload this page. If it persists
                            try again later. We{'\''}re really sorry.
                        </h5>
                    </div>
                }
                fullScreen
            />
        );
    };

    handleMore = (fetchMore, cursor) => {
        return fetchMore({
            variables: {
                after: cursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.publicUser.posts.edges;
                const pageInfo = fetchMoreResult.publicUser.posts.pageInfo;

                return newEdges.length
                    ? {
                        publicUser: {
                            id: fetchMoreResult.publicUser.id,
                            posts: {
                                __typename: previousResult.publicUser.posts.__typename,
                                edges: [...previousResult.publicUser.posts.edges, ...newEdges],
                                pageInfo
                            },
                            __typename: previousResult.publicUser.__typename
                        }
                    }
                    : previousResult;
            }
        });
    };

    render() {
        const { loggedIn, user_name } = this.props;
        return (
            <Query query={query} variables={{ user_name, first: 5 }}>
                {({ error, data, fetchMore }) => {
                    if (error) return this.renderServerError();

                    const pageTitle = data.publicUser ? data.publicUser.fullName : 'User not found';
                    const hasMore = data.publicUser
                        ? data.publicUser.posts.pageInfo.hasNextPage
                        : false;
                    const cursor = data.publicUser
                        ? data.publicUser.posts.pageInfo.endCursor : '';

                    return (
                        <MainPage
                            loggedIn={loggedIn}
                            pageTitle={pageTitle}
                            render={() => (
                                <PageView
                                    user={data.publicUser}
                                    hasMore={hasMore}
                                    fetchMore={() => this.handleMore(fetchMore, cursor)}
                                />
                            )}
                        />
                    );
                }}
            </Query>
        );
    }
}

Profile.propTypes = {
    loggedIn: types.bool.isRequired,
    user_name: types.string.isRequired
};

export default Profile;
