import React, { Component } from "react";
import PropTypes from "prop-types";

import Filter from "./Filter";
import Search from "./Search";
import PTable from "./PTable";

class Projects extends Component {
  constructor(props) {
    super(props);
    const { projects, licenses } = this.props;
    //set all projects to be shown
    const shownProjects = [...projects];
    this.state = {
      licenses,
      shownProjects
    };
    this.onSetSubName = this.onSetSubName.bind(this);
    this.onCheckLicense = this.onCheckLicense.bind(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const shownProjects = [...nextProps.projects];
    this.setState({ shownProjects });
  }

  onSetSubName(subname) {
    this.props.onSubnameChange(subname);
  }

  onCheckLicense(i) {
    this.props.onLicenseChange(i);
  }

  render() {
    const { licenses, shownProjects } = this.state;
    const {page, subname} = this.props;
    return (
      <div className="section">
        <div className="columns">
          <div className="column is-four-fifths">
            <Search onChange={this.onSetSubName} value={subname} />
            <div className="is-hidden-tablet is-flex-touch licenses-group">
              <Filter licenses={licenses} onChange={this.onCheckLicense} />
            </div>
            {shownProjects.length === 0 && <p>No projects were found...</p>}
            {shownProjects.length > 0 && <PTable projects={shownProjects} page={page} />}
          </div>
          <div className="column is-one-fifth is-hidden-mobile">
            <Filter licenses={licenses} onChange={this.onCheckLicense} />
          </div>
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  licenses: PropTypes.array.isRequired,
  subname: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onLicenseChange: PropTypes.func.isRequired,
  onSubnameChange: PropTypes.func.isRequired
};

export default Projects;
