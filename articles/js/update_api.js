// const frontEndBaseUrl = "http://127.0.0.1:5500"
// const backEndBaseUrl = "http://127.0.0.1:8000"



// async function feedUpdate(title, content) {
//     feed_id =location.search.replace("?id=","")
    
//     let User_payload = JSON.parse(localStorage.getItem('payload'))
//     console.log("hi")
//     if (User_payload === undefined ||  User_payload === null){
//         location.href="http://127.0.0.1:5500/users/login.html";
        

//     } else {
//         const articleData = {
//         title: title,
//         content: content,
//         };
//         console.log(feed_id);
//         const response = await fetch(`${backEndBaseUrl}/articles/${feed_id}/`, {
//         headers: {
//             "content-type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("access"),
//         },
//         method: "PUT",
//         body: JSON.stringify(articleData),
//         });

//         if (response.status == 200) {
//         response_json = await response.json();
//         return response_json;
//         } else {
//         alert(response.status);
//         }
//     }
// }
// console.log("gi")

// async function feedUpdated() {
    
//     const articleData = {
//         title: title,
//         content: content,
        
//     };
    
//     const response = await fetch(`${backEndBaseUrl}/articles/${feed_id}`, {
//         headers: {
//             Authorization: localStorage.getItem("token"),
//         },
//         method: "PUT",
//         body: JSON.stringify(articleData),
//     });
    
//     if (response.status == 200) {
//         response_json = await response.json();
//         return response_json;
//     } else {
//         alert(response.status);
//     }
// }




async function editArticle() {
    const feed_id = localStorage.getItem('pk');


    const response = await fetch(`${backEndBaseUrl}/articles/${feed_id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json', //데이터 타입은 JSON//
            'Authorization': "Bearer " + localStorage.getItem("access") //로그인시 로컬 저장소에 저장되는 토큰 가져오기//
        },
        body: JSON.stringify({
            "title":title,
            "content":content,
        
    
        })
    })
    if (response.status == 200) {
        response_json = await response.json();
        return response_json;
    } else {
        alert(response.status);
    }
    window.location.replace('${backEndBaseUrl}') //글 등록이 되고 리스트 화면으로 링크//
}
