// TODO: function jQuery objects

// TODO: Create HTML for each cupcake
// TODO: Get list of cupcakes from API
// TODO: Show list on HTML via generator

const BASE_URL = '/api/cupcakes/';

const $cupcakeForm = $("#new_cupcake_form");
const $cupcakeList = $("#cupcake_list_container");


async function getCupcakes() {
  console.debug('getCupcakes ran!');
  const resp = await fetch(`${BASE_URL}`, {
    method: "GET",
  });

  const cupcakeData = await resp.json();
  console.log('This is cupcakeData', cupcakeData);

  return cupcakeData.cupcakes;
}

function generateCupcakeHTML(cupcake) {

  return $(`
  <a href="${cupcape.id}>
  <li id="${cupcake.id}">
    ${showDeleteBtn ? getDeleteBtnHTML() : ""}
    ${showStar ? getStarHTML(story, currentUser) : ""}
    <a href="${story.url}" target="a_blank" class="story-link">
      ${story.title}
    </a>
    <small class="story-hostname">(${hostName})</small>
    <small class="story-author">by ${story.author}</small>
    <small class="story-user">posted by ${story.username}</small>
  </li>
`);
}




function putCupcakesOnPage(cupcakes) {

  $cupcakeList.empty();

  for (const cupcake of cupcakes) {
    flavor = cupcake.flavor;
    size = cupcake.size;
    rating = cupcake.rating;
    image_url = cupcake.image_url;
  }


}