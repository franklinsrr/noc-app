import fs from 'fs'
import { LogDatasource } from '@domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '@domain/entities/log.entity'

export class FileSystemDatasource extends LogDatasource {
    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly hightLogsPath = 'logs/logs-hight.log'

    constructor() {
        super()
        this.createLogFiles()
    }

    private createLogFiles() {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        ;[this.allLogsPath, this.mediumLogsPath, this.hightLogsPath].forEach(
            (path) => {
                if (fs.existsSync(path)) return
                fs.writeFileSync(path, '')
            }
        )
    }

    async saveLog(log: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(log)}\n`

        fs.appendFileSync(this.allLogsPath, logAsJson)

        if (log.level === LogSeverityLevel.low) return

        if (log.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson)
        }

        if (log.level === LogSeverityLevel.hight) {
            fs.appendFileSync(this.hightLogsPath, logAsJson)
        }
    }

    private getLogsFromFile(path: string): LogEntity[] {
        const content = fs.readFileSync(path, 'utf-8')
        const logs = content.split('\n').map(LogEntity.fromJson)

        return logs
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath)
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath)
            case LogSeverityLevel.hight:
                return this.getLogsFromFile(this.hightLogsPath)
            default:
                throw new Error(`${severityLevel} not implemented`)
        }
    }
}
