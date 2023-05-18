const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src'),
  entry: './src/app.ts',   // Entry point of your application (TypeScript file)
  output: {
    filename: 'bundle.js',   // Name of the output bundle file
    path: path.resolve(__dirname, 'dist'),   // Output directory
  },
  resolve: {
    extensions: ['.ts', '.js'],   // Resolve both TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        mode: "development",
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};


