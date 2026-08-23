const skins = [
    { name: "P250 | Песчаная дюна", price: 10, rarity: "common", img: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=150&auto=format&fit=crop&q=80" },
    { name: "AK-47 | Сафари сет", price: 40, rarity: "common", img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=150&auto=format&fit=crop&q=80" },
    { name: "M4A4 | Отрешение", price: 120, rarity: "rare", img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=150&auto=format&fit=crop&q=80" },
    { name: "AWP | Морской вор", price: 350, rarity: "epic", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=150&auto=format&fit=crop&q=80" },
    { name: "Karambit | Водная струя", price: 2500, rarity: "legendary", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80" }
];

let balance = 1000;
let inventory = [];
const casePrice = 150;

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
