// sqsModule.js
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'}); // Specify your AWS region

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

function sendMessageToQueue(queueUrl, message, callback) {
  const params = {
    MessageBody: JSON.stringify(message),
    QueueUrl: queueUrl
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(err);
    } else {
      console.log("Successfully sent message to SQS", data.MessageId);
      callback(null, data);
    }
  });
}

module.exports = sendMessageToQueue;
