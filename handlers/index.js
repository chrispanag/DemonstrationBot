const { attachmentHandler } = require('./attachments');
const { getContext } = require('./context');
const { menuHandler } = require('./payloads');
const { textHandler } = require('./text');

module.exports = {
    attachmentHandler,
    getContext,
    menuHandler,
    textHandler
}
