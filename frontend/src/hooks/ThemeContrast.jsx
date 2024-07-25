import { useTheme } from "../components/Theme/ThemeContext";

export const useThemedStyles = () => {
  const { theme, contrast } = useTheme();

  const getBackgroundColor = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gradient-to-b from-gray-800 via-gray-900 to-gray-700';
      case 'light':
        return 'bg-gradient-to-b from-blue-50 via-white to-blue-50';
      default:
        return 'bg-gradient-to-b from-blue-100 via-white to-blue-100';
    }
  };

  const getTextColor = () => {
    if (contrast === 'high') {
      return theme === 'dark' ? 'text-yellow-300' : 'text-blue-900';
    }
    return theme === 'dark' ? 'text-white' : 'text-gray-900';
  };

  const getCardBackground = () => {
    return theme === 'dark' 
      ? 'bg-gradient-to-br from-gray-800 to-gray-700' 
      : 'bg-gradient-to-br from-white to-gray-50';
  };
  const getButtonStyles = (type) => {
    const baseStyles = 'px-4 py-2 rounded-md font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50';
    
    switch (type) {
      case 'delete':
        return theme === 'dark'
          ? `${baseStyles} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500`
          : `${baseStyles} bg-red-500 hover:bg-red-600 text-white focus:ring-red-400`;
      case 'edit':
        return theme === 'dark'
          ? `${baseStyles} bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500`
          : `${baseStyles} bg-yellow-500 hover:bg-yellow-600 text-black focus:ring-yellow-400`;
      case 'store':
        return theme === 'dark'
          ? `${baseStyles} bg-green-600 hover:bg-green-700 text-white focus:ring-green-500`
          : `${baseStyles} bg-green-500 hover:bg-green-600 text-white focus:ring-green-400`;
      default:
        return theme === 'dark'
          ? `${baseStyles} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500`
          : `${baseStyles} bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400`;
    }
  };

  return {
    backgroundColor: getBackgroundColor(),
    textColor: getTextColor(),
    cardBackground: getCardBackground(),
    deleteButtonStyle: getButtonStyles('delete'),
    editButtonStyle: getButtonStyles('edit'),
    storeButtonStyle: getButtonStyles('store'),
    defaultButtonStyle: getButtonStyles('default'),
  };
};