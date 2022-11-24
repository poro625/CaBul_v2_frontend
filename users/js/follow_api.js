const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"
const TmdbApiImageUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face"
const TmdbApiImageOgUrl = "https://www.themoviedb.org/t/p/original/"

window.onload = () => {
    console.log('로딩되었음')
}

async function handlefollow(){
    const follow = document.getElementById("follow").value
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    console.log(follow,name,email)


    const response = await fetch('http://127.0.0.1:8000/users/follow/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({

        })
    })
    const response_json = await response.json()
    console.log(response_json)
}