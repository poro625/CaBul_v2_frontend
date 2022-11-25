const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"

async function getSearch(search){
    const response = await fetch(`${backEndBaseUrl}/articles/search/?search=${search}`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    console.log(response_json)
    return response_json
}

function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}


window.onload = async function getSearch_api(){
    const id = location.search.replace("?search=", "")
    searchs = await getSearch(id)

    var search_title = document.getElementsByClassName("SearchList")[0];
    searchs.forEach(search => {
        search_title.innerHTML += ` <div style="display: flex; flex-direction: row; width: 60vw; height: 50px; background-color: white; margin: 0 auto 0 40px; text-align: center; border-bottom: solid 1px #c8c4c4;">
                                        <div style="width: 5vw; min-width: 50px; margin: auto;">${search.id}</div>
                                        <div style="width: 5vw; min-width: 50px; margin: auto;">${search.category}</div>
                                        <div style="width: 25vw; min-width: 250px; margin: auto auto auto auto; padding-left: 30px; text-align: left;"><a href="" style="color: black; text-decoration: none;"><b>${search.title}</b></a></div>
                                        <div style="width: 10vw; min-width: 100px; margin: auto;">${search.user}</div>
                                        <div style="width: 15vw; min-width: 150px; margin: auto;">${timeForToday(search.created_at)}</div>
                                    </div>`
    });

}
