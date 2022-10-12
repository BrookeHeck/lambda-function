const AWS_SDK = require('aws-sdk')

const s3Client = new AWS_SDK.S3();

exports.handler = async (event) => {
    
    const {
      bucket,
      object
    } = event.Records[0].s3;

    
    let uploadedFile = await s3Client.getObject({
        Bucket: bucket.name,
        Key: object.key,
    }).promise();
    
    
    const imageDetails = {
        name: object.key.split('/')[1],
        fileType: uploadedFile.ContentType.split('/')[1],
        size: uploadedFile.ContentLength,
        lastModified: uploadedFile.LastModified,
    }

    let imageFile = await s3Client.getObject({
        Bucket: bucket.name,
        Key: 'images.json'
    }).promise();
    
    let imageFileBody = null;
    try {
        imageFileBody = JSON.parse(imageFile.Body.toString());
        imageFileBody[imageFileBody.length] = imageDetails;
    } catch(e) {
        console.log('image.json empty, creating new array');
        imageFileBody = [imageDetails];
    }

    await s3Client.putObject({
        Bucket: bucket.name,
        Key: 'images.json',
        Body: JSON.stringify(imageFileBody),
    }).promise();
    
    console.log('image added to log');

};