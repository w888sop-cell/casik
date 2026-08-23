const skins = [
    { name: "P250 | Песчаная дюна", price: 10, rarity: "common", img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJD_9W7m5O0m_7zO6_um1Rd6ct0j9bN8onzjFWx-ktqa2-iJtSRdwZvYwqDqVW-ye3vjMW5vp6YzHc373En7GqMl0a-101HPayh/360fx360f" },
    { name: "AK-47 | Сафари сет", price: 40, rarity: "common", img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV092lnYmOhOTLPr7Vj35cppRz2r2Tptqi3lKx_hc4YmD0J4_BcAA3Zg7Zqle3k-_mg5a6vprPzyVl7CJ2sH7UmUa_00kca7Nrhu6A/360fx360f" },
    { name: "M4A4 | Отрешение", price: 120, rarity: "rare", img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCl3wev5V1j-vIoImn2AXkqkVuazqicNWRIQU8N1uC-1a7kuq8gpXru8yfz3NnvXZ25HaOzBOy005LNuNqhuw/360fx360f" },
    { name: "AWP | Морской вор", price: 350, rarity: "epic", img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FBRw7P7NcIQh7v-JmImMn-O6OrzZghUC68Bz3b2UooztjgO3_kVoN2_xLI6ddgM3YlzV_Fm7xLro1ce_6pudySZkuicr5yremhCzhxlEcuJt2v7JWQ/360fx360f" },
    { name: "Karambit | Водная струя", price: 2500, rarity: "legendary", img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotuKkFABz7PLfYQJD_9W7m5O0m_7zO6_um1Rd6ct0j9bN8onzjFWx-ktqa2-iJtSRdwZvYwqDqVW-ye3vjMW5vp6YzHc373En7GqMl0a-101HPayh/360fx360f" }
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
