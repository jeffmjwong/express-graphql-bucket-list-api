import path from 'path';
import terserWebpackPlugin from 'terser-webpack-plugin';

export default {
  mode: 'production',
  target: 'node',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  optimization: {
    minimizer: [
      new terserWebpackPlugin({
        cache: true,
        parallel: true
      })
    ]
  }
};
