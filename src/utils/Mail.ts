import * as nodemailer from "nodemailer";
import CError from "./CError";

class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }


    sendMail() : Promise<void> {
        let mailOptions = {
            from: process.env.EMAIL_ID,
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host:"smtp.gmail.com",
            port:587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: { rejectUnauthorized: false }
        });

        return transporter.sendMail(mailOptions);
    }


}

export default new Mail;