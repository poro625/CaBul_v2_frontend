const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";


async function feedUpload(feed_id, title, content) {
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href="http://127.0.0.1:5500/users/login.html";
        
        
    } else {
        const articleData = {
        title: title,
        content: content,
        };
        console.log(feed_id);
        const response = await fetch(`${backend_base_url}/articles/${feed_id}/`, {
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "PATCH",
        body: JSON.stringify(articleData),
        });

        if (response.status == 200) {
        response_json = await response.json();
        return response_json;
        } else {
        alert(response.status);
        }
    }
}


