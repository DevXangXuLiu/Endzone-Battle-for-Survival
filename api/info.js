const express = require('express');
const fs = require('fs');
const router = express.Router();
const configManager = require('./ConfigManager');

router.route('/getInfo').get(getInfo);
router.route('/getTime').post(getTime);
router.route('/signIn').post(signIn);
router.route('/signUp').post(signUp);

function getInfo(req, res) {
    console.log('Request from client!');
    res.send('Hello TAI');
}

function getTime(req, res) {
    console.log('Request from client!');
    let serverTime = new Date().toISOString();
    res.send('Time: ' + serverTime.toString());
}

function signIn(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let jwt = req.header('jwt');

    let data = {
        username: username,
        password: password,
        jwt: jwt
    }
    
    let configUser = configManager.configUser.record.find(x=> x.username == username);
    if(configUser != undefined)
    {
        if(configUser.username === username && configUser.password == password)
        {
            res.send('Sign in is successful!');
        }
        else
        {
            res.send('password may be wrong!');
        }
    }
    else
    {
        res.send('Account is wrong!');
    }
}

function signUp(req, res) {
    let username = req.body['username'];
    let password = req.body['password'];
    let jwt = req.header('jwt');
    res.setHeader('Content-Type', 'application/json');

    var data = {
        username: username,
        password: password
    }

    let configUser = configManager.configUser.record.find(x=> x.username == username);
    if(configUser == undefined)
    {
        configManager.configUser.record.push(data);
        const dataJson = JSON.stringify(configManager.configUser);
        fs.writeFile('./Config/ConfigUser.json', dataJson, 'utf8', (err)=> {
            if(err) {
                console.log('Error writing file: ' + err);
            }
            else {
                res.send('Sign up is successful!');
            }
        });
        
    }
    else
    {
        res.send('Account is existed!');
    }
}

module.exports = router;