// Base conversion formula constants
const SPICE_SAND_PER_CRAFT = 10000; // 10,000 spice sand per craft
const MELANGE_PER_CRAFT = 200;      // 200 melange per craft
const RESIDUE_PER_CRAFT = 1000;     // 1,000 residue per craft
const VOLUME_PER_SPICE_SAND = 0.15; // 1 spice sand = 0.15 volume

let discountActive = false;
const discountToggle = document.getElementById('discount-toggle');
const discountLabel = document.getElementById('discount-label');
const modeToggle = document.getElementById('mode-toggle');
const modeLabel = document.getElementById('mode-label');
const mainInput = document.getElementById('main-input');
const mainInputLabel = document.getElementById('main-input-label');

let isVolumeMode = false;

function updateModeUI() {
    isVolumeMode = modeToggle.checked;
    if (isVolumeMode) {
        modeLabel.textContent = 'Volume Mode';
        mainInputLabel.textContent = 'Total Volume:';
        mainInput.placeholder = 'Enter volume...';
    } else {
        modeLabel.textContent = 'Spice Sand Mode';
        mainInputLabel.textContent = 'Total Spice Sand:';
        mainInput.placeholder = 'Enter spice sand...';
    }
    mainInput.value = '';
    debounceCalculate();
}

modeToggle.addEventListener('change', updateModeUI);

discountToggle.addEventListener('change', function() {
    discountActive = discountToggle.checked;
    discountLabel.textContent = discountActive ? '25% Discount Applied' : 'Apply 25% Discount';
    clearTimeout(debounceTimer);
    calculateResources();
});

function calculateResources() {
    const participants = parseInt(document.getElementById('participants').value) || 1;
    let totalSpiceSand = 0;
    if (isVolumeMode) {
        const volume = parseFloat(mainInput.value) || 0;
        totalSpiceSand = volume ? volume / VOLUME_PER_SPICE_SAND : 0;
    } else {
        totalSpiceSand = parseFloat(mainInput.value) || 0;
    }

    // Use correct conversion rates based on discount
    let sandPerCraft, melangePerCraft, residuePerCraft;
    if (discountActive) {
        sandPerCraft = SPICE_SAND_PER_CRAFT;
        melangePerCraft = 250;
        residuePerCraft = 1250;
    } else {
        sandPerCraft = SPICE_SAND_PER_CRAFT;
        melangePerCraft = MELANGE_PER_CRAFT;
        residuePerCraft = RESIDUE_PER_CRAFT;
    }

    // Calculate melange and residue proportionally
    const totalMelange = (totalSpiceSand / sandPerCraft) * melangePerCraft;
    const totalResidue = (totalSpiceSand / sandPerCraft) * residuePerCraft;

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

mainInput.addEventListener('input', debounceCalculate);
document.getElementById('participants').addEventListener('input', debounceCalculate);

// Initialize UI
updateModeUI();