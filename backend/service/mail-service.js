import nodeMailer from 'nodemailer'

class MailService {

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            service: 'gmail',
            secure: false,
            auth: {
                user: 'devezier@gmail.com',
                pass: 'gxtbonlgrupvvekg'
            }
        })
    }


    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта на ${process.env.API_URL}`,
            text: '',
            html:
            `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        })
    }
}

export default new MailService()