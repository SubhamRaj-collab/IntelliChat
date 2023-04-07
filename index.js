const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({
    organization: "org-d9ccZhgRi3SNDxsQfvGUPxX3",
    apiKey: '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'
    // apiKey: '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'
});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/', async (req, res) => {

    const {message, currentModel} = req.body;
    console.log(message, "message");
    console.log(currentModel, "currentModel");
    const response = await openai.createCompletion({
        model: `${currentModel}`,  //"text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });

      // console.log(response.data.choices[0].text)
      res.json({
        // data: response.data,
        message: response.data.choices[0].text
      })
});

app.get('/models', async (req, res) => {

  const response = await openai.listEngines();
  console.log(response.data.data)
  res.json({
    models: response.data.data
  })
  
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});