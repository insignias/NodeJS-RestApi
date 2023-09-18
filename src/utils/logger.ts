import logger from "pino";
import dayjs from "dayjs";

const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
          translateTime: "SYS:ddd mmm dd yyyy HH:MM:ss",
          colorize: true,
          ignore: "pid,hostname"
        }
    }
});

export default log;