// #!/usr/bin/env node

// process.stdin.resume();
// process.stdin.setEncoding('utf8');
// process.stdin.pipe(process.stdout);

var i = 0;
process.stdin.resume();
process.stdin.on('data', function(buf) {
  //  console.log('buf = ' + buf.toString());
  //  content += buf.toString();
  ++i;
  console.log('hello ', buf.toString());
 }
);
process.stdin.on('end', function() {
    console.log('i = ' + i);
    // console.log(content.split('').reverse().join(''));
});
