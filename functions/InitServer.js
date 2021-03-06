const mongoose = require('mongoose')
const db = require('./server')
const { Experience } = require('./ExpModel')
const { Post } = require('./PostModel')
const { Formation } = require('./FormModel')
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    let response = {}
    const experiences = await Experience.find().sort('-from')
    const formations = await Formation.find().sort('-from')
    const posts = await Post.find()
    response.data = {
        experiences,
        posts,
        formations
    }
    // response.headers = {
    //   'Access-Control-Allow-Origin': "*"
    // }
    console.log("INIT_SERVER_FUNC: ", response)
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: `Error from initServer function : ${err.message}`})
    }
  }
}