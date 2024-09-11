import { CronService } from '@presentation/cron/cron-service'
import { LogRepositoryImplementation } from '@infrastructure/repositories/log.repository.impl'
import { FileSystemDatasource } from '@infrastructure/datasource/file-system.datasource'
import { PostgresLogDatasource } from '@infrastructure/datasource/postgres-log.datasource'
import { MongoLogDatasource } from '@infrastructure/datasource/mongo-log.datasource'
import { CheckServiceMultiple } from '@domain/use-case/checks/check-service-multiple'

const fsRepository = new LogRepositoryImplementation(new FileSystemDatasource())

const mongoRepository = new LogRepositoryImplementation(
    new MongoLogDatasource()
)

const postgresRepository = new LogRepositoryImplementation(
    new PostgresLogDatasource()
)

export class Server {
    public static start() {
        console.log('server started')

        const url = 'https://faceqwdqwdbook.com'
        CronService.createJob('*/2 * * * * *', () => {
            new CheckServiceMultiple(
                [fsRepository, mongoRepository, postgresRepository],
                () => console.log(`success ${url}`),
                (error) => console.log(error)
            ).execute(url)
        })
    }
}
