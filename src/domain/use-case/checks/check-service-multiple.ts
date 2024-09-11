import { LogEntity, LogSeverityLevel } from '@domain/entities/log.entity'
import { LogRepository } from '@domain/repositories/log.repository'

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

const origin = 'check-service.ts'

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    private callLogs(log: LogEntity) {
        this.logRepository.forEach((logRepository) =>
            logRepository.saveLog(log)
        )
    }

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)

            if (!req.ok) throw new Error(`Error on check service ${url}`)

            const logString = `Service ${url} working `

            const log = new LogEntity({
                message: logString,
                level: LogSeverityLevel.low,
                origin,
            })

            this.callLogs(log)
            this.successCallback && this.successCallback()
        } catch (error) {
            const errorMessage = `${url} is not ok ${error}`
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.hight,
                origin,
            })
            this.callLogs(log)
            this.errorCallback && this.errorCallback(errorMessage)
            return false
        }

        return true
    }
}
