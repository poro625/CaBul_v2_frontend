const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


async function getIndexFeedList(page_id){
    const response = await fetch(`${backEndBaseUrl}/articles/?page=${page_id}`,{
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

window.onload = async function getIndex_API(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))

    
    nav_user_info = await getNavUserInfo(User_payload.user_id)
    nav_category_box = await getNavCategoryBox()
    const page_number = location.search
    if(page_number == ''){
        page_id = 1
    }
    else {
        page_id = page_number.replace("?page=", "")
    }
    // console.log(`page_id : ${page_id}`)
    feed_list = await getIndexFeedList(page_id)
    feed_list = feed_list.articles
    // console.log(feed_list)
    // console.log(`page_id : ${page_id}`)
    // console.log(`count : ${feed_list.count}`)
    // console.log(`next : ${feed_list.next}`)
    // console.log(`prev : ${feed_list.previous}`)

    page_count = Math.ceil(feed_list.count/12)
    page_number_button_list = range(1, page_count)
    // console.log(page_number_button)

    prev_button = null
    next_button = null

    if(feed_list.previous != null){
    prev_button = feed_list.previous.replace(`${backEndBaseUrl}/articles/`, "")
    }
    if(feed_list.next != null){
    next_button = feed_list.next.replace(`${backEndBaseUrl}/articles/`, "")
    }

    // 페이지네이션 버튼 < prev / 반복문 / next >
    var page_prev_button = document.getElementsByClassName('PagePrevButton')[0];
    var page_next_button = document.getElementsByClassName('PageNextButton')[0];
    page_prev_button.setAttribute("href", `${frontEndBaseUrl}/${prev_button}`) 
    page_next_button.setAttribute("href", `${frontEndBaseUrl}/${next_button}`)
    page_prev_button.innerText = `< Prev`
    page_next_button.innerText = `Next >`

    // 반복문
    var page_number_button = document.getElementsByClassName('PageNumberButton')[0];
    page_number_button_list.forEach(page_number => {
        if(page_id == page_number){
        page_number_button.innerHTML += `<li style="margin:3px;"><a style="text-decoration:none; color: red;" href="?page=${page_number}">${page_number}</a></li>`
        }
        else{
            page_number_button.innerHTML += `<li style="margin:3px;"><a style="text-decoration:none; color: black;" href="?page=${page_number}">${page_number}</a></li>`
        }
    })



        // 게시글 반복 부분
        var wrap = document.getElementsByClassName('FeedBoxCont')[0];


    feed_list.results.forEach(feed => {
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
            user_id : ${feed.user_id}
        `)
        wrap.innerHTML += `<div class="FeedBox" style="background-color: #fafafa; border: solid 1px #aaaaaa; box-shadow: 1px 1px 1px 1px #aaaaaa;">
                                <div style="width: 300px; min-width: 300px; height: 400px; min-height: 400px;">
                                    <div style="display: flex; flex-direction: row; justify-content: space-between; height: 40px;"><div style="display: flex; flex-direction: row;">
                                        <img src="/static/img/default.png" alt="" style="width: 20px; height: 20px; border-radius: 10px; margin: 10px 5px 0 5px;">
                                        <div onclick="location.href='${frontEndBaseUrl}/users/profile.html?id=${feed.user_id}'" style="font-weight: bold; margin-top: 7px ;">
                                        ${feed.user}

                                    </div>


                                    <div style="width: 300px; min-width: 300px; height: 280px; min-height: 280px;">
                                        <img onclick="location.href='/articles/detail.html?id=${feed.pk}'" style="cursor: pointer; width: 300px; min-width: 300px; height: 280px; min-height: 280px; object-fit: cover;" src="${feed.transfer_image}"></div>
                                    <div style="display: flex; flex-direction: row; justify-content: space-between;"><div style="font-size: 12pt; font-weight: bold; margin: 5px 0 0 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 180px;">${feed.title}</div>
                                    <form action='' method='post'>
                                        <div style="display: flex; flex-direction: row;">
                                            <div style="margin: 10px 5px 0 0; font-size: 10pt;">${feed.like_count}개

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

                                        <div style="text-align: right; margin-right: 10px; font-size: 10pt; color: #aaaaaa;">${timeForToday(feed.updated_at)}</div>


            
        });


    console.log(nav_user_info)
    // nav 부분
    // nav 상단 유저 박스 부분
    var nav_nickname = document.getElementsByClassName('NavUserInfoBoxNickname')[0];
    var nav_name = document.getElementsByClassName('NavUserInfoBoxName')[0];
    var nav_email = document.getElementsByClassName('NavUserInfoBoxEmail')[0];
    var nav_follow = document.getElementsByClassName('NavUserInfoBoxFollow')[0];
    var nav_login = document.getElementsByClassName('NavUserInfoBoxLogin')[0];
    last_login_time = timeForToday(nav_user_info.last_login)
    // var nav_profile_link = document.getElementsByClassName('NavUserInfoBoxProfileLink')[0];

    nav_nickname.innerText = `${nav_user_info.nickname}`
    nav_name.innerText = `${nav_user_info.name}`
    nav_email.innerText = `${nav_user_info.email}`
    nav_follow.innerText = `팔로잉 ${nav_user_info.follow_count} 명  |  팔로워 ${nav_user_info.followee_count} 명`
    nav_login.innerText = `현재 접속 시간 : ${last_login_time}`
    // nav_profile_link.setAttribute("onclick", `${frontEndBaseUrl}/users/profile.html?id=${nav_user_info.id}`)


        // nav 하단 카테고리 부분
        var nav_category = document.getElementsByClassName('NavCategory')[0];
        


    nav_category_box.forEach(category => {
        nav_category.innerHTML += `<div onclick="location.href='${frontEndBaseUrl}/articles/category.html?category=${category.category}'" class="category"><a style="color: #cacaca; text-decoration: none;">${category.category} <b style="font-weight: normal; color: #cacaca;">(${category.count})</b></a></div>`
    });

}