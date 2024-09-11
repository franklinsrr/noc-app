import { Server } from '@presentation/server'
import { MongoDatase } from '@data/mongo/init'
import { envs } from '@config/plugins/envs.plugins'

const start = async () => {
    MongoDatase.connect({
        mongoURL: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    Server.start()
}

start()
