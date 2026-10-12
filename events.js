const EventEmitter = require("events");

const complaintEmitter = new EventEmitter();

// Event triggered when a complaint is registered
complaintEmitter.on("complaintRegistered", (complaint) => {
    console.log(`New complaint registered: ${complaint.id}`);
});

// Event triggered when a complaint is resolved
complaintEmitter.on("complaintResolved", (complaint) => {
    console.log(`Complaint ${complaint.id} has been resolved.`);
});

module.exports = complaintEmitter;