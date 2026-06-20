// استبدل 'macho' باسم السكربت الخاص بك (اسم المجلد في السيرفر)
const resourceName = 'macho'; 

function triggerSpawn(weaponCode) {
    fetch(`https://${resourceName}/triggerSpawn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weaponName: weaponCode }),
    });
}

function closeMenu() {
    fetch(`https://${resourceName}/closeExternal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
    });
}