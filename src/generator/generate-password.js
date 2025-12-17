const charset = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&(){}[]/*:;-_="'|+`;

// Define subsets for guaranteed inclusion
const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = `!@#$&():-_*{}[]"'|/=+`;
const colons = ";:";

const length = 48;

/**
 * Generates a cryptographically secure random number in the range of [0, max). We determine the minimum required byte size to represent numbers up to max-1. For simplicity and common use cases, we'll use a standard 32-bit unsigned integer. This is slightly less efficient for very small ranges but highly reliable.
 * @param {number} max - the exclusive upper bound.
 * @returns {number} a cryptographically secure random integer.
 */
const getSecureRandomInt = (max) => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
};

/**
 * Helper function to pick a cryptographically secure random character from a given string.
 * @param {string} str - the string (subset) to pick from.
 * @returns {string} a random character.
 */
const getRandomChar = (str) => {
  const index = getSecureRandomInt(str.length);
  return str[index];
};

/**
 * Helper function to shuffle an array (Fisher-Yates algorithm) using secure randomness.
 * @param {Array<string>} array - the array of characters to shuffle.
 * @returns {Array<string>} the shuffled array.
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Generates a cryptographically secure random password of a specified length,
 * guaranteeing the inclusion of uppercase, lowercase, numbers, and multiple symbols.
 * @param {number} len - the desired length of the password.
 * @returns {Promise<string>} a promise that resolves with the secure password.
 */
const generatePassword = function (len = 48) {
  return new Promise((resolve, reject) => {
    if (
      typeof window === "undefined" ||
      !window.crypto ||
      !window.crypto.getRandomValues
    ) {
      reject(
        new Error(
          "Web Crypto API is not available (window.crypto.getRandomValues is missing).",
        ),
      );
      return;
    }

    let passwordChars = [];

    // guarantee minimum inclusion
    passwordChars.push(getRandomChar(lower));
    passwordChars.push(getRandomChar(upper));
    passwordChars.push(getRandomChar(numbers));
    passwordChars.push(getRandomChar(symbols));
    passwordChars.push(getRandomChar(symbols));
    passwordChars.push(getRandomChar(colons));

    const minLength = passwordChars.length;
    let finalLength = len;
    if (finalLength < minLength) {
      console.warn(
        `Length specified (${len}) is less than minimum requirement (${minLength}). Using minimum length.`,
      );
      finalLength = minLength;
    }

    // fill remaining length randomly
    const remainingLength = finalLength - passwordChars.length;
    const charsetLength = charset.length;

    for (let i = 0; i < remainingLength; ++i) {
      const index = getSecureRandomInt(charsetLength);
      passwordChars.push(charset[index]);
    }

    // shuffle and return
    const finalPassword = shuffleArray(passwordChars).join("");

    // resolve the promise with the final password
    resolve(finalPassword);
  });
};

export default generatePassword;
