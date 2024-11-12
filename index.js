import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "PavaniGudupu";
const yourPassword = "Pegasus@12523";
const yourAPIKey = "380655d5-1ba2-498e-8d68-129909a02117";
const yourBearerToken = "b9ab0f84-82ff-448f-abb9-bea7e5c4084e";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});


  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.


app.get("/noAuth", async (req, res) => {
try {
  const response = await axios.get(API_URL + "/random");
  const request = response.data;
  console.log(request);
  res.render("index.ejs", {content: JSON.stringify(request)});
} catch (error) {
  console.log(error.message);
}
});


  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
const config = {
  auth: {
  username: yourUsername,
  password: yourPassword,
  },
};

app.get("/basicAuth", async(req, res) => {
try {
  const response = await axios.get(API_URL + "/all?page=1", config);
  const request = response.data;
  console.log(request);
  res.render("index.ejs", {content: JSON.stringify(request)});
  
} catch (error) {
  console.log(error.message);
}
});



  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

app.get("/apiKey", async (req, res) => {
try{
  const response = await axios.get(API_URL + `/filter?score=7&apiKey=${yourAPIKey}`);
  const request = response.data;
  console.log(request);
  res.render("index.ejs", {content: JSON.stringify(request)});
} catch (error) {
  console.log(error.message);
}
});


  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */

  const bearerconfig = {
    headers: {
       Authorization: `Bearer ${yourBearerToken}` 
      },
  };
  
  app.get("/bearerToken", async (req, res) => {
    try {
      const result = await axios.get(API_URL + "/secrets/2", bearerconfig);
      res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.status(404).send(error.message);
    }
  });
  


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
