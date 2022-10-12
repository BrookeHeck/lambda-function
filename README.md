# lambda-function

## Overview
This lab was an introduction to both AWS S3 and lambda functions. I started by creating a new bucket in S3 on the AWS console. S3 is a simple storage service that provides cloud storage. After I created a bucket, I created a lambda function, also on AWS. This lambda function was triggered by uploading images to the image folder in my bucket. When this event triggers the lambda function, it gets information from both the event, and also gets the uploaded file to get data about the file. The metadata about the uploaded image is stored in an object and added to a json file within the bucket.

One thing I had to be careful about was recursively updating the json file. The event is specifically triggered by a put event, so if I i use a put event to update the file, then the lambda function will be recursively called. To fix this, I put the event trigger specifically on my image directory, and put the image.json file in a different directory.

## Using this Lambda Function
The lambda function is triggered automatically by uploading images to the image folder. Only a user with the correct permissions can do this, but image.json file is readable by the public. The link to the public json file is below.

[image.json](https://lab-17.s3.us-west-2.amazonaws.com/images.json)