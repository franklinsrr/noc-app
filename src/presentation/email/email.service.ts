import nodemailer from 'nodemailer'
import { envs } from '@config/plugins/envs.plugins'

interface SendMailOptions {
    to: string | string[]
    subject: string
    htmlBody: string
    attachments?: Attachment[]
}

interface Attachment {
    filename: string
    path: string
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    })

    constructor() {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            })

            return true
        } catch (error) {
            return false
        }
    }

    async sendEmailWidthFileSystemLogs(to: string | string[]) {
        const subject = 'logs del servidor'
        const htmlBody = `
            <h1>Logs del sistema</h1>
            <h2>Ver los archivos adjuntos</h2>
        `

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-hight.log', path: './logs/logs-hight.log' },
        ]

        return await this.sendEmail({ to, subject, htmlBody, attachments })
    }
}
