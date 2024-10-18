const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

const url = "mongodb+srv://rithvik:rithvik@event.eovstts.mongodb.net/?retryWrites=true&w=majority";
let dbConn;

mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
    const fileName = "./records.csv";
    const arrayToInsert = [];

    csvtojson()
        .fromFile(fileName)
        .then((source) => {
            // Fetching all data from each row, merging FirstName + LastName, and renaming UIN to role
            for (let i = 0; i < source.length; i++) {
                const oneRow = {
                    id: source[i]["ID"], // Including ID
                    Name: `${source[i]["FirstName"]} ${source[i]["LastName"]}`, // Merge FirstName and LastName
                    role: source[i]["UIN"], // Rename UIN to role
                    Room: source[i]["Room"]
                };
                arrayToInsert.push(oneRow);
            }

            // Inserting into the collection “participants”
            const collectionName = "participants"; // Pass collection name as string
            const collection = dbConn.collection(collectionName);
            collection.insertMany(arrayToInsert, (err, result) => {
                if (err) console.log(err);
                if (result) {
                    console.log("Import CSV into database successfully.");
                }
            });
        })
        .catch((err) => {
            console.log("Error converting CSV to JSON:", err);
        });
})
.catch((err) => {
    console.log("DB Connection Error:", err.message);
});
