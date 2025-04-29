const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.alias = {
  '@': __dirname,
};

module.exports = defaultConfig;
