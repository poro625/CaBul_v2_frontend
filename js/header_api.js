
 async function searchButton(){
    const search_id = document.getElementById("search").value
    console.log(search_id)
    location.href = `${frontEndBaseUrl}/articles/search.html?search=${search_id}`
}
