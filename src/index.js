const FileManagerPlugin = require("filemanager-webpack-plugin")
const fs = require("fs")
const crypto = require("crypto")

class Name_md5WebpackPlugin {
  constructor({ source, destination }) {
    this.source = source
    this.destination = destination.endsWith(".zip")
      ? destination
      : `${destination}.zip`
  }

  apply(compiler) {
    new FileManagerPlugin({
      events: {
        onEnd: {
          delete: [this.destination],
          archive: [{ source: this.source, destination: this.destination }],
        },
      },
    }).apply(compiler)

    compiler.plugin("done", () => {
      const fileStream = fs.createReadStream(this.destination)
      const hash = crypto.createHash("md5")
      fileStream.on("data", (chunk) => {
        hash.update(chunk, "utf-8")
      })
      fileStream.on("end", () => {
        const md5 = hash.digest("hex")
        console.log(md5)
        const outputDir = this.destination.replace(".zip", `_${md5}.zip`)
        fs.renameSync(this.destination, outputDir)
      })
    })
  }
}

module.exports = Name_md5WebpackPlugin
