export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    hight = 'hight',
}

export interface LogEntityOptions {
    level: LogSeverityLevel
    message: string
    createdAt?: Date
    origin: string
}

export class LogEntity {
    public level: LogSeverityLevel
    public message: string
    public createdAt: Date
    public origin: string

    constructor({ message, level, origin }: LogEntityOptions) {
        this.message = message
        this.level = level
        this.origin = origin
        this.createdAt = new Date()
    }

    static fromJson(json: string = '{}'): LogEntity {
        json = json === '' ? '{}' : json
        const { message, level, createdAt, origin } = JSON.parse(json)

        if (!message) throw new Error('Message is required')
        if (!level) throw new Error('Message is required')
        if (!createdAt) throw new Error('Message is required')

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        })
        return log
    }

    static fromObject(object: { [key: string]: any }): LogEntity {
        const { message, level, createdAt, origin } = object
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        })

        return log
    }
}
