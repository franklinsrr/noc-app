import { CronService } from '@presentation/cron/cron-service'
import { CheckService } from '@domain/use-case/checks/check-service'
import { LogRepositoryImplementation } from '@infrastructure/repositories/log.repository.impl'
import { FileSystemDatasource } from '@infrastructure/datasource/file-system.datasource'

const fileSystemLogRepository = new LogRepositoryImplementation(
    new FileSystemDatasource()
)

export class Server {
    public static start() {
        console.log('server started')
        const url = 'http://localhost:3000'
        CronService.createJob('*/5 * * * * *', () => {
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`success ${url}`),
                (error) => console.log(error)
            ).execute(url)
        })
    }
}
