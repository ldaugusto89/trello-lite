import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmailService {

    async sendVerificationEmail(to: string, token: string) {
        const verifyUrl = `http://localhost:3000/verify-email?token=${token}`;

        await axios.post('https://api.resend.com/emails',{
        from: 'noreply@resend.dev', // pode deixar assim em dev
        to,
        subject: 'Verifique seu e-mail',
        html: `
          <h2>Verificação de E-mail</h2>
          <p>Clique no link abaixo para ativar sua conta:</p>
          <a href="${verifyUrl}">${verifyUrl}</a>
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
      })
    }
}
    
