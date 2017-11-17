exports.handler = function(context, event, callback) {
  let jwt = require('jsonwebtoken')
  let response = new Twilio.Response()

  const ClientCapability = Twilio.jwt.ClientCapability;
  const clientName = event.clientName;
  const token = event.token;

  jwt.verify(token, context.AUTH_TOKEN, function(err, decoded) {
    if (err) {
      response.appendHeader(status, '401')
      callback(null, response)
    } else {
      const capability = new ClientCapability({
          accountSid: context.ACCOUNT_SID,
          authToken: context.AUTH_TOKEN,
      });
      capability.addScope(new ClientCapability.IncomingClientScope(clientName));
      capability.addScope(
        new ClientCapability.OutgoingClientScope({applicationSid: context.TWILIO_TWIML_APP})
      );

      callback(null, capability.toJwt());
    }
  })
}
