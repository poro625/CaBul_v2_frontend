const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"



function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}


async function getNavUserInfo(user_id){
    const response = await fetch(`${backEndBaseUrl}/users/${user_id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    console.log(response_json)
    return response_json
}

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


// 팔로우 페이지 출력
window.onload = async function getFollow_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href="http://127.0.0.1:5500/users/login.html";
        
        
    } else {
        follow_list = await getUserFollow()
        me = await getUser()
        nav_user_info = await getNavUserInfo(User_payload.user_id)
        nav_user_info = nav_user_info.users

        
        var wrap = document.getElementsByClassName('follow_box')[0];
        var nav_nickname = document.getElementsByClassName('NavUserInfoBoxNickname')[0];
        var nav_name = document.getElementsByClassName('NavUserInfoBoxName')[0];
        var nav_name2 = document.getElementsByName('NavUserInfoBoxName2')[0];
        var nav_email = document.getElementsByClassName('NavUserInfoBoxEmail')[0];
        var nav_follow = document.getElementsByClassName('NavUserInfoBoxFollow')[0];
        var nav_login = document.getElementsByClassName('NavUserInfoBoxLogin')[0];
        last_login_time = timeForToday(nav_user_info.last_login)

        nav_nickname.innerText = `${nav_user_info.nickname}`
        nav_name.innerText = `${nav_user_info.name}`
        nav_name2.innerText = `${nav_user_info.name}님 반갑습니다!`
        nav_email.innerText = `${nav_user_info.email}`
        nav_follow.innerText = `팔로잉 ${nav_user_info.follow_count} 명  |  팔로워 ${nav_user_info.followee_count} 명`
        nav_login.innerText = `현재 접속 시간 : ${last_login_time}`

        follow_list.forEach(follow => {  
            counts = 0
            console.log(`${follow.id}번 유저`)
            console.log(me)
            me.users.follow.forEach(fme =>{
                console.log(`fme : ${fme}`)
                console.log(`follow : ${follow.id}`)
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
}

