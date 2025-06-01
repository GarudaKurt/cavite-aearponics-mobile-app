const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Only add this if you're truly facing issues with ESM modules like @firebase/*
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('@firebase/')) {
    return context.resolveRequest(
      {
        ...context,
        isESMImport: true, // ensure ESM is resolved properly
      },
      moduleName,
      platform
    );
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
