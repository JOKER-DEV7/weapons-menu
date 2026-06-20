function selectWeapon(weaponName) {
    // هذا الكود يرسل اسم السلاح إلى ملف الـ HTML المخفي في لعبتك، والذي يمرره لملف الـ lua
    window.parent.postMessage({
        action: 'spawn',
        weapon: weaponName
    }, '*');
}