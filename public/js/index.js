//1.新增會員
$(document).on('click',"#submit",function(){
    let name = $('#name').val();
    let age = $('#age').val();
    let gender = $('#gender').val();

    let apiUrl = 'http://localhost:3000/api/insert?n=123';
    let reqInit={
        "header": new Headers({'Content-Type': 'application/json'}),
        "method": 'POST',
        "body":JSON.stringify({
            "name_key": name,
            "age_key": age,
            "gender_key": gender
        })
    }
    console.log(`name:${name} age:${age} gender:${gender}`);//模板字串`

    return window.fetch(apiUrl,reqInit).then(function(res){
        res.json().then(function(a) {
            console.log(a);
        })
    })


});