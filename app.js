const bodyParser = require('body-parser');
const express = require('express');
const { FB, webhook, messengerWebhook } = require('fblib');

// Webserver parameter
const PORT = process.env.PORT;
if (!PORT)
  throw new Error('missing PORT');

global.FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
if (!global.FB_PAGE_TOKEN)
  throw new Error('missing FB_PAGE_TOKEN');
  
global.FB_APP_SECRET = process.env.FB_APP_SECRET;
if (!global.FB_APP_SECRET)
  throw new Error('missing FB_APP_SECRET');

const FB_PAGE_ID = process.env.FB_PAGE_ID;
if (!FB_PAGE_ID)
  throw new Error('missing FB_PAGE_ID');

const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
if (!FB_VERIFY_TOKEN)
  throw new Error('missing FB_VERIFY_TOKEN');

/*  All the handlers files are inside the ./handlers folder. There are these handlers: 
    {
      attachmentHandler,
      getContext,
      menuHandler,
      textHandler
    }
*/
const handlers = require('./handlers');
const { verifyRequestSignature } = new FB(global.FB_PAGE_TOKEN, global.FB_APP_SECRET);

// Starting our webserver and putting it all together
const app = express();
app.use(bodyParser.json({ verify: verifyRequestSignature }));


// Webhook setup (Verify Token for the webhook)
app.get('/fb', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === FB_VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
    throw new Error("Failed validation. Make sure the validation tokens match.");
  }
});

const messenger = messengerWebhook(handlers);

// Message handler
app.post('/fb', webhook(FB_PAGE_ID, messenger));

app.listen(PORT);
console.log('The Webhook is Initialized!');
