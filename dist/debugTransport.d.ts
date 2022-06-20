import Transport from "winston-transport";
declare class DebugTransport extends Transport {
    constructor(opts: any);
    log(info: any, callback: any): void;
}
export default DebugTransport;
