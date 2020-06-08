const path = require('path');

module.exports = {
  entry: {
		forecast: './scripts/forecast',
		clock: './scripts/clock.js',
		map: './scripts/map.js',
		main: './scripts/main.js',
		dashboard: './scripts/dashboard.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  }
};