'use strict';

// 3rd party resources
const { SQS } = require('@aws-sdk/client-sqs');

const client = new SQS({ region: 'us-west-2' });

exports.handler = async function(event, context) {
  const sendMessageCommandInput = {
    DelaySeconds: 3,
    QueueUrl: 'https://sqs.us-west-2.amazonaws.com/609247114401/vendor',
    MessageBody: '',
  };

  event.Records.forEach(record => {
    const { body } = record;
    console.log('body', body);

    sendMessageCommandInput.MessageBody = body;
    client.sendMessage(sendMessageCommandInput);
  });
  return {};
};
