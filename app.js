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
  console.log(colorSchemeData);
}

getColorSchemeBtn.addEventListener('click', handleGetColorScheme);
