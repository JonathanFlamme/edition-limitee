import { PostulationType } from '@/@type/postulation';
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  const data: PostulationType = await request.json();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.EMAIL_TO,
    subject: `Vous avez une nouvelle postulation de ${data.pseudo} `,
    html: `
        <p>Bonjour,</p>
        <p>Vous venez de recevoir une postulation </p>
        <p><strong>Pseudo IG:</strong> ${data.pseudo}</p>
        <p><strong>Battle Tag:</strong> ${data.btag}</p>
        <p><strong>Classe:</strong> ${data.classe}</p>
        <p><strong>Spécialisation:</strong> ${data.specialisation}</p>
        <p><strong>Extension de démarrage:</strong> ${data.extension}</p>
        <p><strong>Niveau de jeu en raid:</strong> ${data.difficulteRaid}</p>
        <p><strong>Code secret:</strong> ${data.codeSecret}</p>
        <p><strong>Présentez-vous:</strong> ${data.message}</p>
        <p>Merci de prendre contact avec cette personne.</p>
        <p>L'équipe d'édition limtée</p>`,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          console.log('Error: ', err.message);
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email envoyé' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
