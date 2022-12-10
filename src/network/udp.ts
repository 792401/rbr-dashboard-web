import * as dgram from "dgram";

const socket = dgram.createSocket("udp4");

socket.bind(6776, "127.0.0.1");

socket.on("message", function(msg: Buffer, rinfo: dgram.RemoteInfo) {

  const message = msg.reverse().toString('hex')
  console.log(`Received message: ${message}`);
});
