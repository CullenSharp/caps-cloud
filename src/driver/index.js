'use strict';

// 3rd party resources
const Consumer = require('sqs-consumer');
const uuid = require('uuid').v4;
const Producer = require('sqs-producer');

// reference to the vendor queue
const producer = Producer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/609247114401/vendor',
  region: 'us-west-2',
});

// ? why
const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/609247114401/packages.fifo',
  handleMessage: handleMessage,
});

function handleMessage(message) {
  console.log('body:', message.Body);
  let counter = 0;

  message = {
    id: uuid(),
    body: `this is message ${++counter}`,
  };

  producer.send(message, function(error, message) {
    if (error) { console.log(error); }
    else{
      console.log('sent', message);
    }
  });

  // setInterval( () => {
  //   // send message to the vendor queue
  //   const message = {
  //     id: uuid(),
  //     body: `this is message ${++counter}`,
  //   };

  //   producer.send(message, function(error, message) {
  //     if (error) { console.log(error); }
  //     else{
  //       console.log('sent', message);
  //     }
  //   });
  // }, 5000);
}

app.on('error', (error) => {
  console.error(error);
});

app.on('processing_error', (error) => {
  console.error(error);
});

app.start();
