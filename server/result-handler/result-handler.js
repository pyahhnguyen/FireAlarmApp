const AWS = require('aws-sdk');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

// Define the SQS queue URL
const receivedSqsQueueUrl = process.env.SQS_QUEUE_REQUESTED_URL;

function pollSQS() {
    const params = {
        QueueUrl: receivedSqsQueueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10
    };
 
    sqs.receiveMessage(params, (err, data) => {
        if (err) {
            console.error('Error receiving message from SQS:', err);
        } else if (data.Messages && data.Messages.length > 0) {
            const message = data.Messages[0];
            handleMessage(message);
            deleteMessageFromQueue(message.ReceiptHandle);
        } else {
            console.log('No messages received from SQS');
        }
        pollSQS();
    });
}

function handleMessage(message) {
    const body = JSON.parse(message.Body);
    let apartmentId = body.apartmentId;
    let roomName = Object.keys(body)[1];
    let roomData = { [roomName]: body[roomName] };
    console.log(roomData)
    //console.log('Received message:', body);
    updateApartmentData(apartmentId,roomData);
}
async function updateAlertData(apartmentId,sensorName) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db(process.env.DB_NAME).collection(process.env.COLLECTION_ALERT);
        console.log(`${sensorName}.triggerAt`);
        const updateResult = await collection.updateOne(
            { apartment: new ObjectId(apartmentId) },
            { $set: { [`${sensorName}.triggerAt`]: new Date() } }
        );
        console.log(`Successfully updated the AlertData: ${updateResult}`);
    } catch (err) {
        console.error(`Error: ${err}`);
    } finally {
        await client.close();
    }
}
async function updateApartmentData(apartmentId, roomData) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const collection = client.db(process.env.DB_NAME).collection(process.env.COLLECTION_APARTMENT);
        const roomName = Object.keys(roomData)[0]; 
        const sensorName = Object.keys(roomData[roomName])[0];
        const sensorStatus = roomData[roomName][sensorName];
        console.log(sensorStatus)
        console.log(`room.${roomName}.sensors.${sensorName}.status`);
        if (sensorStatus.status) {
        const updateResult = await collection.updateOne(
                { _id: new ObjectId(apartmentId) },
                { $set: { [`room.${roomName}.sensors.${sensorName}.status`]: 1 } }
            );
        console.log(`Successfully updated the ApartmentData to 1: ${updateResult}`);
        updateAlertData(apartmentId, sensorName);
        }
        else{
            const updateResult = await collection.updateOne(
                { _id: new ObjectId(apartmentId) },
                { $set: { [`room.${roomName}.sensors.${sensorName}.status`]: 0 } }
            );
        console.log(`Successfully updated the ApartmentData to 0: ${updateResult}`);
        }
    } catch (err) {
        console.error(`Error: ${err}`);
    } finally {
        await client.close();
    }
}


function deleteMessageFromQueue(receiptHandle) {
    const params = {
        QueueUrl: receivedSqsQueueUrl,
        ReceiptHandle: receiptHandle
    };
 
    sqs.deleteMessage(params, (err, data) => {
        if (err) {
            console.error('Error deleting message from SQS:', err);
        } else {
            console.log('Message deleted from SQS');
        }
    });
}
pollSQS();

