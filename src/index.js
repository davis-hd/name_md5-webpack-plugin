const FileManagerPlugin = require("filemanager-webpack-plugin")
const fs = require("fs")
const crypto = require("crypto")
const { exec } = require("child_process")

class Name_md5WebpackPlugin {
  constructor({ source, destination, openUrl }) {
    this.openUrl = openUrl
    this.source = source
    this.destination = destination.endsWith(".zip")
      ? destination
      : `${destination}.zip`
  }

  apply(compiler) {
    if (compiler.options.mode !== 'production') return
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
      if (this.openUrl) {
        switch (process.platform) {
          case "darwin":
            exec(`open ${this.openUrl}`)
            break
          case "win32":
            exec(`start ${this.openUrl}`)
            break
          default:
            exec(`xdg-open ${this.openUrl}`)
        }
      }
    })
  }
}

module.exports = Name_md5WebpackPlugin
