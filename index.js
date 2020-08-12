//-----------------------------
// Const
//-----------------------------

const body = document.querySelector('body');
BASE_URL = 'https://superheroapi.com/api/3111268965575899/search/';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

const header = document.querySelector('#header');
const searchDiv = document.querySelector('#search-div');
const messagesDiv = document.querySelector('#messages-div');
const card = document.querySelector('#card');
const savedCard = document.querySelector('#saved-card');

const h2 = document.createElement('h2');
h2.innerText = 'SAVED CARD';
savedCard.append(h2);

const br = document.createElement('br');

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

const cardSuperheroDiv = document.createElement('div');
cardSuperheroDiv.classList = 'card';

const gif = document.createElement('img');

const savedCardSuperhero = document.createElement('div');
savedCardSuperhero.classList = 'card';
savedCard.append(savedCardSuperhero);

const saveButton = document.createElement('button');
saveButton.classList.add('btn-save');
saveButton.innerText = 'Save';

//------------------------------------
// Message section
//------------------------------------

// gif.src = "https://giphy.com/gifs/reaction-mood-57ZvMMkuBIVMlU88Yh"

function displayMessage(content, gifSrc) {
  superpowerDivMessage.innerText = content;
  gif.classList = 'gif';
  gif.src = gifSrc;
  messageDiv.append(superpowerDivMessage, gif);
}

// function displayMessage ('To see superpower of Superhero, click on the superhero sign on the costume!', "https://giphy.com/gifs/foxhomeent-kwCLw42hH2cxvIywIi")

// --------------------------------
// ??????????????????????????????
// -------------------------------------

// function toggleMessage(event, message) {
//   event.preventDefault();

//   if (message.style.display === 'none') {
//     image.style.display = 'block';
//     event.target.innerText = 'Hide Character';
//   } else {
//     message.style.display = 'none';
//     event.target.innerText = 'Show Character';
//   }
// }

//---------------------------------
// Search div
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
    //  debugger

    // helloMessage.style.display = 'none';
    // notFindMessage.style.display = 'none';
    const userInput = event.target.previousSibling.value;
    // debugger
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
// Make a Superhero Card
//-----------------------------

function makeCardSuperhero(superhero) {
  // debugger;
  //--h1
  const h1 = document.createElement('h1');
  h1.innerText = superhero.results[0].name;

  img.src = superhero.results[0].image.url;

  displaySuperpowerMessage();

  img.addEventListener('click', function (event) {
    //-- li powerstats section

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

    stats1Li.style.textAlign = 'center';
    stats2Li.style.textAlign = 'center';
    stats3Li.style.textAlign = 'center';
    stats4Li.style.textAlign = 'center';

    statsUl.append(stats1Li, stats2Li, stats3Li, stats4Li);

    cardSuperheroDiv.append(statsUl, saveButton);

    // save button
    // saveMessage.style.display = 'block'
    saveButton.addEventListener('click', function (event) {
      if ((saveMessage.style.display = 'none')) {
        saveMessage.style.display = 'block';
        likeMessage.style.display = 'none';
        notFindMessage.style.display = 'none';
        helloMessage.style.display = 'none';
        powerMessage.style.display = 'none';
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

      return (
        fetch('http://localhost:3000/heros', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(object),
        })
          .then((response) => response.json())
          .then(getSavedCard())
          .then(() => {
            if ((saveMessage.style.display = 'block')) {
              saveMessage.style.display = 'none';
            }
          })
          // .then(renderHero(object))
          .catch(function handleError(error) {
            console.log('there was an error posting the data');
            console.error(error);
          })
      );
    });
  });

  // -----------------------------
  // appending elements to body
  //------------------------------
  cardSuperheroDiv.append(h1, img, br, superpowerDiv, br);

  messagesDiv.append(messageDiv);
  card.append(cardSuperheroDiv);

  // body.append(messageDiv, cardSuperheroDiv, likeDiv, form );
  // displaySuperpowerMessage();
  function displaySuperpowerMessage() {
    setTimeout(function createDivForSuperpower() {
      // superpowerDivMessage.innerText =
      //   "To see more superpower of Superhero, click on the superhero's sign on the costume!";
      powerMessage.style.display = 'block';
      messageDiv.append(superpowerDivMessage);
    }, 2000);
    //QUESTION 2 HOW TO DISSAPPEAR
    // superpowerDivMessage.innerText = " "
    // return messageDiv.remove()
  }
}

function getSavedCard() {
  return fetch('http://localhost:3000/heros')
    .then((response) => response.json())
    .then((heros) =>
      heros.forEach(function (hero) {
        renderHero(hero);
      })
    );
}

function renderHero(hero) {
  //--h1
  const h1 = document.createElement('h1');
  h1.innerText = hero.name;

  //--img
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

  statsUl.append(br, stats1Li, stats2Li, stats3Li, stats4Li);

  //-------------------
  //-- like section
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
    // debugger;
    // find another way to display that messages!!!!!!!!!!!
    if ((likeMessage.style.display = 'none')) {
      likeMessage.style.display = 'flex';
      notFindMessage.style.display = 'none';
      helloMessage.style.display = 'none';
    }

    hero.likes = hero.likes + 1;
    patchLikes({ 
      id: hero.id, 
      likes: hero.likes 
    });

    span.innerText = `${hero.likes} likes`;
  });

  //--------------------
  // -- comment section
  //--------------------

  const commentsUl = document.createElement('ul');
  commentsUl.classList.add('info-ul');

  hero.comments.forEach((comment) => {
    console.log(comment.content)
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
    if ((likeMessage.style.display = 'flex')) {
      likeMessage.style.display = 'none';
    }
    // debugger
    event.preventDefault();

    const newComment = {
      content: form[0].value,
    };

    fetch('http://localhost:3000/comments', {
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
  deleteButton.innerText = 'Delete Superhero';

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
  savedCard.append(br, br, br, savedCardSuperhero);

  deleteButton.addEventListener('click', function (event) {
    // debugger

    deleteSuperhero(hero);
    // savedCardSuperhero.remove();

    if ((deleteMessage.style.display = 'none')) {
      deleteMessage.style.display = 'flex';
      likeMessage.style.display = 'none';
      helloMessage.style.display = 'none';
    }

    // const card = document.querySelector('#card');
    // card.remove();

  });
}

//-----------------------
// Patch
//------------------------

function patchLikes(hero) {
  // debugger;
  return (
    fetch(`http://localhost:3000/heros/${hero.id}`, {
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
// Delete
//----------------------

function deleteSuperhero(hero) {
  return fetch(`http://localhost:3000/heros/${hero.id}`, {
    method: 'DELETE',
  }).then((response) => response.json);
  // .then(getSavedCard());
}

//------------------------------
// functions
//------------------------------

function getSearchRequest(userInput) {
  return (
    fetch(proxyURL + BASE_URL + `${userInput}`)
      .then((response) => response.json())
      // .then(function displayMessage('To see superpower of Superhero, click on the superhero sign on the costume!', "https://giphy.com/gifs/foxhomeent-kwCLw42hH2cxvIywIi"))
      .then((superhero) => {
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
  if (helloMessage.style.display = 'block') { 
    notFindMessage.style.display = 'none'
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

//-----------------------------
// invoke the master function
//------------------------------
function unit() {
  // helloUserMessage()
  makeDivForSearching();
  getSearchRequest();
  getSavedCard();
}

unit();


//ERRORS !!!! heroID hero_id 

// NOT WORKING THE LINE 440 

// comment backend 

// during save card is showing wrong card - Frontend ????

// remove card - frontend 