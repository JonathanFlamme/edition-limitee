import { PostulationType } from '@/@type/postulation';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { GuildType } from '@/@type/type';
import prisma from '@/src/lib/prisma';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.EMAIL_OAUTH_CLIENT_ID,
  process.env.EMAIL_OAUTH_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground',
);

oauth2Client.setCredentials({
  refresh_token: process.env.EMAIL_OAUTH_REFRESH_TOKEN,
});

const createTransporter = async () => {
  const accessToken = await new Promise<string>((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err || !token) {
        console.error('Error getting access token:', err);
        reject('Failed to get access token');
      }
      resolve(token as string);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_OAUTH_MY_EMAIL,
      accessToken,
      clientId: process.env.EMAIL_OAUTH_CLIENT_ID,
      clientSecret: process.env.EMAIL_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_OAUTH_REFRESH_TOKEN,
    },
  });

  return transporter;
};

const lineBreak = (text: string) => {
  return text.replace(/\n/g, '<br>');
};

export async function POST(request: NextRequest) {
  const data: PostulationType = await request.json();

  const guild: Partial<GuildType> | null = await prisma.guild.findFirst({
    where: { name: 'edition-limitee' },
    select: { officierEmails: true },
  });
  if (!guild) {
    return NextResponse.json({ error: 'Guild not found' }, { status: 404 });
  }
  const recipientList = guild.officierEmails ?? [];

  let transporter = await createTransporter();

  const sendMailPromise = (recipient: string) => {
    return new Promise<string>((resolve, reject) => {
      transporter.sendMail(
        {
          from: process.env.EMAIL_OAUTH_MY_EMAIL,
          to: recipient,
          subject: `Candidature - ${data.pseudo}`,
          html: `
            <p>Bonjour,</p>
            <p>Vous venez de recevoir une postulation </p>
            <p><strong>Pseudo IG:</strong> ${data.pseudo}</p>
            <p><strong>Battle Tag:</strong> ${data.btag}</p>
            <p><strong>Raider IO:</strong> <a href="${data.raiderIo}" target="_blank">${data.raiderIo}</a></p>
            <p><strong>Classe:</strong> ${data.classe}</p>
            <p><strong>Spécialisation:</strong> ${data.specialisation}</p>
            <p><strong>Extension de démarrage:</strong> ${data.extension}</p>
            <p><strong>Niveau de jeu en raid:</strong> ${data.difficulteRaid}</p>
            <p><strong>Code secret:</strong> ${data.codeSecret}</p>
            <p><strong>Présentez-vous:</strong></p>
            <p>${lineBreak(data.message)}</p>
            <p>Merci de prendre contact avec cette personne.</p>
            <p>L'équipe d'édition limitée</p>`,
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
    applyDiscord(data);

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

async function applyDiscord(data: PostulationType) {
  const discordWebhook = process.env.DISCORD_APPLY;

  const message = `
____________________________________________________________________


  **Pseudo IG:** ${data.pseudo}
  **Battle Tag:** ${data.btag}

  **Raider IO:** ${data.raiderIo}

  **Classe:** ${data.classe}
  **Spécialisation:** ${data.specialisation}
  **Extension de démarrage:** ${data.extension}
  **Niveau de jeu en raid:** ${data.difficulteRaid}

  **Code secret:** ${data.codeSecret}

  **Présentez-vous:**
  ${data.message}

  `;

  await fetch(discordWebhook ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: message }),
  });
}
