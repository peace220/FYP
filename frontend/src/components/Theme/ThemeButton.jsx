import React from 'react';
import { useThemedStyles } from '../../hooks/ThemeContrast';

const ThemedButton = ({ type = 'default', onClick, children }) => {
  const {
    deleteButtonStyle,
    editButtonStyle,
    storeButtonStyle,
    defaultButtonStyle
  } = useThemedStyles();

  const getButtonStyle = () => {
    switch (type) {
      case 'delete': return deleteButtonStyle;
      case 'edit': return editButtonStyle;
      case 'store': return storeButtonStyle;
      default: return defaultButtonStyle;
    }
  };

  return (
    <button className={getButtonStyle()} onClick={onClick}>
      {children}
    </button>
  );
};

export default ThemedButton;