var awsIot = require('aws-iot-device-sdk');
const readline = require('readline');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourAWSRegion>'
// with a unique client identifier and the AWS region you created your
// certificate in (e.g. 'us-east-1').  NOTE: client identifiers must be
// unique within your AWS account; if a client attempts to connect with a
// client identifier which is already in use, the existing connection will
// be terminated.
//
var device = awsIot.device({
   keyPath: 'credentials/RB_ECG.private.key',
  certPath: 'credentials/RB_ECG.cert.pem',
    caPath: 'credentials/root-CA.crt',
  clientId: 'credentials/a3muphd3v4g69d',
    region: 'eu-west-1'
});


//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', function() {
    console.log('connect');
    // device.subscribe('toto');
    // device.publish('toto', JSON.stringify({ test_data: 1}));
    });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var i = 0;
var batch = [];
// Should be call every 100 ms
rl.on('line', function(line) {
    if (i === 20) {
      // send message
      // reset
      console.log("send batch : ", batch);
      device.publish('bery_prod', JSON.stringify(batch));
      i = 0;
      batch = [];
    } else {
      batch.push({ecg_v: line});
      ++i;
    }
    // console.log("inside line", line);
    // device.publish('topic_2', JSON.stringify({ test_data: 1}));
    // device.publish('toto', line);
})
