const express = require('express');
const fetch = require('node-fetch');
var cors = require('cors');
const app = express();
app.use(cors())
const port = 3001;

let myHeaders = {
  "authority": "webapi.depop.com",
  "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
  "accept": "application/json, text/plain, */*",
  "sec-ch-ua-mobile": "?0",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
  "content-type": "application/json;charset=UTF-8",
  "origin": "https://www.depop.com",
  "sec-fetch-site": "same-site",
  "sec-fetch-mode": "cors",
  "sec-fetch-dest": "empty",
  "referer": "https://www.depop.com/",
  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  
}

app.get("/signIn/:username/:password",  async (req,res)=>{
  
  var raw = `{"username":"${req.params.username}","password":"${req.params.password}"}`;
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  await fetch("https://webapi.depop.com/api/v1/auth/login/", requestOptions)
    .then(response => response.text())
    .then(result => res.send(result))
    .catch(error => console.log('error', error)); 
})

app.get("/identify/:auth",  async (req,res)=>{
 myHeaders = {
  "Authorization": `Bearer ${req.params.auth}`,
  "sec-ch-ua-mobile": "?0",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
  "Origin": "https://www.depop.com",
  "Sec-Fetch-Site": "same-site",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Dest": "empty",
  
 }

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
// console.log(myHeaders);
await fetch("https://webapi.depop.com/api/v1/auth/identify/", requestOptions)
  .then(response => response.text())
  .then(result => res.send(result))
  .catch(error => console.log('error', error));
})

app.get("/userInfo/:details",  async (req,res)=>{
 var requestOptions = {
   method: 'GET',
   headers: myHeaders,
   redirect: 'follow'
 };
 // console.log(myHeaders);
 await fetch(`https://webapi.depop.com/api/v1/shop/${req.params.details}`, requestOptions)
   .then(response => response.text())
   .then(result => res.send(result))
   .catch(error => console.log('error', error));
})

app.get("/following/:id",  async (req,res)=>{

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
 
  await fetch(`https://webapi.depop.com/api/v1/user/${req.params.id}/following/`, requestOptions)
    .then(response => response.text())
    .then(result => res.send(JSON.parse(result)))
    .catch(error => console.log('error', error));
 })

app.get("/followers/:id",  async (req,res)=>{

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
 
  await fetch(`https://webapi.depop.com/api/v1/user/${req.params.id}/followers/?limit=75`, requestOptions)
    .then(response => response.text())
    .then(result => res.send(JSON.parse(result)))
    .catch(error => console.log('error', error));
 })


app.get("/followUser/:userId/:followUserId/:auth",  async (req,res)=>{
  myHeaders = {
    "Authorization": `Bearer ${req.params.auth}`,
    "sec-ch-ua-mobile": "?0",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    "Origin": "https://www.depop.com",
    "Sec-Fetch-Site": "same-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    
   }
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow'
  };
  
 
  await fetch(`https://api.depop.com/api/v1/users/${req.params.userId}/following/?user_id=${req.params.followUserId}`, requestOptions)
    .then(response => response.text())
    .then(result => res.send(result))
    .catch(error => console.log('error', error));
 })


app.get("/unfollowUser/:userId/:unfollowUserId",  async (req,res)=>{

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  
 
  await fetch(`https://api.depop.com/api/v1/users/12150549/following/?user_id=1978365`, requestOptions)
    .then(response => response.text())
    .then(result => res.send(result))
    .catch(error => console.log('error', error));
 })
 



app.listen(port, () => console.log("you are listening on port " + port))