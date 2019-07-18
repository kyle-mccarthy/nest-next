const path = require('path');

module.exports = {
  useFileSystemPublicRoutes: false,
  webpack: function(config, { buildId, dev }) {
    const originalEntry = config.entry;

    config.resolve = {
      ...config.resolve,
      ...{
        alias: {
          ...config.resolve.alias,
          '@src': path.resolve(__dirname, 'client'),
        }
      },
    };

    return config
  }
};
