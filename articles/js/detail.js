const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"



async function deleteFeed(feed_id) {
    const response = await fetch(`${backend_base_url}/articles/${feed_id}/`, {
        headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });

    if (response.status == 204) {
        alert("message")
      window.location.replace(`${frontend_base_url}/`); // 삭제가 되고나면 인덱스로 다시 이동하게함
    } else {
        alert(response.status);
    }
}



