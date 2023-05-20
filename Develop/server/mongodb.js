const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://daviske13:Murphy13@cluster0.j6ccqkz.mongodb.net/<database-name>?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    });

    async function startServer() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Set up server routes and middleware
        app.use(express.static('../client/dist'));
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        require('./routes/htmlRoutes')(app);

        // Start the server
        app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
    } catch (error) {
        console.error("Failed to establish MongoDB connection:", error);
    }
}

startServer();
