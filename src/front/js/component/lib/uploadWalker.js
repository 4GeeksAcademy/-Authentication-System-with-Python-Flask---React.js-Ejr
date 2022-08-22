import { IncomingForm } from "formidable";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOURDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: false,
});

export const config = {
  api: {
    bodyParse: false,
  },
};

const pageUrl = "https://dogger-web-app.herokuapp.com";

export default async function upload(req, res) {
  if (req.method === "POST") {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    const file = data?.files?.inputFile.filepath;
    const { walker_id } = data.fields;
    try {
      const response = await cloudinary.v2.uploader.upload(file, {
        public_id: walker_id,
      });
      const { public_id } = response;

      const userResponse = await fetch(
        `${process.env.pageUrl}/walkers/${walker_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: public_id,
          }),
        }
      );
      const data = await userResponse.json();
      return res.json({ message: "success" });
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  } else {
    return res.status(403).send("Forbidden");
  }
}
