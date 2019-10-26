const assert = require('assert');
const { DEFAULT_THRESHOLD_VALUE } = require('./constants');


const assertFailWithFormatError = (errorMessage, extraInfo) => {
  const extraInfoString = Object.keys(extraInfo)
    .map(info => `\n\t${info}:\n\t${extraInfo[info]}`)
    .join('\n');
  assert.fail(`${errorMessage}\n${extraInfoString}`);
};

const assertResourcesNumber = (resourcesMatch, expectedNumber, extraInfo = {}) => {
  const numResources = resourcesMatch.length;

  if (numResources > expectedNumber) {
    assertFailWithFormatError(
      'The resources are more than you expected', {
        'expected number': expectedNumber,
        'actual size': numResources,
        ...extraInfo,
      },
    );
  }

  if (numResources < expectedNumber) {
    assertFailWithFormatError(
      'The resources are less than you expected', {
        'expected number': expectedNumber,
        'actual number': numResources,
        ...extraInfo,
      },
    );
  }
};

const assertResourcesExist = (resources) => {
  if (!resources || resources.length === 0) {
    assert.fail('No resource to check. Be sure you run I.spyTheResourcesLoadedIn');
  }
};

const assertAccumulatedLength = (resourcesMatch, expectedSize, extraInfo = {}, threshold = DEFAULT_THRESHOLD_VALUE) => {
  const totalContentLength = resourcesMatch.map(resource => resource.contentLength).reduce((a, b) => a + parseInt(b, 10), 0);
  const thresholdValue = expectedSize * threshold;

  if (totalContentLength > expectedSize + thresholdValue) {
    assertFailWithFormatError(
      resourcesMatch.legnth > 1
        ? 'The resources are bigger than you expected'
        : 'The resource is bigger than you expected',
      {
        'expected size': expectedSize,
        threshold,
        'actual size': totalContentLength,
        ...extraInfo,
      },
    );
  }

  if (totalContentLength < expectedSize - thresholdValue) {
    assertFailWithFormatError(
      resourcesMatch.legnth > 1
        ? 'The resources are smaller than you expected'
        : 'The resource is smaller than you expected',
      {
        'expected size': expectedSize,
        threshold,
        'actual size': totalContentLength,
        ...extraInfo,
      },
    );
  }
};

const assertIsUniqueResource = (resourcesMatch, extraInfo = {}) => {
  if (resourcesMatch.length !== 1) {
    assertFailWithFormatError(resourcesMatch.length === 0
      ? 'No resources match with this pattern. Here is the list of resources'
      : 'More than one resource match with this pattern. Here is the list of possible resources',
    extraInfo);
  }
};


module.exports = {
  assertResourcesNumber,
  assertResourcesExist,
  assertAccumulatedLength,
  assertFailWithFormatError,
  assertIsUniqueResource,
};
