import { CronService } from '@presentation/cron/cron-service'
import { EmailService } from '@presentation/email/email.service'
import { CheckService } from '@domain/use-case/checks/check-service'
import { LogRepositoryImplementation } from '@infrastructure/repositories/log.repository.impl'
import { FileSystemDatasource } from '@infrastructure/datasource/file-system.datasource'
import { SendEmailLogs } from '@domain/use-case/email/send-email-logs'

const fileSystemLogRepository = new LogRepositoryImplementation(
    new FileSystemDatasource()
)

const emailService = new EmailService()

export class Server {
    public static start() {
        console.log('server started')

        new SendEmailLogs(emailService, fileSystemLogRepository).execute([
            'franklingra@outlook.com',
            'franklinserif@gmail.com',
        ])
        /*  emailService.sendEmailWidthFileSystemLogs([
            'franklingra@outlook.com',
            'franklinserif@gmail.com',
        ])  */

        const url = 'https://google.com'
        CronService.createJob('*/5 * * * * *', () => {
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`success ${url}`),
                (error) => console.log(error)
            ).execute(url)
        })
    }
}
