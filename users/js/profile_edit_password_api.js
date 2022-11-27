const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"

// 비밀번호 변경
async function updateUser(){
    
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    
    const new_pass = document.getElementById("new_pass").value
    const new_pass2 = document.getElementById("new_pass2").value
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/passwordchange/`, {
        headers: {
        'content-type': 'application/json',
        "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({
            "password":new_pass,
            "password2":new_pass2,
        
    
        })

    })
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
            window.location.replace(`${frontEndBaseUrl}/`);
    }else {
        alert(response_json["password"])
        
    }
    

        
        return response_json
        }



