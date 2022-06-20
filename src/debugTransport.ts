import Transport from "winston-transport";
import debug from "debug";

class DebugTransport extends Transport {
  constructor(opts : any) {
    super(opts);
    debug.enable("*");
  }

  log(info : any, callback : any) {    
    setImmediate(() => {   
      debug(`${info.service}:${info.label}`)(info.message)      
    });

    callback();
  }
};

export default DebugTransport;