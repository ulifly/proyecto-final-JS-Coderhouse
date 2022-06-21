const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com',
		'X-RapidAPI-Key': '486352d137msh3692cf99937cd0fp170510jsnc095db6365ea'
	}
};



const get_free_games_pc = () => {
fetch('https://gamerpower.p.rapidapi.com/api/giveaways?platform=pc', options)
    .then((response)=>{
        console.log(response)
        return response.json()
    })
     .then((gamedata)=>{
         showHtml(gamedata)
    })
    .catch((err)=>{
        console.log("error captured " + err)
    })
	
}
const get_free_games_ps5 = () => {
    fetch('https://gamerpower.p.rapidapi.com/api/giveaways?platform=ps5', options)
        .then((response)=>{
            console.log(response)
            return response.json()
        })
         .then((gamedata)=>{
             showHtml(gamedata)
        })
        .catch((err)=>{
            console.log("error captured " + err)
        })
        
    }

    const get_free_games_switch = () => {
        fetch('https://gamerpower.p.rapidapi.com/api/giveaways?platform=switch', options)
            .then((response)=>{
                console.log(response)
                return response.json()
            })
             .then((gamedata)=>{
                 showHtml(gamedata)
            })
            .catch((err)=>{
                console.log("error captured " + err)
            })
            
        }
        const get_free_games_xbox = () => {
            fetch('https://gamerpower.p.rapidapi.com/api/giveaways?platform=xbox-series-xs', options)
                .then((response)=>{
                    console.log(response)
                    return response.json()
                })
                 .then((gamedata)=>{
                     showHtml(gamedata)
                })
                .catch((err)=>{
                    console.log("error captured " + err)
                })
                
            }

//funciones
showHtml = (gamefiles) =>{
    const content = document.querySelector('#content-cards')
    let html=""
    gamefiles.forEach((gamefile)=>{
        const {title, image, description, type, instructions, end_date, platforms, open_giveaway_url} = gamefile;
        html+=`
        <p>titulo: ${title} </p>
        <img src="${image}">
        <p>descripcion: ${description} </p>
        <p>tipo: ${type} </p>
        <p>instrucciones: ${instructions} </p>
        <p>Termina: ${end_date} </p>
        <p>plataforma: ${platforms} </p>

        <a href="${open_giveaway_url}" target="_blank">link</a>
        <hr>
        `
    }) 
    content.innerHTML=html
}


//botones
const btn_pc = document.querySelector('#pc')
const btn_ps5 = document.querySelector('#ps5')
const btn_switch = document.querySelector('#switch')
const btn_xbox = document.querySelector('#xbox')



btn_pc.addEventListener('click', get_free_games_pc)
btn_ps5.addEventListener('click', get_free_games_ps5)
btn_switch.addEventListener('click', get_free_games_switch)
btn_xbox.addEventListener('click', get_free_games_xbox)