const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


async function getIndexFeedDetail(id){

    const response = await fetch(`${backEndBaseUrl}/articles/${id}/`,{
    headers: {
    'content-type': 'application/json',
    "Authorization":"Bearer " + localStorage.getItem("access")
    },
    method:'GET',
    })
    
    response_json = await response.json()
    return response_json
    }


//  게시글 수정
async function feedUpdate() {

    const feed_id = location.search.replace("?id=", "")
    

    const title= document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const original_image = document.getElementById("original_image").files[0];
    const formData = new FormData();
    console.log(title,content,original_image)
    
    formData.append("title", title);
    formData.append("content", content);
    formData.append("original_image", original_image);
    
    const response = await fetch(`${backEndBaseUrl}/articles/${feed_id}/`, {
        headers: {
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body:formData,    
        
    })
    const response_json = await response.json()
    if (response.status ==200){
        alert(response_json["message"])
        window.location.replace(`${frontEndBaseUrl}/articles/detail.html?id=${feed_id}`);
    }
}



