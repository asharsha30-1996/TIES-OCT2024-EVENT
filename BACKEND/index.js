// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const path=require('path');
const dotenv=require('dotenv')

// Create an instance of Express
const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Establish connection to MongoDB
const url = "mongodb+srv://asharsha30:$SaiMurugan1996@cluster0.hv9ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "test"; // Replace with your database name
mongodb.MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('MongoDB connected successfully');
    const db = client.db(dbName);
    
    // Pass the database connection to routes
    app.use('/api', require('./routes/roomRoutes')(db)); // Pass db connection to roomRoutes
    app.use('/api', require('./routes/studentRoutes')(db)); // Pass db connection to studentRoutes
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

  //deployment

  //__dirname=path.resolve();
  if (process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname, '..', 'FRONTEND', 'build')));

    app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname, '..', 'FRONTEND', 'build', 'index.html'))
    });
  }

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
