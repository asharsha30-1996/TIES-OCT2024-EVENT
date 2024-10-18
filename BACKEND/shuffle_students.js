// Import required modules
const mongodb = require('mongodb');

async function allocateStudentsToRooms() {
  try {
    // Establish connection to MongoDB
    const url = "mongodb+srv://rithvik:rithvik@event.eovstts.mongodb.net/?retryWrites=true&w=majority";
    const dbName = "test"; // Replace with your database name
    const client = await mongodb.MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);

    // Step 1: Query all students from the "participants" collection
    const students = await db.collection("participants").find({}).toArray();

    // Step 2: Create a mapping of room numbers to students
    const rooms = {};
    
    students.forEach(student => {
      const roomNumber = parseInt(student.Room, 10); // Convert Room to integer
      if (!rooms[roomNumber]) {
        rooms[roomNumber] = { roomNumber: roomNumber, students: [] }; // Initialize room object
      }
      rooms[roomNumber].students.push(student); // Add student to the respective room
    });

    // Step 3: Convert rooms object to an array for inserting into the database
    const allocationsArray = Object.values(rooms);
    const allocationsCollection = db.collection("allocations");

    // Optional: Clear existing allocations before inserting new ones
    await allocationsCollection.deleteMany({}); // Clear previous allocations if needed

    // Step 4: Store the room details in the "allocations" collection
    await allocationsCollection.insertMany(allocationsArray);

    console.log("Room details stored successfully.");

    // Close MongoDB connection
    client.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the function to allocate students to rooms
allocateStudentsToRooms();
