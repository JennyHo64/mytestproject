

//1.新增會員
$(document).on('click','#submit',function(){  //為何這裡要有一個function當參數
    //alert('clicked');
    let name = $('#name').val();
    let age = $('#age').val();
    let sex = $('#sex').val();

    let apiUrl='http://localhost:3000/api/creat';
    let reqInit = {
        "headers": new Headers({'Content-Type': 'application/json'}),//header的H要大寫!!!!!!
        "method" : 'POST',
        "body" : JSON.stringify({
            "name_key" :name,
            "age_key" : age,
            "sex_key" : sex,
        })  
    }
    console.log(`name: ${name} age: ${age} sex: ${sex}`);

    //這裡是後端把結果丟給前端(ex:顯示出剛剛前面輸入的結果)
    return window.fetch(apiUrl,reqInit).then(function(res){
        res.json().then(function(resJson){
            let idInFnc=resJson.id;
            let nameInFnc=resJson.name;
            let ageInFnc=resJson.age;
            let sexInFnc=resJson.sex;

            let trElement=`<tr data-memberId="${idInFnc}">
                                <th id="th-name">${nameInFnc}</th>
                                <th id="th-age">${ageInFnc}</th>
                                <th id="th-sex">${sexInFnc}</th>
                            </tr>`;
            console.log(resJson);
            $('#member-list').append(trElement);

        })
        console.log(res);
    })
});

//2.取得會員資料
$(document).ready(function(){
    getMembers();
});

function getMembers(){
    let apiUrl='http://localhost:3000/api/take'; 
    let reqInit = {
        "headers": new Headers({'Content-Type': 'application/json'}),//header的H要大寫!!!!!!
        "method" : 'GET'
    }

    return window.fetch(apiUrl,reqInit).then(function(res){
        res.json().then(function(resJson){
            let docs =  resJson.docs;
            docs.map(function(doc){
                let id = doc.id;
                let name = doc.name;
                let age = doc.age;
                let sex = doc.sex;
                let trElement =  `<tr data-memberId="${id}">
                                        <th id="th-name">${name}</th>
                                        <th id="th-age">${age}</th>
                                        <th id="th-sex">${sex}</th>
                                    <td>
                                        <button class="btn btn-primary" type="button" id="delete" data-toggle="modal" data-target="#delete-modal">刪除</button>
                                        <button class="btn btn-primary" type="button" id="modify" data-toggle="modal" data-target="#update-modal">修改</button>
                                    </td>
                                </tr>`;
                $('#member-list').append(trElement);
            })
            console.log(resJson);//resJson是處理完的結果
        })
    })
} 

//3.修改
$(document).on('click','#modify',function(){
    let thName = $(this).parent().parent().find('#th-name').text();  //忘記要怎麼看了
    let thAge = $(this).parent().parent().find('#th-age').text();
    let thSex = $(this).parent().parent().find('#th-sex').text();
    
    $('#name_m').val(thName);
    $('#age_m').val(thAge);
    $('#sex_m').val(thSex);

})

//4.刪除
$(document).on('click','#delete',function(){  
    let thName = $(this).parent().parent().find('#th-name').text();
    let thAge = $(this).parent().parent().find('#th-age').text();
    let thSex = $(this).parent().parent().find('#th-sex').text();
  
   
    // $('#th-name').remove();
    // $('#th-age').remove();
    // $('#th-sex').remove();
    // $('#delete').remove();
    // $('#modify').remove();

});
