const configGun = require('../Config/ConfigGun.json');
const configItem = require('../Config/ConfigItem.json');
const configUser = require('../Config/ConfigUser.json');

var configManager = {
    configGun,
    configItem,
    configUser
}

module.exports = configManager;