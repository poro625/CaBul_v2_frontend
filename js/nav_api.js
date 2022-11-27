console.log('nav_api 연결 시작')

async function getNavUserInfo(user_id){
    const response = await fetch(`${backEndBaseUrl}/users/${user_id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

async function getNavCategoryBox(){
    const response = await fetch(`${backEndBaseUrl}/articles/category/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
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


async function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    alert("로그아웃 되었습니다");
    window.location.replace(`${frontEndBaseUrl}/users/login.html`);
}
async function handleDelete(){   //mock 함수
    const response = await fetch(`${backEndBaseUrl}/users/delete/`,{
        headers:{
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'DELETE',
    })
    if (response.status ==204){
        alert("회원탈퇴 완료!")
        window.location.replace(`${frontEndBaseUrl}/users/login.html`);
    }
}

console.log('nav_api 연결 완료')