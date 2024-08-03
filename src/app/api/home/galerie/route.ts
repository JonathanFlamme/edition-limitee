import { oauthClient } from '@/src/lib/oauthClient';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const listImage = async (folderId: string, auth: any) => {
  const drive = google.drive({ version: 'v3', auth });

  const res = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(id, name, mimeType)',
  });

  return res.data.files?.map((file) => ({
    id: file.id,
    name: file.name,
    url: `https://drive.google.com/uc?export=view&id=${file.id}`,
  }));
};

export async function GET() {
  const folderId: string = '1h-2l-pjr4ZACOBdjMLfen6gKq3WNr9qO';

  try {
    const { oauth2Client } = await oauthClient();
    const files = await listImage(folderId, oauth2Client);

    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve files' }, { status: 500 });
  }
}
