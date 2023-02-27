<div align="center">
  <h1>Name_MD5 Webpack Plugin</h1>
</div>

## Install

```bash
npm install name_md5-webpack-plugin --save-dev
# or
yarn add name_md5-webpack-plugin --dev
```

## Usage

```js
// webpack.config.js:

const Name_md5Plugin = require('name_md5-webpack-plugin');

export default {
  plugins: [
    new Name_md5Plugin({
      source: 'dist',
      destination: 'dist/tofile.zip',
    }),
  ],
}

# or
// vue.config.js:
module.exports = {
  configureWebpack: {
    plugins: [
      new Name_md5WebpackPlugin({
        source: "dist",
        destination: "dist/tofile.zip",
      }),
    ],
  },
}
```

**Options**

- source[`string`] - 需要压缩的文件夹
- destination[`string`] - 输出在该目录下的压缩文件
