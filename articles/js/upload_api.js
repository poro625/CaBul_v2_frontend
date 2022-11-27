const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"

$(document).ready(function(){

    // 입력란에 입력을 하면 입력내용에 내용이 출력

    // 1. #data 공간에서 keyup이라는 이벤트가 발생했을 때

    $("#title").keyup(function(){

        // 2. #out 공간에 #data의 내용이 출력된다.

        $("#out_title").text($("#title").val());

        // #out의 위치에 text로 데이터를 받는다.(setter)

        // 들어가는 데이터는 #data의 값(.val())이다. (getter)

        // 메서드 괄호 안에 아무것도 없으면 getter, 파라미터가 있으면 setter이다.

    });

    $("#content").keyup(function(){

        // 2. #out 공간에 #data의 내용이 출력된다.

        $("#out_content").text($("#content").val());

        // #out의 위치에 text로 데이터를 받는다.(setter)

        // 들어가는 데이터는 #data의 값(.val())이다. (getter)

        // 메서드 괄호 안에 아무것도 없으면 getter, 파라미터가 있으면 setter이다.

    });

});

// 이미지 미리보기
// input 태그 중 name=original_image 가져오기
let fileTag = document.querySelector("input[name=original_image]");
// fileTag에 변화가 있을 경우 실행될 함수
fileTag.onchange = function() {
    
    // id = PreviewImg 가져오기
    let imgTag = document.querySelector("#PreviewImg");

    // 파일 유무 확인
    if(fileTag.files.length > 0) {

        // 파일을 선택한 경우
        // 미리보기 생성 == 이미지 태그 src에 데이터(파일태그에서 선택한 파일) 보여주기
        let reader = new FileReader();

        // reader 읽어들이는 작업(onload)를 끝냈을 떄 함수 실행, 읽어온 데이터를 함수의 매개변수 파라미터로 전달
        reader.onload = function(data) {
            imgTag.src = data.target.result;
        }
        reader.readAsDataURL(fileTag.files[0]);
    }
    else {
        // 취소 버튼을 누를 경우
        imgTag.src = "/static/img/default.png"
    }
}


//게시글 생성
async function createArticle() {

    // let User_payload = JSON.parse(localStorage.getItem('payload'))
    // if (User_payload === undefined ||  User_payload === null){
    //     location.href=`${frontend_base_url}/users/login.html`;
        
        
    // } else {
        const payload = localStorage.getItem("payload");
        const parsed_payload = await JSON.parse(payload);
        console.log(parsed_payload);

        content = document.getElementById("content").value;
        title = document.getElementById("title").value;
        original_image = document.getElementById("original_image").files[0];
        console.log(title);
        console.log(content);
        console.log(original_image);

        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("original_image", original_image);
        const response = await fetch(`${backEndBaseUrl}/articles/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: formData,
        }); 
        if (response.status == 200) {
        alert("게시물 등록");
        window.location.replace(`${frontEndBaseUrl}/`);
        }

        
    }



    window.onload = async function getIndexDetail_API(){
        let User_payload = JSON.parse(localStorage.getItem('payload'))
        if (User_payload === undefined ||  User_payload === null){
            location.href=`${frontend_base_url}/users/login.html`;
            
            
        } else {

        // 좌측 메뉴바 API 연결
        nav_user_info = await getNavUserInfo(User_payload.user_id)
        nav_user_info = nav_user_info.users
        console.log(nav_user_info)
        nav_category_box = await getNavCategoryBox()
    
        // nav 부분
        // nav 상단 유저 박스 부분
        var nav_nickname = document.getElementsByClassName('NavUserInfoBoxNickname')[0];
        var nav_name = document.getElementsByClassName('NavUserInfoBoxName')[0];
        var nav_name2 = document.getElementsByName('NavUserInfoBoxName2')[0];
        var nav_email = document.getElementsByClassName('NavUserInfoBoxEmail')[0];
        var nav_follow = document.getElementsByClassName('NavUserInfoBoxFollow')[0];
        var nav_login = document.getElementsByClassName('NavUserInfoBoxLogin')[0];
        last_login_time = timeForToday(nav_user_info.last_login)
        var nav_profile_image = document.getElementsByClassName('NavUserInfoBoxProfileImage')[0];
        // var nav_profile_link = document.getElementsByClassName('NavUserInfoBoxProfileLink')[0];
    
        nav_nickname.innerText = `${nav_user_info.nickname}`
        nav_name.innerText = `${nav_user_info.name}`
        nav_name2.innerText = `${nav_user_info.name}님 반갑습니다!`
        nav_email.innerText = `${nav_user_info.email}`
        nav_follow.innerText = `팔로잉 ${nav_user_info.follow_count} 명  |  팔로워 ${nav_user_info.followee_count} 명`
        nav_login.innerText = `현재 접속 시간 : ${last_login_time}`
        // nav_profile_link.setAttribute("onclick", `${frontEndBaseUrl}/users/profile.html?id=${nav_user_info.id}`)
        nav_profile_image.setAttribute("src", `${backEndBaseUrl}${nav_user_info.profile_image}`)
        console.log(`${backEndBaseUrl}${nav_user_info.profile_image}`)
        // nav 하단 카테고리 부분
        var nav_category = document.getElementsByClassName('NavCategory')[0];
        
        // 업로드 박스 닉네임 출력
        var ub_nickname = document.getElementsByClassName('UploadUserInfoBoxNickname')[0];
        var ub_profile_image = document.getElementsByClassName('UploadUserInfoBoxProfileImage')[0];
        ub_nickname.innerText = `${nav_user_info.nickname}`
        ub_profile_image.setAttribute("src", `${backEndBaseUrl}${nav_user_info.profile_image}`)
    
        nav_category_box.forEach(category => {
            nav_category.innerHTML += `<div onclick="location.href='${frontEndBaseUrl}/articles/category.html?id=${category.category}'" class="category"><a style="color: #cacaca; text-decoration: none;">${category.category} <b style="font-weight: normal; color: #cacaca;">(${category.count})</b></a></div>`
        });
    }
    }