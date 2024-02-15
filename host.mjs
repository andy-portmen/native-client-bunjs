/* global Bun */

const version = '0.1.1 (BunJS)';

/* push */
const writer = Bun.stdout.writer();
const push = o => {
  const chunk = new TextEncoder().encode(JSON.stringify(o));
  const len = new ArrayBuffer(4);
  const lenView = new DataView(len);
  lenView.setUint32(0, chunk.byteLength, true);
  writer.write(new Uint8Array(len));
  writer.write(chunk);
  writer.flush();
};

/* done */
const done = () => {
  writer.end();
  process.exit();
};

const message = {
  length: null,
  observe(msg) {
    if (msg.cmd === 'version') {
      push({
        version
      });
      done();
    }
    else if (msg.cmd === 'spec') {
      push({
        version,
        env: process.env,
        separator: require('path').sep,
        tmpdir: require('os').tmpdir()
      });
      done();
    }
    else if (msg.cmd === 'echo') {
      push(msg);
      done();
    }
    else if (msg.cmd === 'env') {
      push({
        env: process.env
      });
      done();
    }
    else if (msg.cmd === 'exec') {
      const path = require('path');
      if (msg.env) {
        msg.env.forEach(n => process.env.PATH += path.delimiter + n);
      }
      const p = Array.isArray(msg.command) ? path.join(...msg.command) : msg.command;
      const proc = Bun.spawn([p, ...msg.arguments], {
        env: process.env,
        stderr: 'pipe',
        onExit(proc, code, signalCode, error) {
          Promise.all([
            new Response(proc.stdout).text(),
            new Response(proc.stderr).text()
          ]).then(([stdout, stderr]) => {
            push({
              code,
              stderr,
              stdout
            });
            done();
          });
        }
      });
      if (!msg.kill) {
        proc.unref();
      }
    }
    else if ('script' in msg) {
      let close;
      const exception = e => {
        push({
          code: -1,
          type: 'exception',
          error: e.stack
        });
        close();
      };
      close = () => {
        process.removeListener('uncaughtException', exception);
        done();
        close = () => {};
      };
      process.addListener('uncaughtException', exception);

      const vm = require('vm');
      const sandbox = {
        version,
        env: process.env,
        push,
        close,
        done,
        setTimeout,
        args: msg.args,
        // only allow internal modules that extension already requested permission for
        require: name => (msg.permissions || []).includes(name) ? require(name) : null
      };
      const script = new vm.Script(msg.script);
      const context = vm.createContext(sandbox);
      script.runInContext(context);
    }
    else {
      push({
        error: 'cmd is unknown',
        cmd: msg.cmd,
        code: 1000
      });
      done();
    }
  }
};

/* reading from stdin and writing to stdout */
for await (let chunk of Bun.stdin.stream()) {
  const parse = () => {
    // Do we have a length yet?
    if (typeof message.length !== 'number') {
      // Nope. Do we have enough bytes for the length?
      if (chunk.length >= 4) {
        // Yep. Parse the bytes.
        message.length = new DataView(chunk.buffer).getUint32(0, true);
        // Remove the length bytes from the buffer.
        chunk = chunk.slice(4);
      }
    }

    // Do we have a length yet? (We may have just parsed it.)
    if (typeof message.length === 'number') {
      // Yep. Do we have enough bytes for the message?
      if (chunk.length >= message.length) {
        // Yep. Slice off the bytes we need.
        const buffer = chunk.slice(0, message.length);
        // Remove the bytes for the message from the buffer.
        chunk = chunk.slice(message.length);
        // Clear the length so we know we need to parse it again.
        message.length = null;

        // Parse the message bytes.
        const textDecoder = new TextDecoder();
        const msg = textDecoder.decode(buffer);
        message.observe(JSON.parse(msg));
        // We could have more messages in the buffer so check again.
        parse();
      }
    }
  };
  // Check for a parsable buffer (both length and message).
  parse();
}
