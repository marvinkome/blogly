import gql from 'graphql-tag';

export default gql`
    query PublicProfile($user_name: String, $first: Int, $after: String) {
        publicUser(name: $user_name) {
            id
            fullName
            description
            memberSince
            gravatarUrl
            posts(first: $first, after: $after) {
                edges {
                    node {
                        id
                        title
                        timestamp
                        body
                        postPicUrl
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;
