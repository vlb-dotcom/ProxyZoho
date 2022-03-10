// require('dotenv').config()
import { } from 'dotenv/config'
// const { response } = require('express')
// const express = require('express')
import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
// const axios = require('axios')
// const needle = require('needle');
import needle from 'needle'
// const url = require('url')
import url from 'url'
import { response } from 'express';
// const res = require('express/lib/response')
import { exit } from 'process'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import apicache from 'apicache'

const app = express()
import path from 'path'

const API_CLIENT_ID = process.env.API_CLIENT_ID
const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET
const API_REFRESH_TOKEN = process.env.API_REFRESH_TOKEN
const API_GRANT_TYPE = process.env.API_CLIENT_GRANT_TYPE
const API_BASE_URL = process.env.API_BASE_URL

// let chatbotId = ""CD-00""
// const API_ZOHO_URL = process.env.API_ZOHO_URL
// const API_ZOHO_URL = "https://creator.zoho.com/api/v2/denniscsanjuan/chatbuddyportal/report/typedb?criteria=(ChatbotID==\"" + chatbotId + "\" %26%26 status==\"Enable\")"
// const API_ZOHO_URL_ITEMS = "https://creator.zoho.com/api/v2/denniscsanjuan/chatbuddyportal/report/typedb?criteria=(ChatbotID==\"" + chatbotId + "\" %26%26 status==\"Enable\" %26%26 type_id.ID==\"" + searchTerm + "\")"

const PORT = process.env.PORT || 5000

app.use(cors())

// app.use(express.static(__dirname + 'public'))

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 100, // maximum amount of requests per 10 mins
})

app.use(limiter)
app.set('trust proxy', 1)

let data = 'refresh_token=1000.7b3877758eee5d19902f66c591ef1563.df24ebfe89662ed0c0a16019cd3a47c2&client_id=1000.09ODQ6CRGHXKVMSA0EHHWG29LJ9HPK&client_secret=6e7e8c803f4ad6b0e089df99ea9336f36a4309b389&grant_type=refresh_token'

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

let cache = apicache.middleware;



//GET Data
app.get("/api/zoho/:id", cache('2 minutes'), async (req, res) => {

    let chatbotId = req.params.id

    console.log(chatbotId)

    const API_ZOHO_URL = "https://creator.zoho.com/api/v2/denniscsanjuan/chatbuddyportal/report/typedb?criteria=(ChatbotID==\"" + chatbotId + "\" %26%26 status==\"Enable\")"
    async function getToken() {
        return axios.post(API_BASE_URL, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                // console.log(response.data)
                try {
                    //fetch data
                    let testToken = response.data.access_token
                    // console.log(testToken)

                    // const zohoData = axios.get(API_ZOHO_URL, { headers: { "Authorization": `Bearer ${testToken}` } })
                    //     .then(resp => {return resp.data})

                    async function status() {
                        try{
                            const url = "https://api.com";
                            let response = await axios.get(API_ZOHO_URL, { headers: { "Authorization": `Bearer ${testToken}` } })
                            return response.data;
                        } catch (error) {
                            console.log(error)
                        }
                    }

                    status().then((data) => { res.status(200).json(data); });

                    // Log the request to the public API
                    // if (process.env.NODE_ENV !== "production") {
                    //     console.log(`REQUEST: ${API_BASE_URL}?${data}`);s
                    // }

                    // res.status(200).json(zohoData);

                } catch (error) {
                    console.log(error)
                }
                //   });
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            });

    }

    getToken()

});

//url: 'https://creator.zoho.com/api/v2/denniscsanjuan/chatbuddyportal/report/itemdbapi?criteria=(ChatbotID=="'+ chatbotId +'" %26%26 status=="Enable" %26%26 type_id.ID==' + searchTerm + ')
//GET Data with Params
app.get("/api/zoho/:id/:searchTerm", cache('2 minutes'), async (req, res) => {

    let chatbotId = req.params.id
    let searchTerm = req.params.searchTerm
    // console.log(chatbotId)
    // console.log(searchTerm)

    const API_ZOHO_URL_ITEMS = 'https://creator.zoho.com/api/v2/denniscsanjuan/chatbuddyportal/report/itemdbapi?criteria=(ChatbotID=="'+ chatbotId +'" %26%26 status=="Enable" %26%26 type_id.ID==' + searchTerm + ')'

    async function getToken() {
        return axios.post(API_BASE_URL, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                // console.log(response.data)
                try {
                    //fetch data
                    let testToken = response.data.access_token
                    // console.log(testToken)

                    // const zohoData = axios.get(API_ZOHO_URL, { headers: { "Authorization": `Bearer ${testToken}` } })
                    //     .then(resp => {return resp.data})

                    async function status() {
                        try{
                            const url = "https://api.com";
                            let response = await axios.get(API_ZOHO_URL_ITEMS, { headers: { "Authorization": `Bearer ${testToken}` } })
                            return response.data;
                        } catch (error) {
                            console.log(error)
                        }
                    }

                    status().then((data) => { res.status(200).json(data); });

                    // Log the request to the public API
                    // if (process.env.NODE_ENV !== "production") {
                    //     console.log(`REQUEST: ${API_BASE_URL}?${data}`);s
                    // }

                    // res.status(200).json(zohoData);

                } catch (error) {
                    console.log(error)
                }
                //   });
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            });

    }

    getToken()

});
