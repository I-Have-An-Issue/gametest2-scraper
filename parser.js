const fs = require("fs")
const VERSION_REGEX = /(RccService|WindowsPlayer|Studio|Studio64) version-[A-Za-z0-9]+/g

let DeployHistory = fs.readFileSync("DeployHistory.txt", { encoding: "utf-8" })
DeployHistory = DeployHistory.split("\r\n\r\n")
DeployHistory.shift()

let ParsedDeployHistory = {
	Studio: [],
	Studio64: [],
	RccService: [],
	WindowsPlayer: [],
}

DeployHistory.forEach((version) => {
	version = version.match(VERSION_REGEX)[0]
	version = version.split(" ")

	ParsedDeployHistory[version[0]].push(version[1])
})

fs.writeFileSync("DeployHistory.json", JSON.stringify(ParsedDeployHistory, null, 4))
