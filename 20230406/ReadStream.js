const fs = require("fs");
const EventEmitter = require("events");

class ReadStream extends EventEmitter {
  constructor(path, options) {
    super(path, options);
    this.path = path;
    this.fd = options.fd;
    this.flags = options.flags || "r";
    this.mode = options.mode || 0o666;
    this.encoding = options.encoding;
    this.start = options.start || 0;
    this.pos = this.start;
    this.end = options.end;
    this.flowing = false;
    this.autoClose = true;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.buffer = Buffer.alloc(this.highWaterMark);
    this.length = 0;
    this.on("newListener", (type, listener) => {
      if (type == "data") {
        this.flowing = true;
        this.read();
      }
    });
    this.on("end", () => {
      if (this.autoClose) {
        this.destroy();
      }
    });
    this.open();
  }

  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) return this.emit("error", err);
      this.fd = fd;
      this.emit("open", fd);
    });
  }

  read() {
    if (typeof this.fd != "number") {
      return this.once("open", () => this.read());
    }
    const n = this.end
      ? Math.min(this.end - this.pos, this.highWaterMark)
      : this.highWaterMark;
    fs.read(this.fd, this.buffer, 0, n, this.pos, (err, bytesRead) => {
      if (err) {
        return;
      }
      if (bytesRead) {
        let data = this.buffer.slice(0, bytesRead);
        data = this.encoding ? data.toString(this.encoding) : data;
        this.emit("data", data);
        this.pos += bytesRead;
        if (this.end && this.pos > this.end) {
          return this.emit("end");
        }
        if (this.flowing) {
          this.read();
        }
      } else {
        this.emit("end");
      }
    });
  }

  end() {
    if (this.autoClose) {
      this.destroy();
    }
  }

  destroy() {
    fs.close(this.fd, () => {
      this.emit("close");
    });
  }
}

ReadStream.prototype.pipe = function (dest) {
  this.on('data', (data) => {
    const flag = dest.write(data);
    if (!flag) {
      this.pause();
    }
  });
  dest.on('drain', () => {
    this.resume();
  });
  this.on('end', () => {
    dest.end();
  });
}

ReadStream.prototype.pause = function () {
  this.flowing = false;
}

ReadStream.prototype.resume = function () {
  this.flowing = true;
  this.read();
}

module.exports = ReadStream;
