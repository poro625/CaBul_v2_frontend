const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"
const TmdbApiImageUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face"
const TmdbApiImageOgUrl = "https://www.themoviedb.org/t/p/original/"

window.onload = () => {
    console.log('로딩되었음')
}



async function handleSignup() {
    const email = document.getElementById("email").value
    const name = document.getElementById("name").value
    const nickname = document.getElementById("nickname").value
    const password1 = document.getElementById("password1").value
    const password2 = document.getElementById("password2").value
    console.log(email, nickname, password1, password2)

    const response = await fetch('http://127.0.0.1:8000/users/dj-rest-auth/registration/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "name": name,
            "nickname": nickname,
            "password1": password1,
            "password2": password2
        })
    })

    const response_json = await response.json()

    console.log(response)
    if (response.status == 201){
        alert(response_json["detail"])
            window.location.replace(`${frontEndBaseUrl}users/login.html`);
    }else {
        alert(response_json["email"])
        alert(response_json["password1"])

    }
}





