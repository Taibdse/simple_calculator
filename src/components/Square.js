import React from 'react';
import PropTypes from 'prop-types';

const Square = (props) => {
    const { text, handleClick } = props;
    return (
        <div className="square" onClick={() => handleClick(text)}>{ text }</div>
    );
};

Square.propTypes = {};

export default Square;
