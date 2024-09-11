import { LogEntity, LogSeverityLevel } from '@domain/entities/log.entity'
import { LogRepository } from '@domain/repositories/log.repository'
import { EmailService } from '@presentation/email/email.service'

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {}

    async execute(to: string | string[]) {
        try {
            const sent =
                await this.emailService.sendEmailWidthFileSystemLogs(to)

            if (!sent) throw new Error('Email log not sent')

            const log = new LogEntity({
                message: 'Email log sent',
                level: LogSeverityLevel.low,
                origin: 'send-email-logs.ts',
            })
            this.logRepository.saveLog(log)

            return true
        } catch (error) {
            const log = new LogEntity({
                message: 'Email log not sent',
                level: LogSeverityLevel.hight,
                origin: 'send-email-logs.ts',
            })
            this.logRepository.saveLog(log)
            return false
        }
    }
}
