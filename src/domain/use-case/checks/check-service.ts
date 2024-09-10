import { LogEntity, LogSeverityLevel } from '@domain/entities/log.entity'
import { LogRepository } from '@domain/repositories/log.repository'

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)

            if (!req.ok) throw new Error(`Error on check service ${url}`)

            const logString = `Service ${url} working `
            const log = new LogEntity(logString, LogSeverityLevel.low)
            this.logRepository.saveLog(log)
            this.successCallback && this.successCallback()
        } catch (error) {
            const errorMessage = `${url} is not ok ${error}`
            const log = new LogEntity(errorMessage, LogSeverityLevel.hight)
            this.logRepository.saveLog(log)
            this.errorCallback && this.errorCallback(errorMessage)
            return false
        }

        return true
    }
}
