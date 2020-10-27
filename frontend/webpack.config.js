const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' }, // pegar o css interpretado pelo css-loader e injetar dentro do nosso html
          { loader: 'css-loader' }, // ler os arquivos css e as importações
        ],
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: [
          { loader: 'file-loader' }, 
        ],
      }
    ]
  },
};