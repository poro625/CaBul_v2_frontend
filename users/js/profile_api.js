const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"



async function profileUpdate(){
    
    let User_payload = JSON.parse(localStorage.getItem('payload'))

    
    image = document.getElementById("image").files[0];
    
    
    const formData = new FormData();
    
    
    formData.append("profile_image", image);

    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/`, {
        headers: {
        'content-type': 'application/json',
        "Authorization":"Bearer " + localStorage.getItem("access"),
        },
        method: 'PUT',
        body: formData

    })
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
            // window.location.replace(`${frontEndBaseUrl}/`);
    }else {
        alert("실패했습니다")
        
    }
    

        
        return response_json
        }
