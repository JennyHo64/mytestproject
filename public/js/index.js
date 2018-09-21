$(document).on('click','#commit',function{
    
    let name = ('#name').val();
    let age = ('#age').val();
    let sex = ('#sex').val();

    let appurl='http://localhost:3000/api';
    let reqInit = {
        "headers": new Headers({'Content-Type': 'application/json'}),//header的H要大寫!!!!!!
        "method" : 'POST',
        "body" : JSON.stringify({
            "name_key" :name,
            "age_key" : age,
            "sex_key" : sex
        })  
    }
    console.log(`name: ${name} age: ${age} sex: ${sex}`);

    return window.fetch(appurl,reqInit).then(function(res){
        console.log(res);  //這裡是後端把結果丟給前端(ex:顯示出剛剛前面輸入的結果)
    })
});