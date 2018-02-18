const m = require('../messages/msgTemplates');

// Handles payload that hasn't been serialized as JSON. (Only from Persistent Menu and Get Started Button postback calls)
function menuHandler (messaging, payload, user) {
    const id = user.id;
    switch (payload) {
        case "get_started": return m.getStarted(id, user);
        default: return payloadWithoutData(messaging, payload, user);
    }
}

// Handles payload that is only a string that has been serialized as JSON (Quickreplies, Buttons etc.)
function payloadWithoutData (messaging, payload, user) {
    const id = user.id;
    const parsedPayload = JSON.parse(payload);
    switch (parsedPayload) {
        default: return payloadWithData(messaging, parsedPayload, user);
    }
}

// Handles payload that contains meaningful data with it. The payload needs to have this structure
// { type: <ROUTE_STRING>, data: <JSON_WITH_DATA> }
function payloadWithData (messaging, payload, user) {
    const id = user.id;
    const { type, data } = payload;
    switch (type) {
        default: throw new Error(`ERROR: Unidentified payload type: ${type}`);
    }
}

module.exports = {
    menuHandler,
    payloadWithoutData,
    payloadWithData
};
