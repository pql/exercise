const fs = require('fs');
const ReadStream = require('./ReadStream');
const rs = new ReadStream('./1.txt', {
    flags: 'r',
    encoding: 'utf8',
    highWaterMark: 3
});

const FileWriteStream = require('./FileWriteStream')
const ws = new FileWriteStream('./2.txt', {
    flags: 'w',
    encoding: 'utf8',
    highWaterMark: 3
});

rs.pipe(ws);