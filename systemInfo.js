const os = require("os");

function displaySystemInfo() {
    console.log("\n===== SYSTEM INFORMATION =====");

    console.log("Platform:", os.platform());
    console.log("Operating System:", os.type());
    console.log("CPU Architecture:", os.arch());
    console.log("Hostname:", os.hostname());

    console.log(
        "Total Memory:",
        (os.totalmem() / (1024 ** 3)).toFixed(2),
        "GB"
    );

    console.log(
        "Free Memory:",
        (os.freemem() / (1024 ** 3)).toFixed(2),
        "GB"
    );

    console.log("Username:", os.userInfo().username);
    console.log("Home Directory:", os.homedir());

    console.log("==============================\n");
}

module.exports = displaySystemInfo;