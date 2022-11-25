const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";

async function getSearch(){
    const title = document.getElementById("title").value
    const urlObject = new URL(`${backend_base_url}/articles/search/?search=${title}`)
    const queryString = urlObject.searchParams;
    console.log(queryString.get('search')); // title
    const response = await fetch(urlObject,{
        headers : {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")

        },
    
        method:'GET',
    })
    

    response_json = await response.json()
    console.log(response_json)
    return response_json
    

 }

// async function getSearch(){
//     const response = await fetch(`${backend_base_url}/articles/search/?search=번째`,{
//         headers : {
//             'content-type': 'application/json',
//             "Authorization":"Bearer " + localStorage.getItem("access")

//         },
    
//         method:'GET',
//     })
    

//     response_json = await response.json()
//     console.log(response_json)
//     return response_json
    

//  }

window.onload = async function getSearch_api(){
    searchs = await getSearch()
    
    var search_title = document.getElementsByClassName("searchTitle")[0];
    searchs.forEach(search => {
        search_title.innerHTML += `

        <div style="display: flex; flex-direction: row; width: 60vw; height: 50px; background-color: white; margin: 0 auto 0 40px; text-align: center; border-bottom: solid 1px #c8c4c4;">
            <div style="width: 5vw; min-width: 50px; margin: auto;">${search.id}</div>
            <div style="width: 5vw; min-width: 50px; margin: auto;">${search.category}</div>
            <div style="width: 25vw; min-width: 250px; margin: auto auto auto auto; padding-left: 30px; text-align: left;"><a href="" style="color: black; text-decoration: none;"><b>${search.title}</b></a></div>
            <div style="width: 10vw; min-width: 100px; margin: auto;">${search.user}</div>
            <div style="width: 15vw; min-width: 150px; margin: auto;">${search.created_at}</div>
        </div>

        
        `
    });

}
