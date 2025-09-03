// Base conversion formula constants
const SPICE_SAND_PER_CRAFT = 10000; // 10,000 spice sand per craft
const MELANGE_PER_CRAFT = 200;      // 200 melange per craft
const RESIDUE_PER_CRAFT = 1000;     // 1,000 residue per craft
const DISCOUNTED_MELANGE_PER_CRAFT = 250; // Discounted melange per craft
const DISCOUNTED_RESIDUE_PER_CRAFT = 1250; // Discounted residue per craft
const VOLUME_PER_SPICE_SAND = 0.15; // 1 spice sand = 0.15 volume


let discountActive = false;
const discountToggle = document.getElementById('discount-toggle');
const discountLabel = document.getElementById('discount-label');

discountToggle.addEventListener('change', function() {
    discountActive = discountToggle.checked;
    discountLabel.textContent = discountActive ? '25% Discount Applied' : 'Apply 25% Discount';
    clearTimeout(debounceTimer);
    calculateResources();
});


function calculateResources() {
    const sandInput = document.getElementById('spice-sand-input');
    const volumeInput = document.getElementById('volume-input');
    const participants = parseInt(document.getElementById('participants').value) || 1;

    // Always get sand from the sand input (volume input will sync it)
    let totalSpiceSand = parseFloat(sandInput.value) || 0;

    // Use correct conversion rates based on discount
    const melangePerCraft = discountActive ? DISCOUNTED_MELANGE_PER_CRAFT : MELANGE_PER_CRAFT;
    const residuePerCraft = discountActive ? DISCOUNTED_RESIDUE_PER_CRAFT : RESIDUE_PER_CRAFT;

    // Calculate totals proportionally
    const totalMelange = (totalSpiceSand / SPICE_SAND_PER_CRAFT) * melangePerCraft;
    const totalResidue = (totalSpiceSand / SPICE_SAND_PER_CRAFT) * residuePerCraft;

    // Divide totals by participants if needed
    const spiceSandDisplay = (totalSpiceSand / participants).toFixed(2);
    const melangeDisplay = (totalMelange / participants).toFixed(2);
    const residueDisplay = (totalResidue / participants).toFixed(2);

    document.getElementById('spice-sand').innerText = spiceSandDisplay;
    document.getElementById('melange').innerText = melangeDisplay;
    document.getElementById('residue').innerText = residueDisplay;
}

// Debounce logic for live update
let debounceTimer;
function debounceCalculate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(calculateResources, 500);
}



const spiceSandInput = document.getElementById('spice-sand-input');
const volumeInput = document.getElementById('volume-input');

let lastChanged = null;

function syncFromSand() {
    if (lastChanged === 'sand') return;
    lastChanged = 'sand';
    const sand = parseFloat(spiceSandInput.value) || 0;
    // Update volume field
    volumeInput.value = sand ? (sand * VOLUME_PER_SPICE_SAND).toFixed(2) : '';
    debounceCalculate();
    lastChanged = null;
}

function syncFromVolume() {
    if (lastChanged === 'volume') return;
    lastChanged = 'volume';
    const volume = parseFloat(volumeInput.value) || 0;
    // Update sand field
    spiceSandInput.value = volume ? Math.round(volume / VOLUME_PER_SPICE_SAND) : '';
    debounceCalculate();
    lastChanged = null;
}

spiceSandInput.addEventListener('input', syncFromSand);
volumeInput.addEventListener('input', syncFromVolume);
document.getElementById('participants').addEventListener('input', debounceCalculate);