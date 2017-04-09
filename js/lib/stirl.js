function crypt(message, key) {
    return message + key;
}

function encrypt(message, key) {
    return crypt(message, key);
}

function decrypt(message, key) {
    return crypt(message, key);
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
