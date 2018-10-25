import React from 'react';
import PropTypes from 'prop-types';


const License = ({name, checked=false, onChange=f=>f}) => {
    return (
        <div className="license-box">
        <label className="checkbox">
        <input type='checkbox' name={name} checked={checked} id={name} onChange={onChange} />
        {name}
      </label>
      </div>
    )
   }

   License.propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }
  
  export default License;