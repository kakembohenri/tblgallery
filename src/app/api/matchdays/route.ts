import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// Define the scope for Google Drive API
const SCOPES = ["https://www.googleapis.com/auth/drive"];

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Get specific query parameters
    const season = searchParams.get("season");

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

    const res = await drive.files.list({
      q: `'${season}' in parents`, // Query to list files in the folder
      fields: "files(id, name, mimeType)", // Retrieve file ID and name
    });

    return NextResponse.json({ result: res?.data?.files }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
