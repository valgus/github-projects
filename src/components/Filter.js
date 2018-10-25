import React from "react";
import License from "./License";
import PropTypes from "prop-types";

const Filter = ({ licenses = [], onChange = f => f }) => {
  return licenses.map((license, i) => {
    return (
      <License
        key={i}
        name={license.key}
        checked={license.checked}
        onChange={() => onChange(i)}
      />
    );
  });
};

Filter.propTypes = {
  licenses: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Filter;
