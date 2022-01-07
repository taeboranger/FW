const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file')
const moment = require('moment');   //한국시간을 나타내기 위한 모듈 추가
const fs = require('fs'); 
const logDir ='./log';

const { combine, timestamp, printf } = winston.format
const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  })

const logger = winston.createLogger({
  format: combine(
    timestamp({
       format: 'YYYY-MM-DD HH:mm:ss',
     }),
     logFormat,
   ),
   transports: [
     // info 레벨 로그를 저장할 파일 설정
     new winstonDaily({
       level: 'info',
       datePattern: 'YYYY-MM-DD',
       dirname: logDir,
       filename: `%DATE%.log`,
       maxFiles: 30,  // 30일치 로그 파일 저장
       zippedArchive: true, 
     }),
     // error 레벨 로그를 저장할 파일 설정
     new winstonDaily({
       level: 'error',
       datePattern: 'YYYY-MM-DD',
       dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
       filename: `%DATE%.error.log`,
       maxFiles: 30,
       zippedArchive: true,
     }),
   ],
 })

exports.log = (info) => {
  logger.info(info)
  console.log(info)
}

exports.err = (err) => {
  logger.error(err)
  console.error(err)
}

