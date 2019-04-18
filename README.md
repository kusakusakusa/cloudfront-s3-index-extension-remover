# Description

A Lambda@Edge funtion to be used with AWS Cloudfront to serve the index.html file of a subdirectory in an S3 bucket.

# Inspiration

This service is inspired by this [guide from AWS](https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/).

# Usage

TODO explain the use of each function

# Deployment

```
sls deploy --stage prod
```

* Go to Lamda in AWS Console, select the latest version for both functions.
* Create trigger for Cloudfront and select to [deploy to Lambda@Edge](docs/deploy_to_lambda.jpg). If you created this trigger before, you can just select to [use existing trigger](docs/existing_trigger.jpg).
* Change the `Cache behavior` according to your needs. These are the behaviours setup in Cloudfront.
* Select `Origin request` for the `Cloudfront event` option for `removeExtension` function, `View request` for the `addTrailingSlash` function.
* Click `Deploy` and wait for the changes to propagate to all of the Cloudfront distribution.
* You may need to invalidate your caches in Cloudfront.
* The logs will be appear in an edge location near your location. Be sure to change the region if the you do not see the logs in your current selcted region in the AWS console.