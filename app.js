'use strict';

const seedColorInput = document.getElementById('seed-color');
const colorSchemeInput = document.getElementById('color-scheme');
const colorQtyInput = document.getElementById('color-qty');
const getColorSchemeBtn = document.getElementById('get-color-scheme');
const colorListEl = document.getElementById('color-list');

async function getColorScheme(seedColor, colorScheme, colorQty) {
  const res = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor}&format=json&mode=${colorScheme}&count=${colorQty}`
  );
  const data = await res.json();
  return data;
}

function displayColorScheme(colors) {
  const colorsEl = colors.map((color) => {
    return `
      <div class="color">
      <div class="color-swatch" data-color-code="${color.hex.value}" style="background-color: ${color.hex.value};"></div>
      <div class="color-info">
        <p class="color-code" data-color-code="${color.hex.value}">${color.hex.value}</p>
        <p class="color-code" data-color-code="${color.rgb.value}">${color.rgb.value}</p>
        <p class="color-code" data-color-code="${color.hsl.value}">${color.hsl.value}</p>
      </div>
    </div>
    `;
  });

  colorListEl.innerHTML = colorsEl.join('');
}

async function handleGetColorScheme(e) {
  e.preventDefault();

  const seedColor = seedColorInput.value.substring(1);
  const colorScheme = colorSchemeInput.value;
  const colorQty = Number(colorQtyInput.value) - 1;

  const colorSchemeData = await getColorScheme(
    seedColor,
    colorScheme,
    colorQty
  );

  const colors = [colorSchemeData.seed, ...colorSchemeData.colors];
  displayColorScheme(colors);
}

function displayToastMessage(message) {
  let toastEl = null;

  if (document.getElementById('toast-message')) {
    toastEl = document.getElementById('toast-message');
    toastEl.remove();
  }

  toastEl = document.createElement('p');
  toastEl.id = 'toast-message';
  toastEl.classList.add('toast-message');
  toastEl.innerHTML = message;

  document.body.appendChild(toastEl);

  setTimeout(function () {
    toastEl.remove();
  }, 3000);
}

function handleColorCodeClick(e) {
  if (
    !e.target.classList.contains('color-swatch') &&
    !e.target.classList.contains('color-code')
  ) {
    console.log('not target');
    return;
  }

  const colorCode = e.target.dataset.colorCode;

  navigator.clipboard
    .writeText(colorCode)
    .then(function () {
      displayToastMessage(`Color code <b>${colorCode}</b> copied to clipboard`);
    })
    .catch(function (error) {
      displayToastMessage('There was an error when copying to clipboard');
    });
}

getColorSchemeBtn.addEventListener('click', handleGetColorScheme);

colorListEl.addEventListener('click', handleColorCodeClick);
