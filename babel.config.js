module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Add the react-native-dotenv plugin here
      'module:react-native-dotenv',
    ],
  };
};
