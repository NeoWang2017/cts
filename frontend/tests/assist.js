const getAssertResult = async (page, index) => {
  return await page.evaluate((index) => {
    const container = document.querySelector(`div[data-name="case-card"]:nth-child(${index}) div[class^=container]`);
    return container ? container.textContent : null;
  }, index);
};

const sleep = (wait) => {
  return new Promise(resolve => setTimeout(resolve, wait));
}

module.exports = {
  getAssertResult,
  sleep
}
