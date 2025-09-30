import LibPhoneNumberUtil from "../utils/libphonenumber.util.js";
export default class GeneratorUtil {
    static libphonenumberUtil = new LibPhoneNumberUtil("ID"); // default

    static setPhoneUtil(util: LibPhoneNumberUtil) {
        GeneratorUtil.libphonenumberUtil = util;
    }

    static generateRandomString(length: number): string {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static generateUsername(): string {
        const adjectives = ["Smart", "Fast", "Cool", "Nice", "Good", "Happy", "Strong", "Clever"];
        const animals = ["Lion", "Tiger", "Bear", "Monkey", "Dog", "Cat", "Rabbit", "Deer"];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const animal = animals[Math.floor(Math.random() * animals.length)];
        return `${adjective}${animal}-${GeneratorUtil.generateRandomString(5)}`;
    }
    static generatePhoneNumber(): string {
        const prefixes = ["628", "+628", "08"];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const phoneNumberLength = 10;
        let phoneNumber = "";
        for (let i = 0; i < phoneNumberLength; i++) {
            phoneNumber += Math.floor(Math.random() * 10).toString();
        }
        return GeneratorUtil.libphonenumberUtil.normalizePhoneNumber(prefix + phoneNumber) ?? "";
    }
    static generateEmail(): string {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        const localPartLength = 10;
        const domainList = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
        let localPart = "";
        for (let i = 0; i < localPartLength; i++) {
            localPart += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const domain = domainList[Math.floor(Math.random() * domainList.length)];
        return localPart + "@" + domain;
    }
}
