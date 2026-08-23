// База доступных кейсов и их содержимого
const casesData = [
    {
        id: 1,
        name: "Оружейный кейс #1",
        price: 150,
        img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' fill='%23182030' rx='20'/><text x='50' y='55' font-size='45' text-anchor='middle' dominant-baseline='middle'>🎁</text></svg>",
        skins: [
            { name: "P250 | Песчаная дюна", price: 10, rarity: "common", img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🔫</text></svg>" },
            { name: "AK-47 | Сафари сет", price: 40, rarity: "common", img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🔥</text></svg>" },
            { name: "M4A4 | Отрешение", price: 120, rarity: "rare", img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🛡️</text></svg>" },
            { name: "AWP | Морской вор", price: 350, rarity: "epic", img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🎯</text></svg>" },
            { name: "Karambit | Водная струя", price: 2500, rarity: "legendary", img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🗡️</text></svg>" }
        ]
    },
    {
        id: 2,
        name: "Премиум кейс",
        price: 500,
        img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><rect width='100' height='100' fill='%23182030' rx='20'/><text x='50' y='55' font-size='45' text-anchor='middle' dominant-baseline='middle'>💎</text></svg>",
        skins: [
            { name: "USP-S | Убийство подтверждено", price: 200, rarity: "rare", img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🔫</text></svg>" },
            { name: "Desert Eagle | Пламя", price: 700, rarity: "epic", img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🔥</text></svg>" },
            { name: "Butterfly | Градиент", price: 5000, rarity: "legendary", img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><text x='50' y='55' font-size='40' text-anchor='middle' dominant-baseline='middle'>🗡️</text></svg>" }
        ]
    }
];

let balance = 1000;
let inventory = [];
let currentCase = null;

let selectedSourceItem = null;
let selectedTargetItem = null;
let selectMode = '';

// Рендер сетки кейсов на главной
function renderCases() {
    const grid = document.getElementById('casesGrid');
    grid.innerHTML = '';
    casesData.forEach(c => {
        const card = document.createElement('div');
        card.className = 'case-card';
        card.onclick = () => selectCase(c.id);
        card.innerHTML = `
            <img src="${c.img}" alt="${c.name}">
            <div class="case-card-title">${c.name}</div>
            <div class="case-card-price">${c.price} ₽</div>
        `;
        grid.appendChild(card);
    });
}

renderCases();

function switchTab(tabId, event) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    if (tabId === 'cases') {
        document.getElementById('tab-cases').classList.add('active');
        if (event && event.target.classList.contains('nav-btn')) event.target.classList.add('active');
    } else {
        document.getElementById(`tab-${tabId}`).classList.add('active');
        if (event && event.target.classList.contains('nav-btn')) event.target.classList.add('active');
    }
}

function selectCase(caseId) {
    currentCase = casesData.find(c => c.id === caseId);
    document.getElementById('activeCaseTitle').innerText = currentCase.name;
    document.getElementById('activeCasePrice').innerText = currentCase.price;
    
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-case-open').classList.add('active');
    
    initTrack();
}

function getRandomSkinFromCase() {
    const skins = currentCase.skins;
    const rand = Math.random() * 100;
    if (skins.length === 3) {
        if (rand < 70) return skins[0];
        if (rand < 95) return skins[1];
        return skins[2];
    }
    if (rand < 55) return skins[0];
    if (rand < 80) return skins[1];
    if (rand < 93) return skins[2];
    if (rand < 98.5) return skins[3];
    return skins[4];
}

const track = document.getElementById('track');
const balanceEl = document.getElementById('balance');
const openBtn = document.getElementById('openBtn');
const resultText = document.getElementById('resultText');
const invCountEl = document.getElementById('invCount');
const inventoryGrid = document.getElementById('inventoryGrid');

function initTrack() {
    track.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const skin = getRandomSkinFromCase();
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

function openCurrentCase() {
    if (balance < currentCase.price) {
        alert("Недостаточно средств на балансе!");
        return;
    }

    balance -= currentCase.price;
    balanceEl.innerText = balance;
    openBtn.disabled = true;
    resultText.innerText = "Крутим рулетку...";
    resultText.style.color = "#ffa502";

    initTrack();
    const winningIndex = 35;
    const winningSkin = getRandomSkinFromCase();
    
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
        inventoryGrid.innerHTML = `<div class="empty-inv">Инвентарь пуст. Откройте кейсы во вкладке «Кейсы»!</div>`;
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

// Апгрейды
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
        // Собираем все скины со всех кейсов для выбора цели
        let allSkins = [];
        casesData.forEach(c => allSkins.push(...c.skins));

        allSkins.forEach((item) => {
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
