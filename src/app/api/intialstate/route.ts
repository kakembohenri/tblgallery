import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// Define the scope for Google Drive API
const SCOPES = ["https://www.googleapis.com/auth/drive"];

export async function GET(req: NextRequest) {
  try {
    const folderMIMEType = "application/vnd.google-apps.folder";
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

    // Get season matchdays
    const seasonRes = await drive.files.get({
      fileId: process.env.NEXT_PUBLIC_TBL08, // Query to list files in the folder
      fields: "id, name", // Retrieve file ID and name
    });

    // Get first season matchday
    const res = await drive.files.list({
      q: `'${seasonRes?.data?.id}' in parents`, // Query to list files in the folder
      fields: "files(id, name, mimeType)", // Retrieve file ID and name
    });

    // Get latest matchday

    const latestMatchday = res?.data?.files ? res?.data?.files[0] : { id: "" };

    if (latestMatchday) {
      // Return fan pics
      const lastestMatchdayRes = await drive.files.list({
        q: `'${latestMatchday.id}' in parents`, // Query to list files in the folder
        fields: "files(id, name, mimeType)", // Retrieve file ID and name
      });

      // console.log("fanRes?.data?.files :", lastestMatchdayRes?.data?.files);
      const regex = /\b(fans?|fan)\b/i;
      // Filter and find FANS folder
      const fans = lastestMatchdayRes?.data?.files?.filter((matchday) =>
        regex.test(matchday.name as string)
      );

      if (!fans) return NextResponse.json({ result: [] }, { status: 200 });

      let returnedPics = [];

      const res = await drive.files.list({
        q: `'${fans[0].id}' in parents`, // Query to list files in the folder
        fields: "files(id, name, mimeType)", // Retrieve file ID and name
      });

      if (!res?.data?.files)
        return NextResponse.json({ result: [] }, { status: 200 });

      for (const media of res?.data?.files) {
        if (media.mimeType !== folderMIMEType) {
          returnedPics.push(media);
        } else {
          const dirPics = await drive.files.list({
            q: `'${media.id}' in parents`, // Query to list files in the folder
            fields: "files(id, name, mimeType)", // Retrieve file ID and name
          });
          if (dirPics?.data?.files) returnedPics.push(...dirPics?.data?.files);
        }
      }

      return NextResponse.json({ result: returnedPics }, { status: 200 });
    }
    //   return res?.data?.files;

    return NextResponse.json({ result: [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
