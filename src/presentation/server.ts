import { CronService } from '@presentation/cron/cron-service'
import { CheckService } from '@domain/use-case/checks/check-service'

export class Server {
    public static start() {
        console.log('server started')
        const url = 'https://google.com'
        CronService.createJob('*/5 * * * * *', () => {
            new CheckService(
                () => console.log(`success ${url}`),
                (error) => console.log(error)
            ).execute(url)
        })
    }
}
