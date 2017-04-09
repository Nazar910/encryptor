const symbols = "?`~!@#$%^&*()_-=+/'\"\\;.:,0123456789 \n\t\r";
const languages = {
    en: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" + symbols,
    ru: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя" + symbols,
    ua: "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя" + symbols
};

module.exports = languages;
