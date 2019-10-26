const Helper = codeceptjs.helper;


const {
  assertAccumulatedLength,
  assertResourcesExist,
  assertResourcesNumber,
  assertIsUniqueResource,
} = require('./asserts');

class MyHelper extends Helper {
  async spyTheResourcesLoadedIn(url) {
    const { browser } = await this.helpers.Puppeteer;
    const page = await browser.newPage();

    this.resources = [];

    page.on('response', (interceptedRequest) => {
      const headers = interceptedRequest._headers;
      const resource = {
        url: interceptedRequest.url(),
        contentLength: headers['content-length'] || 0,
        contentType: headers['content-type'],
      };
      this.debug(`${resource.contentType}\t${resource.contentLength}\t${resource.url}`);
      this.resources.push(resource);
    });

    this.debug('Resources Captured');
    await page.goto(url, { waitUntil: ['networkidle0'] });
    this.debug('End Resources Captured');
    await page.close();
  }

  async seeResourcesBeenLoaded() {
    assertResourcesExist(this.resources);
  }

  async checkTheResource(pattern, expectedSize) {
    assertResourcesExist(this.resources);

    const resourcesMatch = this.resources.filter(resource => pattern.test(resource.url));

    assertIsUniqueResource(resourcesMatch, { Pattern: pattern });
    assertAccumulatedLength(resourcesMatch, expectedSize, resourcesMatch[0], this.config.threshold);
  }

  async checkTheResources(pattern, expectedSize) {
    assertResourcesExist(this.resources);

    const resourcesMatch = this.resources.filter(resource => pattern.test(resource.url));

    assertAccumulatedLength(resourcesMatch, expectedSize, { pattern }, this.config.threshold);
  }

  async checkTheResourceType(contentType, expectedSize) {
    assertResourcesExist(this.resources);

    const resourcesMatch = this.resources.filter(resource => resource.contentType === contentType);

    assertAccumulatedLength(resourcesMatch, expectedSize, { 'content type': contentType }, this.config.threshold);
  }

  async checkAllResources(expectedSize) {
    assertResourcesExist(this.resources);
    assertAccumulatedLength(this.resources, expectedSize, {}, this.config.threshold);
  }

  async checkTheNumberOfResourceType(contentType, expectedNumber) {
    assertResourcesExist(this.resources);

    const resourcesMatch = this.resources.filter(resource => resource.contentType === contentType);

    assertResourcesNumber(resourcesMatch, expectedNumber);
  }

  async checkTheNumberOfResources(expectedNumber) {
    assertResourcesExist(this.resources);
    assertResourcesNumber(this.resources, expectedNumber);
  }
}

module.exports = MyHelper;
