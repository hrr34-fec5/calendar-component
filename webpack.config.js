const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/react', '@babel/env'],
        },
      },
      {
        test: [/\.wexbim$/, /\.docx$/, /\.csv$/, /\.mp4$/, /\.xlsx$/, /\.doc$/, /\.avi$/, /\.webm$/, /\.mov$/, /\.mp3$/, /\.pdf$/],
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          'url-loader?limit=200000',
        ],
      },
      {
        test: /\.(gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: 'assets/[name].[ext]',
              },
            },
          },
        ],
      },
      {
        test: /\.jsx\.html$/,
        exclude: ["/node_modules/", "/client/jestTests/"],
        use: [
          'babel!react-pure-html-component',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader',
        ],
      },
      {
        test: /\.sass$/,
        loader: ['sass-loader', 'css-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // mode: 'development',
  // devServer: {
  //   contentBase: path.join(__dirname, 'public/'),
  //   port: 3031,
  //   publicPath: 'http://localhost:3030/dist/',
  //   hotOnly: true,
  // },
};
