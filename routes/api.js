var express = require('express');
var router = express.Router();
var Cloudant = require('@cloudant/cloudant');
var username = '290882c8-24eb-4919-8987-f6f8b8fdfab8-bluemix';
var password='bd7d946c9b83b6663b65ca6ab829345c272961c5beec2869d37dd6803469bf3f';

//1.新增會員
router.post('/creat',function(req,res){
    let name=req.body.name_key;
    let age=req.body.age_key;
    let sex=req.body.sex_key;
    let pushData={
        "name":name,
        "age":age,
        "sex":sex,
        "timeStemp":Date.now()
    }
    Cloudant({account:username, password:password}, function(err, cloudant) {
        if (err) {
          return console.log('Failed to initialize Cloudant: ' + err.message);
        }
      
        var db = cloudant.db.use("mytestdb");
        db.insert(pushData, function(err, data) {
            if (err) {
                return console.log('Failed to initialize Cloudant: ' + err.message);
              }
            let id=data.id;
            pushData.id=id;
            res.status(200).json(pushData);
        });
      });
});

//2.取得會員資料

router.get('/take',function(req,res){
    Cloudant({account:username, password:password}, function(err, cloudant) {
        if (err) {
          return console.log('Failed to initialize Cloudant: ' + err.message);
        }
    var db=cloudant.db.use("mytestdb");
        let quary={
            "selector": {
                "_id": {
                   "$gt": "0"
                }
             },
             //"sort": [ {"timeStemp": "asc" }] //cloudant timeStemp index不能新增
                
            }
    db.find(quary,function(err,data){
        if (err) {
            return console.log('Failed to find data in Cloudant: ' + err.message);
          }
        console.log(data);
        res.status(200).json(data);
    })
        
    });
});

//4.刪除會員資料


module.exports = router; //後端城市寫完都需要加這一行供其他城市使用