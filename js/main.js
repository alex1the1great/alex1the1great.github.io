let page = 1;
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

fetch(`https://api.github.com/users/alex1the1great/repos`)
    .then(response => response.json())
    .then(data => {
        singlePage(page);
    })
    .catch(e => console.log(e))

// Single Page
function singlePage(page) {
     fetch(`https://api.github.com/users/alex1the1great/repos?page=${page}&per_page=6`)
            .then(response => response.json())
            .then(dataAll => {

                    dataAll.forEach(data => {
                        const {name, description, html_url} = data;
                        let cards = document.getElementById('cards');
                        let html = `
                        <div class='card'>
                        <p class='title'>${name}</p>
                        <p class='description'>${description}</p>
                        <a href=${html_url} target='_blank' class="btn">Source Code</a>
                        </div>
                        `;
                        cards.innerHTML += html
                    })

                    document.getElementById('content').hidden = false;
                    document.getElementById('loading').hidden = true;

                })
                .catch(e => console.log(e))
}

// More Button
next.addEventListener('click', () => {
    page++;
    singlePage(page)
})

// First Button
prev.addEventListener('click', () => {
    location.reload();
})