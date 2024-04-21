import { PostulationType } from '@/@type/postulation';
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

  const recipientList = [process.env.EMAIL_TO_TWEETY, process.env.EMAIL_TO_EDITION];

  const sendMailPromise = (recipient: string) => {
    return new Promise<string>((resolve, reject) => {
      transporter.sendMail(
        {
          from: process.env.MY_EMAIL,
          to: recipient,
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
        },
        (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            reject(error);
          } else {
            resolve(info.response);
          }
        },
      );
    });
  };

  try {
    const sendPromises = recipientList.map((recipient) => {
      if (recipient) {
        return sendMailPromise(recipient);
      }
      return Promise.reject(new Error('Recipient is undefined'));
    });
    await Promise.all(sendPromises);

    return NextResponse.json({ message: 'Email envoyé' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
