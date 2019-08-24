import path from 'path';

export default {
  mode: 'production',
  target: 'node',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
};
