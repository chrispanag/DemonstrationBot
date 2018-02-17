const m = require('../messages/msgTemplates');

function menuHandler (messaging, payload, user) {
    const id = user.id;
    switch (payload) {
        case "get_started": return m.getStarted(id, user);
        default: return payloadWithoutData(messaging, payload, user);
    }
}

function payloadWithoutData (messaging, payload, user) {
    const id = user.id;
    const parsedPayload = JSON.parse(payload);
    switch (parsedPayload) {
        default: return payloadWithData(messaging, parsedPayload, user);
    }
}

function payloadWithData (messaging, payload, user) {
    const id = user.id;
    const { type, data} = payload;
    switch (type) {
        default: throw new Error(`ERROR: Unidentified payload type: ${type}`);
    }
}

module.exports = {
    menuHandler,
    payloadWithoutData,
    payloadWithData
};
