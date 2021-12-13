/**
 * Consegna
 * 
 * Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro javascript in cui:
- Creiamo il nostro array di oggetti che rappresentano ciascun post. 
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card: nome autore, foto profilo, data in formato americano, testo del post, immagine (non tutti i post devono avere una immagine), numero di likes.
Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)
- Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed.
- Rendiamo il tasto “Mi Piace” cliccabile con incremento del counter dei likes.

BONUS
1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente (es. Luca Formicola > LF).
3. Al click su un pulsante “Mi Piace” di un post, incrementare il contatore di like al post e cambiare colore al testo del bottone.
 */

/**
 * Dati
 */
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "300/300?image=15"
        },
        "likes": 80,
        "created": "06-25-2021"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "300/300?image=10"
        },
        "likes": 120,
        "created": "09-03-2021"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "300/300?image=20"
        },
        "likes": 78,
        "created": "05-15-2021"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "04-03-2021"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "300/300?image=29"
        },
        "likes": 95,
        "created": "03-05-2021"
    }
];

const postLiked = [1, 3];

//container del dei posts
const container = document.getElementById('container');

function authorInitials(name) {
    const elements = name.split(' ');
    let initials = '';
    for (let i = 0; i < elements.length; i++) {
        const string = elements[i];
        initials += string[0];
    }
    return initials;
}

function dateIta(date) {
    const elements = date.split('-');
    console.log(elements);
    let dateNew = elements[1] + "-" + elements[0] + '-' + elements[2];
    return dateNew;
}


function templatePost({ id, content, media, author, likes, created }) {
    // const { id, content, media, author, likes, created } = post;
    // let imageAuthor = ` <img class="profile-pic" src="https://unsplash.it/${post.author.image}" alt="${post.author.name}">`;

    // if (!post.author.image) {
    //     imageAuthor = `<div class="profile-pic-default">${post.author.name}</div>`;
    // }

    // Ternario
    // nomeVar = (condizione) ? 'fai una cosa' : 'fanne un\'altra';
    let imageAuthor = (!author.image) ? `<div class="profile-pic-default">${authorInitials(author.name)}</div>` : `<img class="profile-pic" src="https://unsplash.it/${author.image}" alt="${author.name}">`;
    // let liked = '';
    // if (postLiked.includes(id)) {
    //     liked = 'like-button--liked';
    // }

    let liked = (postLiked.includes(id)) ? 'like-button--liked' : '';

    const template = `
    <div class="post">
            <div class="post__header">
                <div class="post-meta">
                    <div class="post-meta__icon">
                        ${imageAuthor}
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${dateIta(created)}</div>
                    </div>
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="https://unsplash.it/${media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button ${liked}" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div>
            </div>
        </div>
    `;

    return template;
}

function addListenerButton() {
    const buttons = document.querySelectorAll('.like-button');
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const id = parseInt(this.dataset.postid);

            // console.log(id);
            // const id = i + 1;
            const containerLike = document.getElementById('like-counter-' + id);

            // if (this.classList.contains('like-button--liked')) {
            //     this.classList.remove('like-button--liked');
            //     posts[i].likes -= 1;
            //     containerLike.innerHTML = posts[i].likes;
            // } else {
            //     this.classList.add('like-button--liked');
            //     posts[i].likes += 1;
            //     containerLike.innerHTML = posts[i].likes;
            // }
            if (postLiked.includes(id)) {
                console.log('gia cliccato');
                this.classList.remove('like-button--liked');
                posts[i].likes -= 1;
                containerLike.innerHTML = posts[i].likes;
                //prendo indice del mio id all'interno dell'array postLiked
                const indexId = postLiked.indexOf(id);

                //rimuovo quello specifico elemento 
                postLiked.splice(indexId, 1);
                // console.log(postLiked);
            } else {
                this.classList.add('like-button--liked');
                posts[i].likes += 1;
                containerLike.innerHTML = posts[i].likes;
                postLiked.push(id);
                // console.log(postLiked);
            }


        });
    }
}

function init(posts, container) {
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const template = templatePost(post);
        container.innerHTML += template;
    }

    addListenerButton();
}

init(posts, container);














