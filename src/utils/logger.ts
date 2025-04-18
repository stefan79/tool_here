import winston from 'winston';
import { config } from 'dotenv';

// Load environment variables
config();

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const logger = winston.createLogger({
  level: (process.env.LOG_LEVEL || 'info').toLowerCase(),
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

export { logger };
