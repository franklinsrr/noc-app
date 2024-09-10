import { LogDatasource } from '@domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '@domain/entities/log.entity'
import { LogRepository } from '@domain/repositories/log.repository'

export class LogRepositoryImplementation extends LogRepository {
    constructor(private readonly localDatasource: LogDatasource) {
        super()
    }

    async saveLog(log: LogEntity): Promise<void> {
        this.localDatasource.saveLog(log)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.localDatasource.getLogs(severityLevel)
    }
}
