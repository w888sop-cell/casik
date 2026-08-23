// Используем встроенные графические иконки (SVG в коде), которые работают 100% без интернета и внешних сайтов
const skins = [
    { 
        name: "P250 | Песчаная дюна", 
        price: 10, 
        rarity: "common", 
        img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' fill='%231e2532'/><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🔫</text></svg>" 
    },
    { 
        name: "AK-47 | Сафари сет", 
        price: 40, 
        rarity: "common", 
        img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' fill='%231e2532'/><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🔥</text></svg>" 
    },
    { 
        name: "M4A4 | Отрешение", 
        price: 120, 
        rarity: "rare", 
        img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' fill='%231e2532'/><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🛡️</text></svg>" 
    },
    { 
        name: "AWP | Морской вор", 
        price: 350, 
        rarity: "epic", 
        img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' fill='%231e2532'/><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🎯</text></svg>" 
    },
    { 
        name: "Karambit | Водная струя", 
        price: 2500, 
        rarity: "legendary", 
        img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' fill='%231e2532'/><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🗡️</text></svg>" 
    }
];

let balance = 1000;
let inventory = [];
const casePrice = 150;

// Данные для апгрейда
let selectedSourceItem = null;
let selectedTargetItem = null;
let selectMode = '';

const track = document.getElementById('track');
const balanceEl = document.getElementById('balance');
const openBtn = document.getElementById('openBtn');
const resultText = document.getElementById('resultText');
const invCountEl = document.getElementById('invCount');
const inventoryGrid = document.getElementById('inventoryGrid');

function switchTab(tabId) {
    document.querySelectorAll('.container').forEach(c => c.classList.remove('active-tab'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`tab-${tabId}`).classList.add('active-tab');
    event.target.classList.add('active');
}

function getRandomSkin() {
    const rand = Math.random() * 100;
    if (rand < 55) return skins[0];
    if (rand < 80) return skins[1];
    if (rand < 93) return skins[2];
    if (rand < 98.5) return skins[3];
    return skins[4];
}

function initTrack() {
    track.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const skin = getRandomSkin();
        const card = document.createElement('div');
        card.className = `skin-card rarity-${skin.rarity}`;
        card.innerHTML = `
            <img src="${skin.img}" alt="${skin.name}">
            <div class="skin-name">${skin.name}</div>
        `;
        track.appendChild(card);
    }
    track.style.left = '0px';
}

initTrack();

function openCase() {
    if (balance < casePrice) {
        alert("Недостаточно средств на балансе!");
        return;
    }

    balance -= casePrice;
    balanceEl.innerText = balance;
    openBtn.disabled = true;
    resultText.innerText = "Крутим рулетку...";
    resultText.style.color = "#ffa502";

    initTrack();
    const winningIndex = 35;
    const winningSkin = getRandomSkin();
    
    const cards = track.children;
    cards[winningIndex].className = `skin-card rarity-${winningSkin.rarity}`;
    cards[winningIndex].innerHTML = `
        <img src="${winningSkin.img}" alt="${winningSkin.name}">
        <div class="skin-name">${winningSkin.name}</div>
    `;

    const cardWidth = 120;
    const windowWidth = document.querySelector('.roulette-window').offsetWidth;
    const offset = (winningIndex * cardWidth) - (windowWidth / 2) + (cardWidth / 2) + (Math.random() * 40 - 20);

    track.style.left = `-${offset}px`;

    setTimeout(() => {
        inventory.push({ ...winningSkin, id: Date.now() + Math.random() });
        updateInventoryUI();

        resultText.innerHTML = `Вы выиграли: <span style="color: #2ed573;">${winningSkin.name}</span> (${winningSkin.price} ₽)`;
        openBtn.disabled = false;
    }, 4000);
}

function updateInventoryUI() {
    invCountEl.innerText = inventory.length;
    if (inventory.length === 0) {
        inventoryGrid.innerHTML = `<div class="empty-inv">Инвентарь пуст. Откройте кейс, чтобы получить скины!</div>`;
        return;
    }

    inventoryGrid.innerHTML = '';
    inventory.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = `inv-item rarity-${item.rarity}`;
        itemEl.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="skin-name">${item.name}</div>
            <button class="sell-btn" onclick="sellSkin(${index})">Продать за ${item.price} ₽</button>
        `;
        inventoryGrid.appendChild(itemEl);
    });
}

function sellSkin(index) {
    const soldItem = inventory.splice(index, 1)[0];
    balance += soldItem.price;
    balanceEl.innerText = balance;
    updateInventoryUI();
}

// --- ЛОГИКА АПГРЕЙДА ---

function openSelectModal(mode) {
    selectMode = mode;
    const modal = document.getElementById('selectModal');
    const modalGrid = document.getElementById('modalGrid');
    modal.style.display = 'flex';
    modalGrid.innerHTML = '';

    if (mode === 'source') {
        document.getElementById('modalTitle').innerText = "Выберите ваш скин для ставки";
        if (inventory.length === 0) {
            modalGrid.innerHTML = `<div class="empty-inv">Инвентарь пуст!</div>`;
            return;
        }
        inventory.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = `inv-item rarity-${item.rarity}`;
            itemEl.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="skin-name">${item.name}</div>
                <button class="sell-btn" style="background:#ff4757;" onclick="selectSourceItem(${index})">Выбрать</button>
            `;
            modalGrid.appendChild(itemEl);
        });
    } else {
        document.getElementById('modalTitle').innerText = "Выберите желаемый скин";
        skins.forEach((item) => {
            const itemEl = document.createElement('div');
            itemEl.className = `inv-item rarity-${item.rarity}`;
            itemEl.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="skin-name">${item.name}</div>
                <button class="sell-btn" style="background:#3b82f6;" onclick='selectTargetItem(${JSON.stringify(item)})'>Желаю</button>
            `;
            modalGrid.appendChild(itemEl);
        });
    }
}

function closeSelectModal() {
    document.getElementById('selectModal').style.display = 'none';
}

function selectSourceItem(index) {
    selectedSourceItem = inventory[index];
    inventory.splice(index, 1);
    updateInventoryUI();

    document.getElementById('upgradeSourceSlot').innerHTML = `
        <img src="${selectedSourceItem.img}" style="width:60px; height:60px; object-fit:contain;">
        <div style="font-size:12px; margin-top:5px;">${selectedSourceItem.name}</div>
        <div style="color:#2ed573; font-weight:bold;">${selectedSourceItem.price} ₽</div>
    `;
    closeSelectModal();
    calculateUpgradeChance();
}

function selectTargetItem(item) {
    selectedTargetItem = item;
    document.getElementById('upgradeTargetSlot').innerHTML = `
        <img src="${selectedTargetItem.img}" style="width:60px; height:60px; object-fit:contain;">
        <div style="font-size:12px; margin-top:5px;">${selectedTargetItem.name}</div>
        <div style="color:#2ed573; font-weight:bold;">${selectedTargetItem.price} ₽</div>
    `;
    closeSelectModal();
    calculateUpgradeChance();
}

function calculateUpgradeChance() {
    const btn = document.getElementById('upgradeBtn');
    if (selectedSourceItem && selectedTargetItem) {
        let chance = (selectedSourceItem.price / selectedTargetItem.price) * 95;
        if (chance > 90) chance = 90;
        if (chance < 5) chance = 5;

        document.getElementById('upgradeChance').innerText = chance.toFixed(1);
        btn.disabled = false;
    }
}

function startUpgrade() {
    if (!selectedSourceItem || !selectedTargetItem) return;

    const btn = document.getElementById('upgradeBtn');
    const resultEl = document.getElementById('upgradeResultText');
    btn.disabled = true;
    resultEl.innerText = "Апгрейд запущен... Розыгрыш!";
    resultEl.style.color = "#ffa502";

    setTimeout(() => {
        const roll = Math.random() * 100;
        const currentChance = parseFloat(document.getElementById('upgradeChance').innerText);

        if (roll <= currentChance) {
            inventory.push({ ...selectedTargetItem, id: Date.now() + Math.random() });
            resultEl.innerHTML = `УСПЕХ! Вы выиграли <span style="color:#2ed573;">${selectedTargetItem.name}</span>!`;
            resultEl.style.color = "#2ed573";
        } else {
            resultEl.innerHTML = `НЕУДАЧА! Скин <span style="color:#ff4757;">${selectedSourceItem.name}</span> сгорел.`;
            resultEl.style.color = "#ff4757";
        }

        updateInventoryUI();

        selectedSourceItem = null;
        selectedTargetItem = null;
        document.getElementById('upgradeSourceSlot').innerHTML = `<span>Выберите скин</span>`;
        document.getElementById('upgradeTargetSlot').innerHTML = `<span>Выберите скин</span>`;
        document.getElementById('upgradeChance').innerText = "0";
    }, 2500);
}
