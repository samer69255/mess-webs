
const request = require('request');
var s;

function sendTextMessage(sender, text) {
    var token = "EAAELRvdKfxEBAP3cXdhHbh01sUalCZCGqZBKRL6ZCdPZAE3UjZC95A9LVVmCFhQTaFHALIL87RGOBgKF7SFB6Ti4gjd8fZA2t2QeUlmIIQOS9D2XFmC5aZBM3hxDNRX0WguyW7vfdylnczsWNTxpmZCxpwBos7DnZBpACuokckNT10HyNpkUvq7DM";
    var messageData = { text:text };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData
        }
    }, function(error, response, body) {
        if (error) {
            {console.log('Error sending messages: ', error);
                token_chk = true;
            }
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    });
}




function sendPhotoMessage(sender, urls) {
    s = true;
    var token = "EAAELRvdKfxEBAP3cXdhHbh01sUalCZCGqZBKRL6ZCdPZAE3UjZC95A9LVVmCFhQTaFHALIL87RGOBgKF7SFB6Ti4gjd8fZA2t2QeUlmIIQOS9D2XFmC5aZBM3hxDNRX0WguyW7vfdylnczsWNTxpmZCxpwBos7DnZBpACuokckNT10HyNpkUvq7DM";
    var messageData = { attachment:{
        "type":"image",
        "payload":{
        "url":urls[0], 
        "is_reusable":true
      }
    } };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData
        }
    }, function(error, response, body) {
        if (error) {
            {console.log('Error sending messages: ', error);
               
            }
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
            
        }
        
        urls.shift();
        if (s == false) urls = [];
        if (urls.length >= 1)
        sendPhotoMessage(sender,urls);
        else sendTextMessage(sender,'ok');
        
    });
}



function sendVideo(sender,v) {
    
       var token = "EAAELRvdKfxEBAP3cXdhHbh01sUalCZCGqZBKRL6ZCdPZAE3UjZC95A9LVVmCFhQTaFHALIL87RGOBgKF7SFB6Ti4gjd8fZA2t2QeUlmIIQOS9D2XFmC5aZBM3hxDNRX0WguyW7vfdylnczsWNTxpmZCxpwBos7DnZBpACuokckNT10HyNpkUvq7DM";
    var messageData = { attachment:{
        "type":"video",
        "payload":{
        "url":v.link, 
        "is_reusable":true
      }
    } };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData
        }
    }, function(error, response, body) {
        if (error) {
            {console.log('Error sending messages: ', error);
               
            }
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
            
        }
        
        sendTextMessage(sender,v.link);
        
    });

    
}

function sendfile() {
    
}


function stop() {
    s = false;
}


exports.sendTextMessage = sendTextMessage;
exports.sendPhotoMessage = sendPhotoMessage;
exports.stop = stop;
exports.sendVideo = sendVideo;