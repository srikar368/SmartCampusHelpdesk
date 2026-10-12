const http = require("http");
const displaySystemInfo = require("./systemInfo");
const complaintEmitter = require("./events");
const demonstrateBuffer = require("./buffer");
const complaints = require("./complaints");
const handleComplaintFiles = require("./fileHandler");

// Display system information when the application starts
displaySystemInfo();

// Demonstrate Buffer operations
demonstrateBuffer();

// Register a sample complaint event
complaintEmitter.emit("complaintRegistered", complaints[0]);

// Demonstrate complaint resolution
complaintEmitter.emit("complaintResolved", complaints[1]);

// Write, read, and back up complaint records
handleComplaintFiles(complaints);

// Create the HTTP server
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // Set the response content type to JSON
    res.setHeader("Content-Type", "application/json");

    // GET /api/complaints
    if (method === "GET" && url === "/api/complaints") {
        res.writeHead(200);
        res.end(JSON.stringify(complaints, null, 2));
    }

    // GET /api/status
    else if (method === "GET" && url === "/api/status") {
        res.writeHead(200);
        res.end(
            JSON.stringify({
                message: "Smart Campus Helpdesk server is running."
            })
        );
    }

    // GET /api/complaints/C101, C102, C103, etc.
    else if (
        method === "GET" &&
        url.startsWith("/api/complaints/")
    ) {
        const id = decodeURIComponent(
            url.slice("/api/complaints/".length)
        );

        const complaint = complaints.find(
            (item) => item.id === id
        );

        if (complaint) {
            res.writeHead(200);
            res.end(JSON.stringify(complaint, null, 2));
        } else {
            res.writeHead(404);
            res.end(
                JSON.stringify({
                    error: "Complaint not found",
                    id: id
                })
            );
        }
    }

    // Any other endpoint
    else {
        res.writeHead(404);
        res.end(
            JSON.stringify({
                error: "Endpoint not found"
            })
        );
    }
});

// Start the server
const PORT = 3000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`\nHelpdesk server running on port ${PORT}`);
    console.log("Ready to accept requests.");
});