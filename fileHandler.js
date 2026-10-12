const fs = require("fs");

function handleComplaintFiles(complaints) {
    console.log("\n===== FILE STREAM OPERATIONS =====");

    // Write complaints to a file
    const writeStream = fs.createWriteStream("complaints.txt");

    writeStream.on("finish", () => {
        console.log("Complaint records written successfully.");

        // Read complaints using a readable stream
        const readStream = fs.createReadStream("complaints.txt");

        readStream.on("data", (chunk) => {
            console.log("Received chunk:");
            console.log(chunk.toString());
        });

        readStream.on("end", () => {
            console.log("Finished reading complaint records.");
        });

        readStream.on("error", (error) => {
            console.error("Read error:", error.message);
        });

        // Create the backup using pipe()
        const backupReadStream = fs.createReadStream("complaints.txt");

        const backupWriteStream = fs.createWriteStream(
            "complaints backup.txt"
        );

        backupWriteStream.on("finish", () => {
            console.log("Complaint backup created successfully.");
            console.log("===================================\n");
        });

        backupReadStream.on("error", (error) => {
            console.error("Backup read error:", error.message);
        });

        backupWriteStream.on("error", (error) => {
            console.error("Backup write error:", error.message);
        });

        backupReadStream.pipe(backupWriteStream);
    });

    writeStream.on("error", (error) => {
        console.error("Write error:", error.message);
    });

    // Write each complaint as one JSON record per line
    complaints.forEach((complaint) => {
        writeStream.write(JSON.stringify(complaint) + "\n");
    });

    writeStream.end();
}

module.exports = handleComplaintFiles;