import * as AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (fileStream: any, userId: number, folderName: string) => {
  const  {
    file: {
      filename,
      createReadStream
    }
  }= await fileStream;
  
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;

  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instaclone-uploads-imjae",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();

  return Location;
};
