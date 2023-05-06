require("dotenv").config(); // Importing env variables (Including TOKEN)

const { bot } = require("../../index");

const express = require("express"); // Prettier way to handle request
const cors = require("cors"); // Allow different origin (servers) to reach our api
const serverless = require("serverless-http"); // To handle netlify functions by express

// initiating
const app = express();
const router = express.Router(); // create a Router to be parsed under our functions url

const token = process.env.TOKEN; // Importing the token api from .env

app.use(cors()) // Allow different origins
app.use(express.json()) // Parse requests to be in Json foramt (Ojbect format)

/**
 * Listening only to requests on the url that ends only with our api token.
 * Since only we know the token, so only telegram who can send us msgs, not unauthorized domains.
 * Now this helps in protection.
 */
router.post(`/${token}`, async (req, res)=>{
    try{
        const message = req.body ;
        await bot.handleUpdate(message) // we even used await so we can wait for it and respond to the server in the next line. 
        res.status(200).json({body: ""}) // must return empty body, so telegram knows that we received the msg and stops to send it again.
    }catch(err){
        res.status(409).json({body:"Found an error, try again later."})
    }
})
router.get("*", (req, res)=>{res.status(200),json({body:"hi"})})

app.use("/.netlify/functions/bot-webhook", router) // parsing the router under the functions url
exports.handler = serverless(app) // Using serverless, we can forward the request from netlify functions to be handled by express.