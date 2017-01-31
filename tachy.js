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
    });

function generateBradycardie() {
  var batch = [];
  var pic = 0;
  for (var i = 0; i < 700; ++i) {

    if (pic == 5) {
      batch.push({ecg_v: 0.498143});
      pic = 0;
    } else {
      batch.push({ecg_v: 0.298143});
    }

    ++pic;
  }
  return batch;
}
