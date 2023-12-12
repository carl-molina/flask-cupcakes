// TODO: function jQuery objects

const BASE_URL = '/api/cupcakes';

const $cupcakeForm = $("#new_cupcake_form");
const $cupcakeList = $("#cupcake-list-container");

/**
 * Gets the current cupcakes from the database
 * @returns An array of Cupcake Objects
 */

async function getCupcakes() {
  console.debug('getCupcakes ran!');
  const resp = await fetch("api/cupcakes");

  const cupcakeData = await resp.json();

  console.log('This is cupcakeData', cupcakeData);
  console.log('This is cupcakeData.cupcakes in getCupcakes: ', cupcakeData.cupcakes);

  return cupcakeData.cupcakes;
}


/**
 *
 * @param {object} cupcake - A singular cupcake object
 * @returns HTML markup for each cupcake list element
 */

function generateCupcakeHTML(cupcake) {
  console.debug("generateCupcakeHTML ran!");
  return `
    <div class="list-group" id=${cupcake.id}>
      <a
        href="${BASE_URL}/${cupcake.id}"
        class="list-group-item list-group-item-action list-group-item-primary"
      >
        ${cupcake.flavor} - Rating: ${cupcake.rating}
      </a>
    </div>
  `;
}


/**
 * Generate the HTML for each cupcake in database and append to $cupcakeList
 * @param {obj[]} cupcakes - Array of Cupcake Objects
 * DOES NOT RETURN, converts HTML in into jQuery object and appends
 * to $cupcakeList
 */

function putCupcakesOnPage(cupcakes) {
  console.debug("putCupcakesOnPage ran!");
  // $cupcakeList.empty();

  for (let cupcake of cupcakes) {
    let $cupcake = generateCupcakeHTML(cupcake);
    // flavor = cupcake.flavor;
    // size = cupcake.size;
    // rating = cupcake.rating;
    // image_url = cupcake.image_url;
    $cupcakeList.append($cupcake);
  }
}

/**
 * Starter helper function
 */

async function start() {
  const cupcakes = await getCupcakes();
  putCupcakesOnPage(cupcakes);
}

start();