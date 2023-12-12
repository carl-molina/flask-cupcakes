d;// TODO: function jQuery objects

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
  return `
    <div class="list-group" id=${cupcake.id}>
      <a
        href="${BASE_URL}${cupcake.id}"
        class="list-group-item list-group-item-action list-group-item-primary"
      >
        ${cupcake.flavor} - Rating: ${cupcake.rating}
      </a>
    </div>
  `;
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