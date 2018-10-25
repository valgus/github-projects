import React from 'react';
import PropTypes from 'prop-types';

const PRow = ({project, index}) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{project.stars}</td>
            <td className="is-hidden-touch">{project.owner}</td>
            <td className="project-name">{project.name}</td>
            <td className="is-hidden-touch">{project.description}</td>
            <td className="is-hidden-mobile">{project.license}</td>
            <td className="is-hidden-touch">{project.createdAt}</td>
            <td><a href={project.url} className="button is-info">Link</a></td>
      </tr>
    )
   }

   PRow.propTypes = {
    index: PropTypes.number.isRequired,
    project: PropTypes.object.isRequired
  }
   
  export default PRow;