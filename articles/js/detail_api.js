const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"

// 게시글 상세 조회
async function getIndexFeedDetail(id){
    const response = await fetch(`${backEndBaseUrl}/articles/${id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

// 댓글 작성
async function handleComment(id){
    comment = document.getElementById("comment").value;
    console.log(comment)

    const response = await fetch(`${backEndBaseUrl}/articles/${id}/comment/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'POST',
        body: JSON.stringify({
            "comment": comment,
        })
    })
    if (response.status ==200){
        window.location.reload();
}
}

// 댓글 삭제
async function handleCommentDelete(comment_id, feed_id) {

    const response = await fetch(`${backEndBaseUrl}/articles/${feed_id}/comment/${comment_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'DELETE',
    })
    if (response.status ==204){
        alert("리뷰가 삭제되었습니다!")
        window.location.replace(`${frontEndBaseUrl}/articles/detail.html?id=${feed_id}`);
    }
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

window.onload = async function getIndexDetail_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href="http://127.0.0.1:5500/users/login.html";
        
        
    } else {
        const id = location.search.replace("?id=", "")
        feed = await getIndexFeedDetail(id)
        comments = feed.comments
        created_at = timeForToday(feed.created_at)

        // var wrap = document.getElementsByClassName('FeedDetailBox')[0];
        var comment_wrap = document.getElementsByClassName('CommentDetailList')[0];
        var feed_nickname = document.getElementsByClassName('FeedDetailUserNickname')[0];
        var feed_transfer_image = document.getElementsByClassName('FeedDetailTransferImage')[0];
        var feed_title = document.getElementsByClassName('FeedDetailFeedTitle')[0];
        var feed_content = document.getElementsByClassName('FeedDetailFeedContent')[0];
        var feed_category = document.getElementsByClassName('FeedDetailFeedCategory')[0];
        var feed_created_at = document.getElementsByClassName('FeedDetailFeedCreated')[0];

        // wrap.innerHTML = ``

        comments.forEach(cmt => {
            comment_wrap.innerHTML += `<div style="display: flex; flex-direction: row; justify-content: space-between ;">
                                        <div style="display: flex; flex-direction: row;">
                                            <div style="margin-left: 5px; font-weight: bold;">${cmt.user}</div>
                                            <div style="margin-left: 5px;">${cmt.comment}</div>
                                        </div>
                                        <!-- 댓글 삭제 부분 -->
                                        <form>
                                            <input type="submit" value='X' onclick="handleCommentDelete(${cmt.id}, ${feed.id})" style="background-color: transparent; border: none; margin-right: 10px; color: red;">
                                        </form>
                                    </div>`
        });

        feed_nickname.innerText = `${feed.user}`
        feed_transfer_image.innerHTML = `<img style="cursor: pointer; width: 1000px; min-width: 1000px; height: 600px; min-height: 600px; object-fit: contain; background-color: black;" src="${backEndBaseUrl}${feed.transfer_image}">`
        feed_title.innerText = `${feed.title}`
        feed_content.innerText = `${feed.content}`
        feed_category.innerText = `${feed.category}`
        feed_created_at.innerText = `${created_at}`
    }
}