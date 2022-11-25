const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


async function getCategoryFeedList(category_name){
    const response = await fetch(`${backEndBaseUrl}/articles/category/${category_name}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

function range(start, end) {
    if(start === end) return [start];
    return [start,...range(start + 1, end)];
    }

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

window.onload = async function getProfile_API(){
    console.log("카테고리 접속")
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    user_id = User_payload.user_id
    
    category_name = location.search.replace("?category=", "")

    console.log(category_name)
    
    // 좌측 메뉴바 API 연결
    nav_user_info = await getNavUserInfo(user_id)
    nav_category_box = await getNavCategoryBox()

    // 게시글 정보 조회 API
    feed_list = await getCategoryFeedList(category_name)
    console.log(feed_list)



    // 게시글 반복 부분
    var wrap = document.getElementsByClassName('FeedBoxCont')[0];

    feed_list.forEach(feed => {
        console.log(feed)
        console.log(`
            pk : ${feed.pk}
            user : ${feed.user}
            like_count : ${feed.like_count}
            title : ${feed.title}
            category : ${feed.category}
            content : ${feed.content}
            transfer_image : ${feed.transfer_image}
            updated_at : ${feed.updated_at}
        `)
        wrap.innerHTML += `<div class="FeedBox" style="background-color: #fafafa; border: solid 1px #aaaaaa; box-shadow: 1px 1px 1px 1px #aaaaaa;">
                                <div style="width: 300px; min-width: 300px; height: 400px; min-height: 400px;">
                                    <div style="display: flex; flex-direction: row; justify-content: space-between; height: 40px;"><div style="display: flex; flex-direction: row;">
                                        <img src="/static/img/default.png" alt="" style="width: 20px; height: 20px; border-radius: 10px; margin: 10px 5px 0 5px;">
                                        <div onclick="location.href='${frontEndBaseUrl}/users/profile.html?id=${feed.user_id}'" style="font-weight: bold; margin-top: 7px ;">
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
                                        <img onclick="location.href='/articles/detail.html?id=${feed.pk}'" style="cursor: pointer; width: 300px; min-width: 300px; height: 280px; min-height: 280px; object-fit: cover;" src="${backEndBaseUrl}${feed.transfer_image}"></div>
                                    <div style="display: flex; flex-direction: row; justify-content: space-between;"><div style="font-size: 12pt; font-weight: bold; margin: 5px 0 0 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 180px;">${feed.title}</div>
                                    <form action='' method='post'>
                                        <div style="display: flex; flex-direction: row;">
                                            <div style="margin: 10px 5px 0 0; font-size: 10pt;">${feed.like_count}개
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
                                        <div style="text-align: right; margin-right: 10px; font-size: 10pt; color: #aaaaaa;">${timeForToday(feed.updated_at)}</div>
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
        nav_category.innerHTML += `<div onclick="location.href='${frontEndBaseUrl}/articles/category.html?category=${category.category}'" class="category"><a style="color: #cacaca; text-decoration: none;">${category.category} <b style="font-weight: normal; color: #cacaca;">(${category.count})</b></a></div>`
    });
}