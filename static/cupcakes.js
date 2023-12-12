// TODO: function jQuery objects

const BASE_URL = '/api/cupcakes';

const $cupcakeForm = $("#new-cupcake-form");
const $cupcakeList = $("#cupcake-list-container");

/**
 * Gets the current cupcakes from the database
 * @returns An array of Cupcake Objects
 */

async function getCupcakes() {
  console.debug('getCupcakes ran!');
  const resp = await fetch(BASE_URL);

  const cupcakeData = await resp.json();

  console.log('This is cupcakeData', cupcakeData);
  console.log('This is cupcakeData.cupcakes in getCupcakes: ', cupcakeData.cupcakes);

  return cupcakeData.cupcakes;
}


/**
 * Generate the HTML for a cupcake card
 * @param {object} cupcake - A singular cupcake object
 * @returns HTML markup for each cupcake
 */

function generateCupcakeHTML(cupcake) {
  console.debug("generateCupcakeHTML ran!");

  return `
    <div class="card" style="width: 18rem;">
      <img src="${cupcake.image_url}" class="card-img-top" alt="Image of a cupcake">
        <div class="card-body">
          <h5 class="card-title">Flavor: ${cupcake.flavor}</h5>
          <p class="card-text">Rating: ${cupcake.rating}</p>
          <p class="card-text">Size: ${cupcake.size}</p>
        </div>
      </div>
  `;


  // return `
  //   <div class="list-group" id=${cupcake.id}>
  //     <a
  //       href="${BASE_URL}/${cupcake.id}"
  //       class="list-group-item list-group-item-action list-group-item-primary"
  //     >
  //       ${cupcake.flavor} - Rating: ${cupcake.rating}
  //     </a>
  //   </div>
  // `;
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

  for (let cupcakeData of cupcakes) {
    let cupcake = generateCupcakeHTML(cupcakeData);
    // flavor = cupcake.flavor;
    // size = cupcake.size;
    // rating = cupcake.rating;
    // image_url = cupcake.image_url;
    $cupcakeList.append(cupcake);
  }
}

async function submitNewCupcake(evt) {
  console.debug('submitNewCupcake');
  evt.preventDefault();

  const flavor = $("#cupcake-flavor").val();
  const size = $("#cupcake-size").val();
  const rating = $("#cupcake-rating").val();
  const image_url = $("#cupcake-image").val();

  const formData = await fetch('/api/cupcakes', {
    method: "POST",
    body: JSON.stringify({
      flavor, rating, size, image_url,
    }),
    headers: {
      "content-type": "application/json"
    }
  });

  const cupcakeData = await formData.json();

  const newCupcake = generateCupcakeHTML(cupcakeData.cupcake);

  $cupcakeList.append(newCupcake);
}

$cupcakeForm.on("submit", submitNewCupcake);



/**
 * Starter helper function
 */

async function start() {
  const cupcakes = await getCupcakes();
  putCupcakesOnPage(cupcakes);
}

start();