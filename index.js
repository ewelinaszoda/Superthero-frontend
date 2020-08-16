// Things to fix !!!

// 1. When is none saved card in the section SAVED CARD is weird square

// 2. After Click Save card, the card should appear on the saved section, instead you can 
// more cards which should have not been seen there, after refresh all is good

//3. When search second time, the card is displayed wrong way, up side down( name)

// 3. Fix the message for the user when the card has been saved, likes, comments or deleted. 
// - I used hacky way if conditional, what it is not working well 
// If the user wants to save the card what exist in saved container, message and do not let the user to do it 
// - hello message should work 
// - good bye message should work 
// - not find superhero should work 
// - save card message should work 
// - like card message should work 
// - delete card message should work 
// - good-bye message should work

// 4. How to reset search input and comment input after post data

// 5. After deleted the card, the rest of saved cards should appears on the page 

// 6.Styling
// - saved card in the row

//-----------------------------
// const
//-----------------------------

const BASE_URL = 'http://localhost:3000'

const body = document.querySelector('body');
SEARCH_URL = 'https://superheroapi.com/api/3111268965575899/search/';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

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
const saveMessage = document.querySelector('.saved-msg');

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

// const cardSuperheroDiv = document.createElement('div');
// cardSuperheroDiv.classList = 'card';

const gif = document.createElement('img');

// const savedCardSuperhero = document.createElement('div');
// savedCardSuperhero.classList.add('card');
// savedCardSuperhero.classList.add('saved-card');

// savedCardContainer.append(savedCardSuperhero);

// const saveButton = document.createElement('button');
// saveButton.classList.add('btn-save');
// saveButton.innerText = 'Save Card';

//------------------------------------
// message section
//------------------------------------

// !!!! NEEDS TO BE FIXED PLUS CONDITIONAL IF THAT MESSAGE DISPLAY NONE AND SO ON!!!!!!
// gif.src = "https://giphy.com/gifs/reaction-mood-57ZvMMkuBIVMlU88Yh"

function displayMessage(content, gifSrc) {
  superpowerDivMessage.innerText = content;
  gif.classList = 'gif';
  gif.src = gifSrc;
  messageDiv.append(superpowerDivMessage, gif);
}

//---------------------------------
// search div
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

    // !!!! NEEDS TO BE FIXED PLUS CONDITIONAL IF THAT MESSAGE DISPLAY NONE AND SO ON!!!!!!
    // helloMessage.style.display = 'none';
    // notFindMessage.style.display = 'none';
    const userInput = event.target.previousSibling.value;
    // debugger
    input.value = "";
    getSearchRequest(userInput);
  
    // .then((userInput) => userInput = " ")
    //QUESTION 1 THAT IT NOT WORKING !!!!!!!!
    // (userInput.reset());
    //   console.log('ioooiio');
  });

  inputDiv.append(input, searchButton);
  searchDiv.append(inputDiv);
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

  // click event on the superhero's image 

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
    
    let names = heros.map(  hero => hero.name );
    if (!names.includes(superhero.results[0].name)) {
    	 cardSuperheroDiv.append(statsUl, saveButton);
    } else {
    	cardSuperheroDiv.append(message);
    }

    //------------------------------------------------
    // save button
    //------------------------------------------------
	
    saveButton.addEventListener('click', function (event) {
      if ((saveMessage.style.display === 'none')) {
        saveMessage.style.display = 'block';
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

	console.log("saved button pressed");
//       return (
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
          .then(() => {
            if ((saveMessage.style.display === 'block')) {
              saveMessage.style.display = 'none';
            }
          })
          // .then(renderHero(object))
          .catch(function handleError(error) {
            console.log('there was an error posting the data');
            console.error(error);
          })
//       );
    });
  });

  // -----------------------------
  // appending elements to body
  //------------------------------
  cardSuperheroDiv.append(br, superpowerDiv, br);

  messagesDiv.append(messageDiv);
  card.innerHTML = "";
  card.append(cardSuperheroDiv);

  // !!!! BUG CHANGE THE WAY TO DISPLAY THE USER MESSAGES
  function displaySuperpowerMessage() {
    setTimeout(function createDivForSuperpower() {
      superpowerDivMessage.innerText =
        "To see more superpower of Superhero, click on the superhero's sign on the costume!";
      powerMessage.style.display = 'block';
      deleteMessage.style.display = 'none';
      superpowerDivMessage.innerText = " "
      messageDiv.append(superpowerDivMessage);
    }, 2000);
    //QUESTION 2 HOW TO DISSAPPEAR
    // superpowerDivMessage.innerText = " "
    // return messageDiv.remove()
  };
  img.disabled = true;
}

function getSavedCard() {
console.log("getSavedCard() called");
  return fetch(BASE_URL + '/heros')
    .then((response) => response.json())
    .then((herosResponse) =>
    	renderHeros(herosResponse)
    );
}

function renderHeros(herosResponse) {
   heros = herosResponse
	console.log("getSavedCard()  heros response: "+ JSON.stringify(heros))
	savedCardContainer.innerHTML = "";
      heros.forEach(function (hero) {
        renderHero(hero);
      });
}

function renderHero(hero) {
console.log("renderHero() called");
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

  likeButton.addEventListener('click', function (event) {

    // find another way to display that messages!!!!!!!!!!!
    if ((likeMessage.style.display === 'none')) {
      likeMessage.style.display = 'flex';
      notFindMessage.style.display = 'none';
      helloMessage.style.display = 'none';
      deleteMessage.style.display = 'none';
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
    if ((likeMessage.style.display === 'flex')) {
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
      deleteMessage.style.display = 'flex';
      likeMessage.style.display = 'none';
      helloMessage.style.display = 'none';
    }
  });
}

//-----------------------
// patch likes
//------------------------

function patchLikes(hero) {
  // debugger;
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
      // .then(getSavedCard())
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
// functions
//------------------------------

function getSearchRequest(userInput) {
  return (
    fetch(proxyURL + SEARCH_URL + `${userInput}`)
      .then((response) => response.json())
      // .then(function displayMessage('To see superpower of Superhero, click on the superhero sign on the costume!', "https://giphy.com/gifs/foxhomeent-kwCLw42hH2cxvIywIi"))
      .then((superhero) => {
      	helloMessage.style.display = 'none';
        if (superhero.response === 'error') {
          notFindMessage.style.display = 'block';
        } else {
          notFindMessage.style.display = 'none';
          makeCardSuperhero(superhero);
        }
      })
    // .then(displaySuperpowerMessage())
    // .catch(function handleError(error) {
    //   if (error) {
    //     notFindMessage.style.display = 'block';
    //   } else {
    //     notFindMessage.style.display = 'none';
    //   }
    //   // alert(
    //   //   "That superhero doesn't exist at our database. Let's create that one!"
    //   // );
    //   console.error(error);
    // })
  );
}

function helloUserMessage() {
  console.log(helloMessage.style.display);
  if (helloMessage.style.display === 'none') {
    helloMessage.style.display = 'block';
    deleteMessage.style.display = 'none';
//     notFindMessage.style.display = 'none';
  };
}

// function notFindHeroMessage() {
//   if (helloMessage.style.display = 'none');
//   notFindMessage.style.display = 'block';
// }

// function deleteMessage() {

// }


// if ((deleteMessage.style.display = 'none')) {
//   deleteMessage.style.display = 'flex';
//   likeMessage.style.display = 'none';
//   helloMessage.style.display = 'none';
// }

function createSavedSection() {
	const savedCardDiv = document.querySelector('#saved-cards')
	const savedCardTitle = document.createElement('div');
	savedCardTitle.id = '#saved-title'
	savedCardDiv.append(hr, savedCardTitle, savedCardContainer)
	
	const h2 = document.createElement('h2');
	h2.innerText = 'SAVED CARD';
	savedCardTitle.append(h2);
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


//ERRORS !!!! heroID hero_id 

// NOT WORKING THE LINE 440 

// comment backend 

// during save card is showing wrong card - Frontend ????

// remove card - frontend 