const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


// 팔로우 버튼
async function handleFollow(user_id){


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
    

// 로그인 사용자 정보 가져오기
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

// 사용자 상세 정보 가져오기
async function getUserDetail(user_id){
    const response = await fetch(`${backEndBaseUrl}/users/${user_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
    console.log(response_json)
    return response_json
}

// 로그인 사용자 정보 제외 회원 정보 가져오기
async function getUserFollow(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    console.log(User_payload)
    const response = await fetch(`${backEndBaseUrl}/users/all/${User_payload.user_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
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
// 팔로우 페이지 출력
window.onload = async function getFollow_API(){
    follow_list = await getUserFollow()
    me = await getUser()

    
    var wrap = document.getElementsByClassName('follow_box')[0];

            follow_list.forEach(follow => {
                count = 0
                counts = 0
                console.log(`${follow.id}번 유저`)
                me.follow.forEach(fme =>{
                    // console.log(`fme : ${fme}`)
                    // console.log(`follow : ${follow.id}`)
                    if(fme == follow.id){
                        counts =+1
                    }
                })
                console.log(`conunt : ${counts}`)
                    if(counts == 1){
                        console.log(`${follow.id}번 유저`)
                        console.log("팔로우 중 입니다.")
                        wrap.innerHTML += `<div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title" id="name">${follow.name}</h5>
                                                    <h6 class="card-subtitle mb-2 text-muted" id="email">${follow.email}</h6>
                                                    <p class="card-text" id="follow.count">
                                                        팔로잉 ${follow.follow_count}명 / 팔로워 ${follow.followee_count}명
                                                    </p>
                                                    <div id="toggle">
                                                    <button class ="card-link" onclick="handleFollow(${follow.id})">팔로우 취소</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr>`
                    }
                    else{
                        console.log(`${follow.id}번 유저`)
                        console.log("팔로우 중이 아닙니다.")
                        wrap.innerHTML += `<div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title" id="name">${follow.name}</h5>
                                                    <h6 class="card-subtitle mb-2 text-muted" id="email">${follow.email}</h6>
                                                    <p class="card-text" id="follow.count">
                                                        팔로잉 ${follow.follow_count}명 / 팔로워 ${follow.followee_count}명
                                                    </p>
                                                    <div id="toggle">
                                                    <button class ="card-link" onclick="handleFollow(${follow.id})">팔로우</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr>`
                    }
                
        
            })
        }

