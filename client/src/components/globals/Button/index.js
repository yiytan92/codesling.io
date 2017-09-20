import React, { Component } from 'react';

import Loading from '../Loading';
import Icon from '../Icon';

import './Button.css';

const Button = ({
  loading,
  text,
  color,
  error,
  type,
  iconName,
  iconSize,
  className,
  onClick,
  id,
  backgroundColor
}) => {
  if (loading) {
    backgroundColor = 'gray';
  }
  if (error) {
    backgroundColor = 'red';
  }

  return (
    <div className={`button-container ${className ? className : ''}`}>
      <button 
        id={id}
        className={`${color}-text ${backgroundColor} ${!text ? 'no-text' : ''}`}
        onClick={onClick}
        type={type}
      >
        {loading ? (
          <Loading />
        ) : (
          error ? error : (
            <span>
              {iconName &&
                <Icon name={iconName} size={iconSize}/>
              }
              {text}
            </span>
          )
        )}
      </button>
    </div>
  );
};

export default Button;
