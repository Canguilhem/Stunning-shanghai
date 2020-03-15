const mongoose = require('mongoose')
const db = require('./server')
const { Experience } = require('./ExpModel')
const { Post } = require('./PostModel')
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    let response = {}
    const experiences = await Experience.find().sort('-from')
    const posts = await Post.find()
        //   response.msg = "Experiences successfully found",
    response.data = {
        "experiences": experiences,
        "posts": posts
    }
    console.log("found something")
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}