const jwt = require('jsonwebtoken');

const authenticate = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
  undefined
    if (authHeader) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (authHeader === undefined) {
      response.status(401);
      response.send("Invalid JWT Token1");
    } else {
      jwt.verify(jwtToken, "MY_SECRET_KEY", async (error, payload) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          request.username = payload.username;
          next();
        }
      });
    }
  };

module.exports = authenticate;
