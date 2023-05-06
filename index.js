const { Telegraf } = require("telegraf"); 
require("dotenv").config(); // retrieving env vars (including the token)

const token = process.env.TOKEN; // Importing the token api from .env
const bot = new Telegraf(token); // Create a bot instance with the token provided from telegram

// when the clients sends /start command, reply with the follwing:
bot.command("/start", (context)=>{
    context.reply("Welcome to my bot")
})

// when the client sends a text, echo (reply) with the same text
bot.on("message", (context)=>{
    const message = context.update.message.text;
    context.reply(message)
})

exports.bot = bot; // Export the bot so we can parse the request to it and handles it.