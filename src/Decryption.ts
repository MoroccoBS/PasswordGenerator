import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_PASSWORD_ENCRYPTION_KEY;

export function encryptPassword(password: string) {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

export function decryptPassword(encryptedPassword: string) {
	const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
	return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }
