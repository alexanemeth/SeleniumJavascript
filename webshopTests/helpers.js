async function openUrl(internalDriver, url) {
  await internalDriver.get(url);
  await internalDriver.manage().window().maximize();
}

async function mouseOver(internalDriver, by) {
  let menuItem = await internalDriver.findElement(by);
  await internalDriver.actions().move({ origin: menuItem }).perform();
}

//random e-mail generator
const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  openUrl,
  mouseOver,
  generateString,
};
