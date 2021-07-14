'use strict';

// 3rd party resources
// const { SQS } = require('@aws-sdk/client-sqs');
const { SNS } = require('@aws-sdk/client-sns');
const uuid = require('uuid').v4;
const faker = require('faker');

const clientSNS = new SNS({region: 'us-west-2'});
// const clientSQS = new SQS({region: 'us-west-2'});

const PublishCommandInput = {
  Message: JSON.stringify({
    storeId: uuid(),
    orderId: uuid(),
    customer: faker.name.findName(),
    vendorName: "Alberta Drilling",
    address: faker.address.streetAddress
  }),
  MessageGroupId: uuid(),
  TopicArn: 'arn:aws:sns:us-west-2:609247114401:pickup.fifo'
}

setInterval(() => {
  clientSNS.publish(PublishCommandInput, function(err, data){
    if(err){ console.error(err); }
    else { console.log(data); }
  })
  }, 500
)


exports.handler = async function(event, context) {
  event.Records.forEach( record => {
    const { body } = record;
    console.log(body);
  })

  return {};
};
