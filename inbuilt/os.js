let os = require('os');
console.log(os.platform()) //darwin
console.log(os.arch()) //x64
console.log(os.cpus().length+" core") //4 core
console.log(os.freemem()) //416694272 byte
console.log(os.uptime()) //2891090secj