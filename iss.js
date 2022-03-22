/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
 const request = require('request');

 
  // use request to fetch IP address from JSON API
  //"ip":"174.89.235.249"
  // 'https://api.ipify.org?format=json' URL to retrieve our IP Address
  //Define a function fetchmyIP that will return IP addresses
  
  const fetchMyIP = function (callback) {
    request('https://api.ipify.org?format=json', (error, response, body) => {
      // inside the request callback ...
  // error can be set if invalid domain, user is offline, etc.
  if (error) {
    callback(error, null);
    return;
  }
  // if non-200 status, assume server error
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }

  // if we get here, all's well and we got the data 
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    });
  }
//define the new function fetchCoordsByIP
const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
  //error cases  
  if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};


//Calls to export functions:
module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };