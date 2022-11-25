const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"

async function updateNickname(){
    
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    
    const user_name = document.getElementById("username").value
    const nickname = document.getElementById("nickname").value
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/`, {
        headers: {
        'content-type': 'application/json',
        "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({
            "name":user_name,
            "nickname":nickname,
        
    
        })

    })
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
            window.location.replace(`${frontEndBaseUrl}/`);
    }else {
        alert(response_json["detail"])
        
    }
    

        
        return response_json
        }