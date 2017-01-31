var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
   keyPath: 'credentials/RB_ECG.private.key',
  certPath: 'credentials/RB_ECG.cert.pem',
    caPath: 'credentials/root-CA.crt',
  clientId: 'credentials/a3muphd3v4g69d',
    region: 'eu-west-1'
});

device
  .on('connect', function() {
    console.log('connect');
    var delayMillis = 3000; //1 second
    setTimeout(function() {
      var result = generateBradycardie();
      console.log("send : ", result);
      device.publish('bery_prod', JSON.stringify(result));
    }, delayMillis);
    // device.subscribe('toto');
    // device.publish('toto', JSON.stringify({ test_data: 1}));
    });

function generateBradycardie() {
  var batch = [];
  for (var i = 0; i < 700; ++i) {
    batch.push({ecg_v: 0.298143});
  }
  return batch;
}
