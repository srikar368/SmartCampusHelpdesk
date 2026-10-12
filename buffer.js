function demonstrateBuffer() {
    const complaint = "Projector not working";

    console.log("\n===== BUFFER OPERATIONS =====");

    // Convert complaint string into a Buffer
    const complaintBuffer = Buffer.from(complaint);

    console.log("Complaint:", complaint);
    console.log("Buffer:", complaintBuffer);
    console.log("Length:", complaintBuffer.length, "bytes");

    // Convert Buffer back into a readable string
    const decodedComplaint = complaintBuffer.toString();

    console.log("Decoded complaint:", decodedComplaint);

    console.log("=============================\n");
}

module.exports = demonstrateBuffer;