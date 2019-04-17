'use strict';

// refer to https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/

module.exports.removeExtension = async (event) => {
  let request = event.Records[0].cf.request
  let uri = request.uri;

  console.log(`uri: ${uri}`);

  // if is an asset request, just return request object
  if (/\.[a-z]+$/.test(uri)) {
    console.log('return request object unchanged');
    return request;
  }

  // add trailing / if dont have
  if (!/\/$/.test(uri)) {
    uri += '/index.html';
  } else {
    uri += 'index.html'
  }

  request.uri = uri;

  console.log(`return new request object with new uri: ${uri}`);
  return request;
};
