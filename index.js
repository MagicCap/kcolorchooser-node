const { spawn } = require("child_process")

module.exports = () => {
    const spawnedProcess = spawn("kcolorchooser", ["--print"])
    return new Promise((res, rej) => {
        spawnedProcess.on("error", err => {
            if (err.code === "ENOENT") {
                rej("KColorChooser is not installed.")
                return
            }
            rej(err)
        })
        spawnedProcess.stdout.on("data", part => {
            const chunk = part.toString().substr(1)
            const edgeCaseFix = x => x > 255 ? Math.floor((x / 65535) * 255) : x
            res([edgeCaseFix(parseInt(chunk.substr(0, 2), 16)), edgeCaseFix(parseInt(chunk.substr(2, 4), 16)), edgeCaseFix(parseInt(chunk.substr(4, 6), 16))])
        })
     })
}
