const s3 = require("../aws/aws");
const AmazonS3URI = require("amazon-s3-uri");

const deleteFile = (url) => {
  const { key } = AmazonS3URI(url);
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  s3.deleteObject(params, function (err, data) {
    if (err) {
      throw err;
    }
  });
};

module.exports = deleteFile;
