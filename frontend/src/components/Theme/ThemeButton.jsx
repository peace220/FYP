import React from 'react';
import { useThemedStyles } from '../../hooks/ThemeContrast';


const ThemedButton = ({ 
  type = 'default', 
  onClick, 
  children, 
  gradient = true, 
  className = '' 
}) => {
  const {
    deleteButtonStyle,
    editButtonStyle,
    storeButtonStyle,
    defaultButtonStyle
  } = useThemedStyles();

  const getButtonStyle = () => {
    let style = '';
    switch (type) {
      case 'delete': style = deleteButtonStyle; break;
      case 'edit': style = editButtonStyle; break;
      case 'store': style = storeButtonStyle; break;
      default: style = defaultButtonStyle;
    }
    
    if (!gradient) {
      style = style.replace(/bg-gradient-to-r from-\S+ to-\S+/, '');
      style += ` bg-${type === 'default' ? 'blue' : type}-500`;
    }

    return `${style} ${className}`.trim();
  };

  return (
    <button className={getButtonStyle()} onClick={onClick}>
      {children}
    </button>
  );
};

export default ThemedButton;