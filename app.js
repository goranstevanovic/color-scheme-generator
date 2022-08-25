'use strict';

const seedColorInput = document.getElementById('seed-color');
const colorSchemeInput = document.getElementById('color-scheme');
const colorQtyInput = document.getElementById('color-qty');
const getColorSchemeBtn = document.getElementById('get-color-scheme');

async function getColorScheme(seedColor, colorScheme, colorQty) {
  const res = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor}&format=json&mode=${colorScheme}&count=${colorQty}`
  );
  const data = await res.json();
  return data;
}

function displayColorScheme(colors) {
  const colorListEl = document.getElementById('color-list');

  const colorsEl = colors.map((color) => {
    return `
      <div class="color">
      <div class="color-swatch" style="background-color: ${color.hex.value};"></div>
      <div class="color-info">
        <p class="color-code">${color.hex.value}</p>
        <p class="color-code">${color.rgb.value}</p>
        <p class="color-code">${color.hsl.value}</p>
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

getColorSchemeBtn.addEventListener('click', handleGetColorScheme);
