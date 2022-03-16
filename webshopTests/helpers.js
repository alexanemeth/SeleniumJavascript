async function openUrl(internalDriver, url, expectedNewTitle) {
    await internalDriver.get(url);
    let title = await internalDriver.getTitle();
    title.should.equal(expectedNewTitle);
    await internalDriver.manage().window().maximize();
}

async function mouseOver(internalDriver, by) {
    let menuItem = await internalDriver.findElement(by);
    await internalDriver.actions().move({ origin: menuItem }).perform();
    await internalDriver.sleep(2000);
}

module.exports = {
    openUrl,
    mouseOver
}
