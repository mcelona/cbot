var Botkit = require("botkit");
var beepboop = require("beepboop-botkit");

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  retry: Infinity,
  debug: false
});

if (token) {
  console.log("Starting in single-team mode")
  controller.spawn({
    token: token
  }).startRTM(function(err,bot,payload) {
    if (err) {
      throw new Error(err);
    }
  });
} else {
  console.log("Starting in Beep Boop multi-team mode")
  require('beepboop-botkit').start(controller, { debug: true })
}


controller.on("direct_message", function(bot, message) {

  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 ) {

    var reply = "Hello"
    bot.reply(message, reply);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {

    var reply = "You're welcome"
    bot.reply(message, reply);

  } else if ( message.text.indexOf("help") > -1 ) {

    var reply = "Looks like you need help"
    bot.reply(message, reply);

  } else {
    
    var reply = "What"
    bot.reply(message, reply);

  }

})

controller.on("bot_channel_join", function(bot, message) {
  var intro = "I have arrived!"
  bot.reply(message, intro);
})


controller.on("direct_mention", function(bot, message) {
  console.log( message );
  
  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 ) {

    var intro = "Hi <@"+message.user+">, I'm here to talk to you v1 +message.text+";
    bot.reply(message, intro);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {

    var reply = "Don't worry about it"
    bot.reply(message, reply);

  } else if ( message.text.indexOf("help") > -1 ) {

    var reply = "I'm happy to help you"
    bot.reply(message, reply);
    
  } else if ( message.text.indexOf("what do you think of this crap") > -1 ) {

    var reply = "seems very carb heavy"
    bot.reply(message, reply);

  } else {

     var reply = "What?"
     bot.reply(message, reply);

  }
})

controller.on("mention", function(bot, message) {
  console.log( message );

  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 ) {

    var intro = "Hi <@"+message.user+">, I'm here to talk to you";
    bot.reply(message, intro);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {

    var reply = "Don't worry about it"
    bot.reply(message, reply);

  } else {
    var reply = "Don't worry about it version 1"
    bot.reply(message, reply);
  }
})

controller.on("user_channel_join", function(bot, message) {
  var intro = "Welcome <@"+message.user+">!";
  bot.reply(message, intro);
})

controller.on("user_group_join", function(bot, message) {
  var intro = "Welcome <@"+message.user+">!";
  bot.reply(message, intro);
})

controller.hears(["topgun"], ["ambient"],function(bot,message) {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face',
  },function(err) {
    if (err) { console.log(err) }
    //bot.reply(message,'I heard you loud and clear boss.');
  });
});