export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    hight = 'hight',
}

export class LogEntity {
    public level: LogSeverityLevel
    public message: string
    public createdAt: Date

    constructor(message: string, level: LogSeverityLevel) {
        this.message = message
        this.level = level
        this.createdAt = new Date()
    }
}
