/*
 * @Author: Twiyin0
 * @Date: 2024-05-09 0:20:17
 * @LastEditors: Twiyin0
 * @LastEditTime: 2024-05-09 0:27:19
 * 感谢kbd猫猫！！！！
*/

function render(jrysInfo) {
    const bgUrl = document.querySelector("#body");
    const avatarUrl = document.querySelector("#avatar");
    const username = document.querySelector("#username");
    const star = document.querySelector("#star");
    const sign = document.querySelector("#sign");

    username.innerHTML = jrysInfo.username;
    star.innerHTML = jrysInfo.star;
    sign.innerHTML = jrysInfo.sign;

    // bgUrl.style.backgroundImage = `url("${jrysInfo.bgUrl}")`;
    avatarUrl.src = jrysInfo.avatarUrl;
    bgUrl.style.filter = `${jrysInfo.night}`;
}
