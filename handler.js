'use strict';

// refer to https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/

function isAssetRequest(uri) {
  if (/\.[a-z]+$/.test(uri)) {
    console.log('request is an asset request');
    return true;
  }

  return false;
}

function hasTrailingSlash(uri) {
  if (/\/$/.test(uri)) {
    return true;
  }

  return false;
}

module.exports.removeExtension = async (event) => {
  console.log(`event: ${JSON.stringify(event)}`);
  let request = event.Records[0].cf.request
  let uri = request.uri;
  console.log(`uri: ${uri}`);

  // if is an asset request, just return request object
  if (isAssetRequest(uri)) {
    return request;
  }

  // add index.html to get to the root of the files
  if (hasTrailingSlash(uri)) {
    uri += 'index.html'
  } else {
    uri += '/index.html';
  }

  console.log(`return new request object with new uri: ${uri}`);
  request.uri = uri;
  return request;
};

module.exports.addTrailingSlash = async (event) => {
  console.log(`event: ${JSON.stringify(event)}`);
  let request = event.Records[0].cf.request
  let uri = request.uri;
  console.log(`uri: ${uri}`);

  // if is an asset request, just return request object
  if (isAssetRequest(uri)) {
    return request;
  }

  // add trailing / if dont have
  if (!hasTrailingSlash(uri)) {
    uri += '/'
  }

  console.log(`return new request object with new uri: ${uri}`);
  request.uri = uri;
  return request;
};
