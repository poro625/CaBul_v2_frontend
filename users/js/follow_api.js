const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"
const TmdbApiImageUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face"
const TmdbApiImageOgUrl = "https://www.themoviedb.org/t/p/original/"


async function handleFollow(user_id){
    console.log(user_id)
    

    const response = await fetch(`${backEndBaseUrl}/users/follow/${user_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify({

        })
    })
    const response_json = await response.json()
    console.log(response_json)
    window.location.reload();
    return response_json
    
}

async function getUser(){

    
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
    return response_json


}

async function getUserFollow(){
    

    const response = await fetch(`${backEndBaseUrl}/users/all/1/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()

    return response_json


}

window.onload = async function getFollow_API(){
    follow_list = await getUserFollow()
    console.log(follow_list)
    me_obj = await getUser()

    var user_list =document.getElementsByClassName('user_box')[0];
    var wrap = document.getElementsByClassName('follow_box')[0];


    follow_list.forEach(follow => {
        wrap.innerHTML += `<div class="card">
                            <div class="card-body">
                                <h5 class="card-title" id="name">${follow.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted" id="email">${follow.email}</h6>
                                <p class="card-text">
                                </p>
                                <p class="card-text" id="follow.count">
                                    팔로잉 ${follow.follow_count}명
                                </p>
                                <p id = "follower.count">
                                    팔로워 ${follow.followee_count}명
                                </p>
                                <button class ="card-link" onclick="handleFollow(${follow.id})">팔로우</button>
                            </div>
                        </div>`
    });
    user_list.innerText = `${me_obj.name}`
}

