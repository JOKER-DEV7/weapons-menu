const resourceName = window.location.hostname || GetParentResourceName();

const weapons = [
    // === WEAPONS ===
    { name: 'Pistol',          code: 'WEAPON_PISTOL',          tab: 'weapons', image: '' },
    { name: 'Combat Pistol',   code: 'WEAPON_COMBATPISTOL',    tab: 'weapons', image: '' },
    { name: 'AP Pistol',       code: 'WEAPON_APPISTOL',        tab: 'weapons', image: '' },
    { name: 'Pistol .50',      code: 'WEAPON_PISTOL50',        tab: 'weapons', image: '' },
    { name: 'SMG',             code: 'WEAPON_SMG',             tab: 'weapons', image: '' },
    { name: 'Assault SMG',     code: 'WEAPON_ASSAULTSMG',      tab: 'weapons', image: '' },
    { name: 'Micro SMG',       code: 'WEAPON_MICROSMG',        tab: 'weapons', image: '' },
    { name: 'Assault Rifle',   code: 'WEAPON_ASSAULTRIFLE',    tab: 'weapons', image: '' },
    { name: 'Carbine Rifle',   code: 'WEAPON_CARBINERIFLE',    tab: 'weapons', image: '' },
    { name: 'Special Carbine', code: 'WEAPON_SPECIALCARBINE',  tab: 'weapons', image: '' },
    { name: 'Combat MG',       code: 'WEAPON_COMBATMG',        tab: 'weapons', image: '' },
    { name: 'Sniper Rifle',    code: 'WEAPON_SNIPERRIFLE',     tab: 'weapons', image: '' },
    { name: 'Heavy Sniper',    code: 'WEAPON_HEAVYSNIPER',     tab: 'weapons', image: '' },
    { name: 'Pump Shotgun',    code: 'WEAPON_PUMPSHOTGUN',     tab: 'weapons', image: '' },
    { name: 'Assault Shotgun', code: 'WEAPON_ASSAULTSHOTGUN',  tab: 'weapons', image: '' },
    { name: 'Bullpup Rifle',   code: 'WEAPON_BULLPUPRIFLE',    tab: 'weapons', image: '' },
    { name: 'Compact Rifle',   code: 'WEAPON_COMPACTRIFLE',    tab: 'weapons', image: '' },
    { name: 'Gusenberg',       code: 'WEAPON_GUSENBERG',       tab: 'weapons', image: '' },
    // === GRENADES ===
    { name: 'Grenade',         code: 'WEAPON_GRENADE',         tab: 'grenades', image: '' },
    { name: 'Sticky Bomb',     code: 'WEAPON_STICKYBOMB',      tab: 'grenades', image: '' },
    { name: 'Molotov',         code: 'WEAPON_MOLOTOV',         tab: 'grenades', image: '' },
    { name: 'Pipe Bomb',       code: 'WEAPON_PIPEBOMB',        tab: 'grenades', image: '' },
    { name: 'Smoke Grenade',   code: 'WEAPON_SMOKEGRENADE',    tab: 'grenades', image: '' },
    { name: 'Flashbang',       code: 'WEAPON_STUNGUN',         tab: 'grenades', image: '' },
    // === AMMO ===
    { name: 'Pistol Ammo',     code: 'ammo_pistol',            tab: 'ammo', image: '' },
    { name: 'SMG Ammo',        code: 'ammo_smg',               tab: 'ammo', image: '' },
    { name: 'Rifle Ammo',      code: 'ammo_rifle',             tab: 'ammo', image: '' },
    { name: 'Shotgun Ammo',    code: 'ammo_shotgun',           tab: 'ammo', image: '' },
    { name: 'Sniper Ammo',     code: 'ammo_sniper',            tab: 'ammo', image: '' },
];

const tabsConfig = [
    { id: 'weapons',  label: 'WEAPONS' },
    { id: 'grenades', label: 'GRENADES' },
    { id: 'ammo',     label: 'AMMO' },
];

let activeTab = 'weapons';

function getTabsContainer() {
    return document.getElementById('tabs');
}

function getGrid() {
    return document.getElementById('grid');
}

function renderTabs() {
    const container = getTabsContainer();
    container.innerHTML = '';
    tabsConfig.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'tab' + (t.id === activeTab ? ' active' : '');
        btn.textContent = t.label;
        btn.dataset.tab = t.id;
        btn.addEventListener('click', () => {
            activeTab = t.id;
            renderTabs();
            renderGrid();
        });
        container.appendChild(btn);
    });
}

function renderGrid() {
    const container = getGrid();
    container.innerHTML = '';
    const filtered = weapons.filter(w => w.tab === activeTab);
    if (filtered.length === 0) {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#5a4a7a;padding:40px 0;">No items in this category.</div>';
        return;
    }
    filtered.forEach(w => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="image">${w.image ? `<img src="${w.image}" alt="${w.name}">` : ''}</div>
            <div class="name">${w.name}</div>
            <div class="code">${w.code}</div>
        `;
        card.addEventListener('click', () => triggerSpawn(w.code));
        container.appendChild(card);
    });
}

function triggerSpawn(weaponCode) {
    fetch(`https://${resourceName}/triggerSpawn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weaponName: weaponCode }),
    }).catch(() => {});
}

function closeMenu() {
    fetch(`https://${resourceName}/closeExternal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
    }).catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('closeBtn').addEventListener('click', closeMenu);
    renderTabs();
    renderGrid();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});
