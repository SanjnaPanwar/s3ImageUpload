require('dotenv').config()
const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

const fileStream = fs.createReadStream('\machine-learning5.jpg');
fileStream.on('error', function(err) {
  console.error('File Error', err);
});

const uploadParams = {
  Bucket: process.env.Bucket,
  Key: 'machine-learning5.jpg',
  Body: fileStream,
};

const run = async () => {
  try {
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log(`File uploaded successfully. ${data.Location}`);
  } catch (err) {
    console.error(err);
  }
};

run();
