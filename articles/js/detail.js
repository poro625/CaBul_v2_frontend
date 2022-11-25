console.log('connected')

const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";

const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get("id");
let liked = false;

