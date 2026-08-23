const casesData = [
    {
        id: 1,
        name: "Оружейный кейс #1",
        price: 150,
        skins: [
            { name: "P250 | Песчаная дюна", price: 10, rarity: "common", icon: "🔫" },
            { name: "AK-47 | Сафари сет", price: 40, rarity: "common", icon: "🔥" },
            { name: "M4A4 | Отрешение", price: 120, rarity: "rare", icon: "🛡️" },
            { name: "AWP | Морской вор", price: 350, rarity: "epic", icon: "🎯" },
            { name: "Karambit | Водная струя", price: 2500, rarity: "legendary", icon: "🗡️" }
        ]
    },
    {
        id: 2,
        name: "Премиум кейс",
        price: 500,
        skins: [
            { name: "USP-S | Убийство", price: 200, rarity: "rare", icon: "🔫" },
            { name: "Desert Eagle | Пламя", price: 700, rarity: "epic", icon: "🔥" },
            { name: "Butterfly | Градиент", price: 5000, rarity: "legendary", icon: "🗡️" }
        ]
    }
];

// Загрузка данных игрока (по умолчанию баланс 0 для новых)
let currentUser = localStorage.getItem('case_user_gmail') || null;
let balance = localStorage.getItem('case_balance') !== null ? parseInt(localStorage.getItem('case_balance')) : 0;
let inventory = localStorage.getItem('case_inventory') ? JSON.parse(localStorage.getItem('case_inventory')) : [];

let currentCase = null;
let selectedSourceItem = null;
let selectedTargetItem = null;

function saveGameData() {
    localStorage.setItem('case_balance', balance);
    localStorage.setItem('case_inventory', JSON.stringify(inventory));
    if (currentUser) {
        localStorage.setItem('case_user_gmail', currentUser);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const balanceEl = document.getElementById('balance');
    if (balanceEl) balanceEl.innerText = balance;

    if (!currentUser) {
        document.getElementById('authModal').style.display = 'flex';
    } else {
        updateUserUI();
    }

    renderCases();
    updateInventoryUI();
});

function updateUserUI() {
    const emailDisplay = document.getElementById('userEmailDisplay');
    if (emailDisplay && currentUser) {
        emailDisplay.innerText = currentUser;
    }
}

function registerWithGmail() {
    const input = document.getElementById('gmailInput').value.trim();
    if (!input || !input.endsWith('@gmail.com')) {
        alert("Пожалуйста, введите корректный адрес @gmail.com");
        return;
    }
    currentUser = input;
    saveGameData();
    updateUserUI();
    document.getElementById('authModal').style.display = 'none';
}

function renderCases() {
    const grid = document.getElementById('casesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    casesData.forEach(c => {
        const card = document.createElement('div');
        card.className = 'case-card';
        card.onclick = () => selectCase(c.id);
        card.innerHTML = `
            <div style="font-size: 50px; margin: 15px 0;">🎁</div>
            <div class="case-card-title">${c.name}</div>
            <div class="case-card-price">${c.price} ₽</div>
        `;
        grid.appendChild(card);
    });
}

function switchTab(tabId, event) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId === 'cases' ? 'tab-cases' : `tab-${tabId}`).classList.add('active');
    if (event && event.target.classList.contains('nav-btn')) event.target.classList.add('active');
}

// Функция проверки платежа
function checkPayment() {
    const btn = document.getElementById('checkPaymentBtn');
    const resultDiv = document.getElementById('depositResultText');
    
    btn.disabled = true;
    resultDiv.innerHTML = `<span style="color: #3b82f6;">Проверяем платеж в системе Т-Банк...</span>`;

    setTimeout(() => {
        // Добавляем тестовые 1000 рублей (можешь изменить сумму)
        let addedAmount = 1000;
        balance += addedAmount;
        balanceEl.innerText = balance;
        saveGameData();

        resultDiv.innerHTML = `<span style="color: #2ed573;">Платеж успешно найден! Зачислено: +${addedAmount} ₽</span>`;
        btn.disabled = false;
    }, 2500);
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
    if (!track) return;
    track.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const skin = getRandomSkinFromCase();
        const card = document.createElement('div');
        card.className = `skin-card rarity-${skin.rarity}`;
        card.innerHTML = `
            <div style="font-size: 35px;">${skin.icon}</div>
            <div class="skin-name">${skin.name}</div>
        `;
        track.appendChild(card);
    }
    track.style.left = '0px';
}

function openCurrentCase() {
    if (balance < currentCase.price) {
        alert("Недостаточно средств! Пополните баланс во вкладке «Пополнить».");
        switchTab('deposit');
        return;
    }
    balance -= currentCase.price;
    balanceEl.innerText = balance;
    saveGameData();

    openBtn.disabled = true;
    resultText.innerText = "Крутим...";

    initTrack();
    const winningIndex = 35;
    const winningSkin = getRandomSkinFromCase();
    
    const cards = track.children;
    cards[winningIndex].className = `skin-card rarity-${winningSkin.rarity}`;
    cards[winningIndex].innerHTML = `
        <div style="font-size: 35px;">${winningSkin.icon}</div>
        <div class="skin-name">${winningSkin.name}</div>
    `;

    const cardWidth = 120;
    const windowWidth = document.querySelector('.roulette-window').offsetWidth;
    const offset = (winningIndex * cardWidth) - (windowWidth / 2) + (cardWidth / 2) + (Math.random() * 40 - 20);

    track.style.left = `-${offset}px`;

    setTimeout(() => {
        inventory.push({ ...winningSkin, id: Date.now() + Math.random() });
        saveGameData();
        updateInventoryUI();
        resultText.innerHTML = `Вы выиграли: <span style="color: #2ed573;">${winningSkin.name}</span>`;
        openBtn.disabled = false;
    }, 4000);
}

function updateInventoryUI() {
    if (!invCountEl || !inventoryGrid) return;
    invCountEl.innerText = inventory.length;
    if (inventory.length === 0) {
        inventoryGrid.innerHTML = `<div class="empty-inv">Инвентарь пуст</div>`;
        return;
    }
    inventoryGrid.innerHTML = '';
    inventory.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = `inv-item rarity-${item.rarity}`;
        itemEl.innerHTML = `
            <div style="font-size: 30px;">${item.icon}</div>
            <div class="skin-name">${item.name}</div>
            <button class="sell-btn" onclick="sellSkin(${index})">Продать ${item.price}₽</button>
        `;
        inventoryGrid.appendChild(itemEl);
    });
}

function sellSkin(index) {
    balance += inventory.splice(index, 1)[0].price;
    balanceEl.innerText = balance;
    saveGameData();
    updateInventoryUI();
}

function openSelectModal(mode) {
    const modal = document.getElementById('selectModal');
    const modalGrid = document.getElementById('modalGrid');
    modal.style.display = 'flex';
    modalGrid.innerHTML = '';

    if (mode === 'source') {
        document.getElementById('modalTitle').innerText = "Выберите ваш скин";
        inventory.forEach((item, index) => {
            modalGrid.innerHTML += `
                <div class="inv-item rarity-${item.rarity}">
                    <div style="font-size: 30px;">${item.icon}</div>
                    <div class="skin-name">${item.name}</div>
                    <button class="sell-btn" style="background:#ff4757;" onclick="selectSource(${index})">Выбрать</button>
                </div>`;
        });
    } else {
        document.getElementById('modalTitle').innerText = "Желаемый скин";
        casesData.forEach(c => c.skins.forEach(item => {
            modalGrid.innerHTML += `
                <div class="inv-item rarity-${item.rarity}">
                    <div style="font-size: 30px;">${item.icon}</div>
                    <div class="skin-name">${item.name}</div>
                    <button class="sell-btn" style="background:#3b82f6;" onclick='selectTarget(${JSON.stringify(item)})'>Хочу</button>
                </div>`;
        }));
    }
}

function closeSelectModal() { document.getElementById('selectModal').style.display = 'none'; }

function selectSource(index) {
    selectedSourceItem = inventory.splice(index, 1)[0];
    saveGameData();
    updateInventoryUI();
    document.getElementById('upgradeSourceSlot').innerHTML = `<div style="font-size:25px;">${selectedSourceItem.icon}</div><div>${selectedSourceItem.name}</div>`;
    closeSelectModal();
    checkUpgrade();
}

function selectTarget(item) {
    selectedTargetItem = item;
    document.getElementById('upgradeTargetSlot').innerHTML = `<div style="font-size:25px;">${selectedTargetItem.icon}</div><div>${selectedTargetItem.name}</div>`;
    closeSelectModal();
    checkUpgrade();
}

function checkUpgrade() {
    if (selectedSourceItem && selectedTargetItem) {
        let chance = (selectedSourceItem.price / selectedTargetItem.price) * 95;
        if (chance > 90) chance = 90;
        document.getElementById('upgradeChance').innerText = chance.toFixed(1);
        document.getElementById('upgradeBtn').disabled = false;
    }
}

function startUpgrade() {
    document.getElementById('upgradeBtn').disabled = true;
    setTimeout(() => {
        let chance = parseFloat(document.getElementById('upgradeChance').innerText);
        if (Math.random() * 100 <= chance) {
            inventory.push({ ...selectedTargetItem, id: Date.now() });
            document.getElementById('upgradeResultText').innerHTML = `<span style="color:#2ed573">Успех!</span>`;
        } else {
            document.getElementById('upgradeResultText').innerHTML = `<span style="color:#ff4757">Неудача!</span>`;
        }
        saveGameData();
        updateInventoryUI();
        selectedSourceItem = null; selectedTargetItem = null;
        document.getElementById('upgradeSourceSlot').innerHTML = `<span>Выберите скин</span>`;
        document.getElementById('upgradeTargetSlot').innerHTML = `<span>Выберите скин</span>`;
        document.getElementById('upgradeChance').innerText = "0";
    }, 2000);
}
