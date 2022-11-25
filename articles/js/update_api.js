const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";


    
async function feedUpload(feed_id, title, content, original_image) {
    const articleData = {
    title: title,
    content: content,
    // original_image: original_image,
    };
    console.log(feed_id);
    const response = await fetch(`${backend_base_url}/articles/${feed_id}/`, {
    headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "PUT",
    body: JSON.stringify(articleData),
    });

    if (response.status == 200) {
    response_json = await response.json();
    return response_json;
    } else {
    alert(response.status);
    }
}


