import React from "react";
import PropTypes from "prop-types";
import PRow from "./PRow";

const PTable = ({ projects = [], page }) => {
  return (
    <table className="table is-fullwidth is-narrow">
      <thead>
        <tr>
          <th>#</th>
          <th>stars</th>
          <th className="is-hidden-touch">owner</th>
          <th>name</th>
          <th className="is-hidden-touch">description</th>
          <th className="is-hidden-mobile">license</th>
          <th className="is-hidden-touch">created at</th>
          <th>link</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, i) => {
          return (
            <PRow
              key={i}
              project={project}
              index={10 * (page - 1) + i + 1}
            />
          );
        })}
      </tbody>
    </table>
  );
};

PTable.propTypes = {
  projects: PropTypes.array.isRequired
};

export default PTable;
