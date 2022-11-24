const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";




//게시글 생성
async function createArticle() {
    const payload = localStorage.getItem("payload");
    const parsed_payload = await JSON.parse(payload);
    console.log(parsed_payload);

    content = document.getElementById("content").value;
    title = document.getElementById("title").value;
    original_image = document.getElementById("original_image").files[0];
    console.log(original_image);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("original_image", original_image);
    const response = await fetch("http://127.0.0.1:8000/articles/", {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
    body: formData,
    }); 
    if (response.status == 200) {
    alert("게시물 등록");
    window.location.replace("http://127.0.0.1:5500/");
    }

    }



console.log("connected")