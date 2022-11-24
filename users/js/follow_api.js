const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"
const TmdbApiImageUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face"
const TmdbApiImageOgUrl = "https://www.themoviedb.org/t/p/original/"

async function handlefollow(){
    

    const response = await fetch(`${backEndBaseUrl}/users/follow/1/`, {
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
}

async function getuserfollow(){
    

    const response = await fetch(`${backEndBaseUrl}/users/follow/`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
        body: JSON.stringify({

        })
    })

    const response_json = await response.json()
    console.log(response_json)


}

window.onload = async function getfollow_API(){
    follow_list = await getuserfollow()

    var user_list =document.getElementById('user_list')
    var wrap = document.getElementsByClassName('follow_box')[0];
    var follow_count = document.getElementById('follow.count')


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
                                    팔로워 ${follow.follower_count}명
                                </p>
                                <button class ="card-link" onclick="handlefollow()">팔로우</button>
                            </div>
                        </div>`;
    });
    user_list.innerText = `${user_list}`
    follow_count.innerText = `팔로우:${follow.follow_count}명` /  `팔로워:${follow.follower_count}명`
}

