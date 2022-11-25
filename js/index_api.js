const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


async function getIndexFeedList(){
    const response = await fetch(`${backEndBaseUrl}/articles/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

window.onload = async function getIndex_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    feed_list = await getIndexFeedList()
    nav_user_info = await getNavUserInfo(User_payload.user_id)
    nav_category_box = await getNavCategoryBox()
    console.log(nav_category_box)


    // 게시글 반복 부분
    var wrap = document.getElementsByClassName('FeedBoxCont')[0];

    feed_list.forEach(feed => {
        wrap.innerHTML += `<div class="FeedBox" style="background-color: #fafafa; border: solid 1px #aaaaaa; box-shadow: 1px 1px 1px 1px #aaaaaa;">
                                <div style="width: 300px; min-width: 300px; height: 400px; min-height: 400px;">
                                    <div style="display: flex; flex-direction: row; justify-content: space-between; height: 40px;"><div style="display: flex; flex-direction: row;">
                                        <img src="/static/img/default.png" alt="" style="width: 20px; height: 20px; border-radius: 10px; margin: 10px 5px 0 5px;">
                                        <div style="font-weight: bold; margin-top: 7px ;">
                                        ${feed.user}
                                    </div>
                                            <a href= "" style="border: solid 1px #aaaaaa; border-radius: 4px; height: 25px; margin: 5px 0 0 10px; padding-left: 5px; padding-right: 5px; font-size: 11pt; text-decoration: none; color: #fafafa;; background-color: #aaaaaa;">팔로잉</a>
                                            <!-- <a href= "" style="border: solid 1px #aaaaaa; border-radius: 4px; height: 25px; margin: 5px 0 0 10px; padding-left: 5px; padding-right: 5px; font-size: 11pt; text-decoration: none; color: #aaaaaa;; background-color: #fafafa;">팔로우</a> -->
                                </div>
                                <div class="dropdown">
                                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false" style="border: none; background-color: #fafafa;">
                                        <div style="font-weight: bold; margin: 3px 10px 0 0;">...</div>
                                    </button>
                                    <!-- <ul class="dropdown-menu" style="background-color: #fafafa; border: solid 1px #aaaaaa; box-shadow: 1px 1px 1px 1px #aaaaaa;">
                                        <li><a style="text-decoration: none; color: black; margin-left: 30px;" href="{% url 'contents:post_update' feed.id %}">수정</a></li>
                                        <li><a style="text-decoration: none; color: red; margin-left: 30px;" href="{% url 'contents:post_delete' feed.id %}">삭제</a></li>
                                    </ul> -->
                                </div>
                                </div>

                                    <div style="width: 300px; min-width: 300px; height: 280px; min-height: 280px;">
                                        <img onclick="location.href='/articles/detail.html?id=${feed.id}'" style="cursor: pointer; width: 300px; min-width: 300px; height: 280px; min-height: 280px; object-fit: cover;" src="${backEndBaseUrl}${feed.transfer_image}"></div>
                                    <div style="display: flex; flex-direction: row; justify-content: space-between;"><div style="font-size: 12pt; font-weight: bold; margin: 5px 0 0 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 180px;">${feed.title}</div>
                                    <form action='' method='post'>
                                        <div style="display: flex; flex-direction: row;">
                                            <div style="margin: 10px 5px 0 0; font-size: 10pt;">좋아요n개
                                            </div>
                                            <!--post.like_authors.all에 user가 있다면 아래 if문 돌기-->
                                            <button style="border: none; background: none; margin-top: 3px;"><img onclick="" style="width: 20px; height: 20px; margin: 5px 10px 0 0;" src="/static/icon/heart_bk.png" /></button>
                                            <!-- <button style="border: none; background: none; margin-top: 3px;"><img onclick="contents:post_likes" style="width: 20px; height: 20px; margin: 5px 10px 0 0;" src="/static/icon/heart.png" /></button> -->
                                        </div>
                                    </form>
                                </div>
                                    <div style="font-size: 10pt; font-weight: normal; margin: 0 0 0 10px; color: #aaaaaa;">${feed.category}</div>
                                    <div style="display: flex; flex-direction: row; justify-content: space-between;">
                                        <div style="display: flex; flex-direction: row; margin: 3px 0 0 8px;">
                                        <span style="height: 18px; background-color: #aaaaaa; color: #fafafa; border-radius: 5px; font-size: 10pt; margin-left: 3px; padding-left: 3px; padding-right: 3px;">
                                            #태그
                                        </span>
                                        </a>
                                            <br>
                                        </div>
                                        <div style="text-align: right; margin-right: 10px; font-size: 10pt; color: #aaaaaa;">n분전</div>
                                    </div>
                                </div>
                            </div>`

        
    });

    // nav 부분
    // nav 상단 유저 박스 부분
    var nav_nickname = document.getElementsByClassName('NavUserInfoBoxNickname')[0];
    var nav_name = document.getElementsByClassName('NavUserInfoBoxName')[0];
    var nav_email = document.getElementsByClassName('NavUserInfoBoxEmail')[0];
    var nav_follow = document.getElementsByClassName('NavUserInfoBoxFollow')[0];
    var nav_login = document.getElementsByClassName('NavUserInfoBoxLogin')[0];
    last_login_time = timeForToday(nav_user_info.last_login)

    nav_nickname.innerText = `${nav_user_info.nickname}`
    nav_name.innerText = `${nav_user_info.name}`
    nav_email.innerText = `${nav_user_info.email}`
    nav_follow.innerText = `팔로잉 ${nav_user_info.follow_count} 명  |  팔로워 ${nav_user_info.followee_count} 명`
    nav_login.innerText = `현재 접속 시간 : ${last_login_time}`


    // nav 하단 카테고리 부분
    var nav_category = document.getElementsByClassName('NavCategory')[0];
    

    nav_category_box.forEach(category => {
        nav_category.innerHTML += `<div class="category"><a href='' style="color: #cacaca; text-decoration: none;">${category.category} <b style="font-weight: normal; color: #cacaca;">(${category.count})</b></a></div>`
    });
}