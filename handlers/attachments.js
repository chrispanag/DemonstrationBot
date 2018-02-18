const m = require('../messages/msgTemplates');

// The method that is called per attachment
function attachmentHandler (id, atts, user) {
    // For now just send a message that says that we don't handle attachments.
    return m.attachmentDefaultAnswer(id);
}

module.exports = {
    attachmentHandler
};
