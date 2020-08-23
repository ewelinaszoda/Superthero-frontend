//-----------------------------
// const
//-----------------------------

const BASE_URL = 'http://localhost:3000'

SEARCH_URL = 'https://superheroapi.com/api/3111268965575899/search/';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

const body = document.querySelector('body');
const br = document.createElement('br');
const hr = document.createElement('hr');

let heros = [];

const header = document.querySelector('#header');
const searchDiv = document.querySelector('#search-div');
const messagesDiv = document.querySelector('#messages-div');

const savedCardContainer = document.createElement('div');
savedCardContainer.id = '#saved-container'

const superpowerDivMessage = document.createElement('div');
superpowerDivMessage.classList.add('message-div-superpower');

const likeMessage = document.querySelector('.like-msg');
const savedMessage = document.querySelector('.save-msg');
// const saveMessage = document.querySelector('.saved-msg');
const powerMessage = document.querySelector('.powerstarts-msg');
const helloMessage = document.querySelector('.hello-msg');
const notFindMessage = document.querySelector('.not-find-msg');
const deleteMessage = document.querySelector('.good-bye');

const img = document.createElement('img');
img.classList.add('image');

const messageDiv = document.createElement('div');
messageDiv.classList = 'message-div';

const superpowerDiv = document.createElement('div');
superpowerDiv.classList = 'superpower-div';

const gif = document.createElement('img');

//---------------------------------
// make search div
//-------------------------------

function makeDivForSearching(userInput) {
  const inputDiv = document.createElement('div');
  inputDiv.classList = 'input-search';

  const input = document.createElement('input');
  input.classList = 'input';
  input.placeholder = 'Search for superhero...';

  const searchButton = document.createElement('button');
  searchButton.classList.add('btn-search');
  searchButton.innerText = 'Search';

  searchButton.addEventListener('click', (event) => {
    const userInput = event.target.previousSibling.value;
    input.value = "";
    getSearchRequest(userInput);
  });

  inputDiv.append(input, searchButton);
  searchDiv.append(inputDiv);
}

function createSavedSection() {
	const savedCardDiv = document.querySelector('#saved-cards')
	const savedCardTitle = document.createElement('div');
	savedCardTitle.id = '#saved-title'
	savedCardDiv.append(hr, savedCardTitle, savedCardContainer)
	
	const h2 = document.createElement('h2');
	h2.innerText = 'SAVED CARD';
	savedCardTitle.append(h2);
}

//------------------------------
// make a Superhero Card
//-----------------------------

function makeCardSuperhero(superhero) {

  const h1 = document.createElement('h1');
  h1.innerText = superhero.results[0].name;

  img.src = superhero.results[0].image.url;
  
  const cardSuperheroDiv = document.createElement('div');
  cardSuperheroDiv.classList = 'card';

  cardSuperheroDiv.append(h1, img);
  displaySuperpowerMessage();

  img.addEventListener('click', function (event) {
  	
    const card = document.querySelector('#card');
    
    const statsUl = document.createElement('ul');
    statsUl.class = 'info-ul';

    const stats1Li = document.createElement('li');
    stats1Li.innerText = `Intelligence: ${superhero.results[0].powerstats.intelligence}`;

    const stats2Li = document.createElement('li');
    stats2Li.innerText = `Strength: ${superhero.results[0].powerstats.strength}`;

    const stats3Li = document.createElement('li');
    stats3Li.innerText = `Speed ${superhero.results[0].powerstats.speed}`;

    const stats4Li = document.createElement('li');
    stats4Li.innerText = `Power: ${superhero.results[0].powerstats.power}`;

    const message = document.createElement('div');
    message.innerText = "This hero is already saved.\n You'll find him in the saved cards section!";
    
    const saveButton = document.createElement('button');
    saveButton.classList.add('btn-save');
    saveButton.innerText = 'Save Card';
    
    statsUl.append(stats1Li, stats2Li, stats3Li, stats4Li);
    
    // check of the search card in already saved
    let names = heros.map( hero => hero.name );
    if (!names.includes(superhero.results[0].name)) {
    	 cardSuperheroDiv.append(statsUl, saveButton);
    } else {
    	cardSuperheroDiv.append(message);
    }

    //------------------------------------------------
    // save button
    //------------------------------------------------
	
    saveButton.addEventListener('click', function () {
      if (savedMessage.style.display === 'none') {
        savedMessage.style.display = 'block';
        likeMessage.style.display = 'none';
        notFindMessage.style.display = 'none';
        helloMessage.style.display = 'none';
        powerMessage.style.display = 'none';
        deleteMessage.style.display = 'none';
      }

      const object = {
        name: superhero.results[0].name,
        img: superhero.results[0].image.url,
        intelligence: superhero.results[0].powerstats.intelligence,
        strength: superhero.results[0].powerstats.strength,
        speed: superhero.results[0].powerstats.speed,
        power: superhero.results[0].powerstats.power,
        likes: 0,
      };

        fetch(BASE_URL + '/heros', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(object),
        })
          .then((response) => response.json())
           .then(() => getSavedCard())
          .then(cardSuperheroDiv.remove())
          .catch(function handleError(error) {
            console.log('there was an error posting the data');
            console.error(error);
          })
    });
  });

  // -----------------------------
  // appending elements to body
  //------------------------------
  cardSuperheroDiv.append(br, superpowerDiv, br);

  messagesDiv.append(messageDiv);
  card.innerHTML = "";
  card.append(cardSuperheroDiv);

  function displaySuperpowerMessage() {
    setTimeout(function createDivForSuperpower() {
      superpowerDivMessage.innerText =
        "To see more superpower of Superhero, click on the superhero's sign on the costume!";
      powerMessage.style.display = 'block';
      deleteMessage.style.display = 'none';
      notFindMessage.style.display = "none";
      superpowerDivMessage.innerText = " ";
      savedMessage.style.display = 'none';
      messageDiv.append(superpowerDivMessage);
    }, 2000);
  };
  img.disabled = true;
}

//------------------
// get saved card 
//-----------------

function getSavedCard() {
  return fetch(BASE_URL + '/heros')
    .then((response) => response.json())
    .then((herosResponse) =>
    	renderHeros(herosResponse)
    );
}

//------------------
// render Heros
//-----------------

function renderHeros(herosResponse) {
  heros = herosResponse
	// console.log("getSavedCard()  heros response: "+ JSON.stringify(heros))
	savedCardContainer.innerHTML = "";
      heros.forEach(function (hero) {
        renderHero(hero);
      });
}

function renderHero(hero) {
  const savedCardSuperhero = document.createElement('div');
  savedCardSuperhero.classList.add('card');
  savedCardSuperhero.classList.add('saved-card');

  const h1 = document.createElement('h1');
  h1.innerText = hero.name;

  const img = document.createElement('img');
  img.classList.add('image');
  img.src = hero.img;

  const statsUl = document.createElement('ul');
  statsUl.class = 'info-ul';

  const stats1Li = document.createElement('li');
  stats1Li.innerText = `Intelligence: ${hero.intelligence}`;

  const stats2Li = document.createElement('li');
  stats2Li.innerText = `Strength: ${hero.strength}`;

  const stats3Li = document.createElement('li');
  stats3Li.innerText = `Speed ${hero.speed}`;

  const stats4Li = document.createElement('li');
  stats4Li.innerText = `Power: ${hero.power}`;

  statsUl.append(stats1Li, stats2Li, stats3Li, stats4Li);

  //-------------------
  // like section
  //-------------------

  const likeDiv = document.createElement('div');
  likeDiv.classList.add('likes-section');

  const likeButton = document.createElement('button');
  likeButton.className = 'like-button';
  likeButton.innerText = '♥';

  const span = document.createElement('span');
  span.classList.add('likes');
  span.innerText = `${hero.likes} likes`;

  likeDiv.append(span, likeButton);

  likeButton.addEventListener('click', function () {

    if ((likeMessage.style.display === 'none')) {
      likeMessage.style.display = "block";
      notFindMessage.style.display = 'none';
      helloMessage.style.display = 'none';
      deleteMessage.style.display = 'none';
      powerMessage.style.display = 'none';
      savedMessage.style.display = 'none';
    }

    hero.likes = hero.likes + 1;
    patchLikes({
      id: hero.id,
      likes: hero.likes
    });
    span.innerText = `${hero.likes} likes`;
  });

  //--------------------
  // comment section
  //--------------------

  const commentsUl = document.createElement('ul');
  commentsUl.classList.add('info-ul');

  hero.comments.forEach((comment) => {
    const commentLi = document.createElement('li');
    commentLi.innerText = comment.content;
    commentsUl.append(commentLi);
  });

  //---------------------------
  // form section - comments
  //---------------------------

  const form = document.createElement('form');
  form.classList.add('comment-form');
  const input = document.createElement('input');
  input.classList.add('comment-input');
  input.placeholder = 'Add a comment...';

  form.addEventListener('submit', function (event) {
    if ((likeMessage.style.display === 'block')) {
      likeMessage.style.display = 'none';
    }
    event.preventDefault();

    const newComment = {
      content: form[0].value,
    };

    fetch(BASE_URL + '/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        content: newComment.content,
        heroId: hero.id,
      }),
    })
      .then((response) => response.json())
      .catch(function handleError(error) {
        console.log('there was an error posting the data');
        console.error(error);
      });

    const li = document.createElement('li');
    li.innerText = newComment.content;
    commentsUl.append(li);

    input.value = "";
  });

  const commentButton = document.createElement('button');
  commentButton.classList.add('comment-button');
  commentButton.innerText = 'Post';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn-delete');
  deleteButton.innerText = 'Delete Card';

  form.append(input, commentButton);
  savedCardSuperhero.append(
    h1,
    img,
    statsUl,
    likeDiv,
    commentsUl,
    form,
    deleteButton
  );
  savedCardContainer.append(savedCardSuperhero);

  deleteButton.addEventListener('click', function (event) {

    deleteSuperhero(hero);
    savedCardSuperhero.remove();

    if ((deleteMessage.style.display === 'none')) {
      deleteMessage.style.display = 'block';
      likeMessage.style.display = 'none';
      helloMessage.style.display = 'none';
      notFindMessage.style.display = "none";
      powerMessage.style.display = 'none';
      savedMessage.style.display = 'none';
    }
  });
}

//-----------------------
// patch likes
//------------------------

function patchLikes(hero) {
  return (
    fetch(BASE_URL + `/heros/${hero.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(hero),
    })
      .then((response) => response.json())
      .catch(function handleError(error) {
        console.log('there was an error patching the data');
        console.error(error);
      })
  );
}

// ----------------------
// delete card
//----------------------

function deleteSuperhero(hero) {
  return fetch(BASE_URL + `/heros/${hero.id}`, {
    method: 'DELETE',
  }).then((response) => response.json);
}

//------------------------------
// search request
//------------------------------

function getSearchRequest(userInput) {
  return (
    fetch(proxyURL + SEARCH_URL + `${userInput}`)
      .then((response) => response.json())
      .then((superhero) => {
      	helloMessage.style.display = 'none';
        if (superhero.response === 'error') {
          notFindMessage.style.display = 'block';
          savedMessage.style.display = 'none';
        } else {
          notFindMessage.style.display = 'none';
          makeCardSuperhero(superhero);
        }
      })
  );
}

function helloUserMessage() {
  if (helloMessage.style.display === 'none') {
    helloMessage.style.display = 'block';
    deleteMessage.style.display = 'none';
    savedMessage.style.display = 'none';
  };
}

//-----------------------------
// invoke the master function
//------------------------------

function unit() {
  helloUserMessage();
  createSavedSection();
  makeDivForSearching();
  getSavedCard();
}

unit();