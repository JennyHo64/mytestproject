var express = require('express');
var router = express.Router();
var Cloudant = require('@cloudant/cloudant');
var username = '290882c8-24eb-4919-8987-f6f8b8fdfab8-bluemix';
var password='bd7d946c9b83b6663b65ca6ab829345c272961c5beec2869d37dd6803469bf3f';


router.post('/insert', function(req,res){
    let n = req.query;
    let name = req.body.name_key;
    let age = req.body.age_key;
    let gender = req.body.gender_key;
    let pushData = {
        "name": name,
        "age": age,
        "gender": gender,
        "timeStemp":Date.now()
    }
    Cloudant({account:username, password:password},function(err,Cloudant){
        if(err){
            console.log("Failed to initialize Cloudant: " + Cloudant);
        }
        var db=Cloudant.db.use('mytestdb');

        db.insert(pushData,function(err,data){
            if (err) {
                return console.log('Failed to insert: ' + err.message);
            }
            let id=data.id;
            pushData.id=id;
            res.status(200).json(pushData);
        })
    })
});


module.exports = router; //後端城市寫完都需要加這一行供其他城市使用