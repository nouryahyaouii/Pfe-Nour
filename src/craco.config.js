// craco.config.js

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.scss$/,
        use: [
          "style-loader", // Adds CSS to the DOM by injecting a <style> tag
          "css-loader", // Translates CSS into CommonJS modules
          "sass-loader", // Compiles Sass to CSS
        ],
      });
      return webpackConfig;
    },
  },
};
