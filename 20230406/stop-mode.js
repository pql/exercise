const fs = require('fs');
const ReadStream2 = require('./ReadStream2');
const rs = new ReadStream2('./1.txt', {
    start: 3,
    end: 8,
    encoding: 'utf8',
    highWaterMark: 3
});

rs.on('readable', function () {
    console.log('readable');
    console.log('rs.buffer.length', rs.length);
    const d = rs.read(1);
    console.log(d);
    console.log('rs.buffer.length', rs.length);

    setTimeout(() => {
        console.log('rs.buffer.length', rs.length)
    }, 500);
})