const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

// Create an Express application
const app = express();

// Use the 'body-parser' middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Set the AWS region
AWS.config.update({ region: 'us-east-2' });

// Set AWS credentials using environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create a DynamoDB client
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Define a route for the root URL ('/')(Handles the get request to the root url)
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

//This route handles POST requests to the '/submit' endpoint.
app.post('/submit', (req, res) => {
	const { 'nick-name': nickName, 'game-id': gameId } = req.body;

	// Define the parameters for the put operation
	const params = {
    	TableName: 'jump', // Use the table name 'jump'
    	Item: {
        	'nick-name': nickName, // Use 'nick-name' as the primary key
        	'game-id': gameId, // Use 'game-id' as the sort key
        	// You can add other attributes as needed
    	},
	};

	// Use the 'put' operation to create the new item
	dynamoDB.put(params, (err, data) => {
    	if (err) {
        	console.error('Error:', err);
        	res.status(500).send('Error occurred');
    	} else {
        	console.log('Item created successfully.');
        	res.send('Item created successfully');
    	}
	});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

