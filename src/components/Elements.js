import React from 'react';
// import PropTypes from 'prop-types';

// const propTypes = {
//   elements: PropTypes.arrayOf(PropTypes.shape()).isRequired,
// };

const Elements = ({ elements }) => {
  console.log(elements)
  return (
    <ul>
      {elements.map(element => (
        <li key={element.id} className="element">
          {element.first_name}
        </li>
      ))}
    </ul>
  )
}

// Elements.propTypes = propTypes;
export default Elements;
