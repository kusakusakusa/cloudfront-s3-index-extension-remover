'use strict';

// refer to https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/

module.exports.removeExtension = async (event) => {
  console.log(event)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: JSON.stringify(event),
    }),
  };
};
