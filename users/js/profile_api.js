const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"



async function profileUpdate(){
    
    let User_payload = JSON.parse(localStorage.getItem('payload'))

    
    profile_Image = document.getElementById("profile_Image").files[0];
    
    const formData = new FormData();
    
    
    formData.append("profile_image", profile_Image);
    console.log(formData)

    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/`, {
        headers: {
        "Authorization":"Bearer " + localStorage.getItem("access"),
        },
        method: 'PUT',
        body: formData,

    });
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
            // window.location.replace(`${frontEndBaseUrl}/`);
    }else {
        alert("실패했습니다")
        
    }
    

        
        return response_json
        }
