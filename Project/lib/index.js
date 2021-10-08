const express = require('express')
const app = express()

const config = require('./config')
const {data} = require('./db')


app.get('/', (req, res) => {
  // Project homepage
  // Return some HTML content inside `body` with:
  // * The page title
  // * A link to the `/channels` page
  res.render('homepage.ejs');
  // Don't bother with the `head` tag
})

app.get('/channels', (req, res) => {
  // List of channels
  // Return some HTML content inside `body` with:
  // * The page title
  // * A list of every channel with a link to the channel page
  // Notes:
  // * Channels are identified by channel ids.
  // * Make sure to find the appropriate HTML tag to respect the HTML semantic
  //   of a list
})

app.get('/channel/:id', (req, res) => {
  // Channel information
  // Print the channel title
  const channelId = req.params.id;
  const channel = data.channels.find( (channel) => channel.id == channelId);

  if(channel){
    es.render('channel.ejs', {channel: channel});
  }else{
    res.error('Invalid channel');
  }
})

app.listen(config.port, () => {   
  console.log(`Chat is waiting for you at http://localhost:${config.port}`)
})

app.set('view', __dirname + "/views")
app.set('view enfine', 'ejs')
