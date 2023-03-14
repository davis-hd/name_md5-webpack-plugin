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
      openUrl: 'https://baidu.com'
    }),
  ],
}

# or

// vue.config.js:
module.exports = {
  configureWebpack: {
    plugins: [
      new Name_md5Plugin({
        source: "dist",
        destination: "dist/tofile.zip",
        openUrl: 'https://baidu.com'
      }),
    ],
  },
}
```

**Options**

- source[`string`] - 需要压缩的文件夹
- destination[`string`] - 输出在该目录下的压缩文件
- openUrl[`string`] - 打包完成后默认浏览器打开地址
