var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode:'development',
  externals: {
    jquery: 'jQuery'
  },
  entry: './src/index.js' , 
  devtool:'inline-source-map',
  devServer:{
    contentBase: './dist'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
  }),
],
  module:{
      rules:[
        {
            test: /\.scss$/,
         use: [
           'style-loader',
           'css-loader',
           'sass-loader',
         ]
        },
        {
                     test: /\.(png|svg|jpg|gif)$/,
                     use: [
                       'file-loader'
                     ]
                   },
                   {
                    test: /\.(html)$/,
                    use: {
                      loader: 'html-loader',
                      options: {
                        attrs: [':data-src']
                      }
                    }
                  }
      ]
  }
};