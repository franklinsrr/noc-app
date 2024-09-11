import { LogDatasource } from '@domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '@domain/entities/log.entity'
import { PrismaClient, SeveryLevel } from '@prisma/client'

const prisma = new PrismaClient()

const severityEnum = {
    low: SeveryLevel.LOW,
    medium: SeveryLevel.MEDIUM,
    hight: SeveryLevel.MEDIUM,
}

export class PostgresLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity) {
        const level = severityEnum[log.level]

        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level,
            },
        })

        console.log('postgres saved ', (await newLog).message)
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel]

        const dbLogs = await prisma.logModel.findMany({
            where: { level },
        })

        return dbLogs.map(LogEntity.fromObject)
    }
}
