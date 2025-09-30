import { parsePhoneNumber, type CountryCode } from "libphonenumber-js";

export default class LibPhoneNumberUtil {
    private readonly defaultCountry: CountryCode;

    constructor(defaultCountry: CountryCode = "ID") {
        this.defaultCountry = defaultCountry;
    }

    public normalizePhoneNumber(phone: string): string | null {
        try {
            const parsed = parsePhoneNumber(phone, this.defaultCountry);
            if (!parsed.isValid()) return null;
            return parsed.number; // E.164 format: +6285725363777
        } catch (err: any) {
            console.error(err);
            return null;
        }
    }

    public isPhoneNumberEqual(phone1: string, phone2: string): boolean {
        const normalized1 = this.normalizePhoneNumber(phone1);
        const normalized2 = this.normalizePhoneNumber(phone2);
        return normalized1 !== null && normalized1 === normalized2;
    }
}
