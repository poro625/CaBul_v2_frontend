const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";

//검색함수
async function searchButton(){
    const search_id = document.getElementById("search").value
    
    location.href = `search.html?${search_id}`
    
}


async function getSearch(search_id){
    const response = await fetch(`${backend_base_url}/articles/search/?search=${search_id}`,{
        method:'GET',
    })
    

    response_json = await response.json()
    console.log(response_json)
    return response_json
    

}


window.onload = async function loadSearch(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){

        location.href="http://127.0.0.1:5500/login.html";
    } else {
    const search_id = location.search.replace("?", "")

    movies = await getMovieSearch(search_id)

    const movie_list = document.getElementById("movies")

    movies.forEach(movie =>{
        const newMovie = document.createElement("div");

        const movieImage = document.createElement("img")
        

        movieImage.setAttribute("src", `${TmdbApiImageUrl}${movie.image}`)


        newMovie.onclick=function() {
            location.href = `articledetail.html?${movie.id}`
        }

        newMovie.appendChild(movieImage)
        movie_list.appendChild(newMovie)
    });
}
}
