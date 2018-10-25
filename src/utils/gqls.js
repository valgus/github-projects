import gql from "graphql-tag";

/*
 * GQL used to retrieve next 10 projects after the cursor specified in the request
  */
export const GET_NEXT_GITHUB_PROJECTS = gql`
    query Search($query: String!, $after: String!) {
        search(type: REPOSITORY, query: $query, first: 10 after: $after) {
            edges {
                node {
                    ... on Repository {
                        
                        name
                        licenseInfo {
                            name 
                        }
                        createdAt
                        description 
                        owner {
                            login
                        }
                        stargazers {
                            totalCount
                        }
                        url
                    }
                }
            }
            pageInfo {
                endCursor
                hasNextPage
                startCursor
                hasPreviousPage
              }
        }
    }
`;

/*
 * GQL used to retrieve previous 10 projects before the cursor specified in the request
 */
export const GET_PREV_GITHUB_PROJECTS = gql`
    query Search($query: String!, $before: String) {
        search(type: REPOSITORY, query: $query, last: 10 before: $before) {
            edges {
                node {
                    ... on Repository {
                        
                        name
                        licenseInfo {
                            name 
                        }
                        createdAt
                        description 
                        owner {
                            login
                        }
                        stargazers {
                            totalCount
                        }
                        url
                    }
                }
            }
            pageInfo {
                endCursor
                hasNextPage
                startCursor
                hasPreviousPage
              }
        }
    }
`;

/*
 * GQL used to retrieve all the licenses
 */
export const GET_LICENSES = gql`
query { 
    licenses {
      name
      key
    }
  }
`;