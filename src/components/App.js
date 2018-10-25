import React, { Component } from "react";
import "../styles/App.css";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost";
import Projects from "./Projects";

import {
  GET_NEXT_GITHUB_PROJECTS,
  GET_PREV_GITHUB_PROJECTS,
  GET_LICENSES
} from "../utils/gqls";
import { sortLicenses, prepareQuery, getFlatProject } from "../utils/helper";
import { Query } from "react-apollo";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      action: null,
      licenses: [],
      subname: ""
    };
    this.paginationInfo = {
      after: null,
      before: null
    };
    this.processGraphQlResult = this.processGraphQlResult.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.onLicenseChange = this.onLicenseChange.bind(this);
    this.onSubnameChange = this.onSubnameChange.bind(this);
  }

  componentDidMount() {
    let possibleLicenses = JSON.parse(localStorage.getItem("licenses"));
    if (possibleLicenses && possibleLicenses.length > 0) {
      this.setState({
        licenses: possibleLicenses
      });
    } else {
      client
        .query({ query: GET_LICENSES })
        .then(data => {
          const licenses = data.data.licenses
            .sort(sortLicenses)
            .map(license => {
              return { ...license, checked: true };
            });
          localStorage.setItem("licenses", JSON.stringify(licenses));
          this.setState({
            licenses
          });
        })
        .catch(error => console.error(error));
    }
  }

  processGraphQlResult(response) {
    const projects = response.edges.map(res => getFlatProject(res));
    this.paginationInfo = {
      after: response.pageInfo.endCursor,
      before: response.pageInfo.startCursor
    };

    return (
      <div>
        <Projects
          projects={projects}
          licenses={this.state.licenses}
          subname={this.state.subname}
          page={this.state.page}
          onLicenseChange={this.onLicenseChange}
          onSubnameChange={this.onSubnameChange}
        />
        <nav
          className="pagination is-rounded column is-three-fifths is-offset-one-fifth"
          role="navigation"
          aria-label="pagination"
        >
          {response.pageInfo.hasPreviousPage && (
            <button
              className="pagination-previous button is-info"
              onClick={this.goToPreviousPage}
            >
              Previous
            </button>
          )}
          {response.pageInfo.hasNextPage && (
            <button
              className="pagination-next button is-info"
              onClick={this.goToNextPage}
            >
              Next page
            </button>
          )}
        </nav>
      </div>
    );
  }

  goToNextPage() {
    this.setState({ page: this.state.page + 1, action: "NEXT" });
  }

  goToPreviousPage() {
    this.setState({ page: this.state.page - 1, action: "PREV" });
  }

  onLicenseChange(index) {
    const { licenses } = this.state;
    licenses[index].checked = !licenses[index].checked;
    //clear all cursors for Graph QL as  now the projects should be shown from the first page
    this.paginationInfo = { before: null, after: null };
    this.setState({ licenses, action: null, page: 1 });
  }
  onSubnameChange(value) {
    //clear all cursors for Graph QL as  now the projects should be shown from the first page
    this.paginationInfo = { before: null, after: null };
    this.setState({ subname: value, action: null, page: 1 });
  }

  render() {
    const { licenses, subname, action, page } = this.state;
    const query = prepareQuery(licenses, subname);
    let licensesCount = licenses.filter(license => license.checked).length;
    const gql =
      action === "NEXT" ? GET_NEXT_GITHUB_PROJECTS : GET_PREV_GITHUB_PROJECTS;
    const variables =
      action === "NEXT"
        ? { query, after: this.paginationInfo.after }
        : { query, before: this.paginationInfo.before };
    return (
      <div className="App container">
        {licensesCount === 0 && (
          <Projects
            projects={[]}
            licenses={licenses}
            subname={subname}
            page={page}
            onLicenseChange={this.onLicenseChange}
            onSubnameChange={this.onSubnameChange}
          />
        )}
        {licensesCount > 0 && (
          <ApolloProvider client={client}>
            <Query query={gql} variables={variables}>
              {({ data: { search }, loading }) => {
                if (loading || !search) {
                  return <div className="loading" />;
                }
                return this.processGraphQlResult(search);
              }}
            </Query>
          </ApolloProvider>
        )}
      </div>
    );
  }
}

export default App;
