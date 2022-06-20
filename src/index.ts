import { createLogger as createWinstonLogger, format, transports } from "winston";
import DebugTransport from "./debugTransport";
import 'setimmediate';
import split from "split";

const appName = "";

export const getDynamicImportVConsole = (dynamic : any) => {  
  return dynamic(() => import("./vconsole"), { ssr: false, });
}

export const createLogger = (moduleName : string) =>  {
  const logger : any = createWinstonLogger({
    level: "debug",
    format: format.combine(    
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),    
    ),
    defaultMeta: { service: appName, label: moduleName },    
  });
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new DebugTransport({}));
    logger.add(new transports.Console({    
        format: format.combine(          
          format.label({
              label: moduleName
          }),
          format.timestamp({
             format: 'YYYY-MM-DD HH:mm:ss'
         }),
          format.printf(info => `${[info.timestamp]} [${info.level}] ${info.label}  "${JSON.stringify(info.message)}"`),
        )
      }));
  }

  logger.stream = split().on('data', function (message) {
    logger.info(message);
  });
  return logger;
};
