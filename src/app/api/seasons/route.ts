import { google } from "googleapis";
import { NextResponse } from "next/server";

// Define the scope for Google Drive API
const SCOPES = ["https://www.googleapis.com/auth/drive"];

export async function GET() {
  try {
    const folderIds = [
      process.env.NEXT_PUBLIC_TBL07,
      process.env.NEXT_PUBLIC_TBL08,
    ];

    const auth = new google.auth.GoogleAuth({
      // keyFile: keyFilePath,
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_PRIVATE_KEY,
      },
      scopes: SCOPES,
    });

    const drive = google.drive({
      version: "v3",
      auth: auth,
    });

    // List files in the folder
    const results: any = [];

    for (const folderId of folderIds) {
      const res = await drive.files.get({
        fileId: folderId, // Query to list files in the folder
        fields: "id, name", // Retrieve file ID and name
      });
      results.push(res.data);
    }

    //   return res?.data?.files;

    return NextResponse.json({ result: results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
