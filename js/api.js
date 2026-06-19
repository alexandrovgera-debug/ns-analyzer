export default class NightscoutAPI {

    constructor(baseUrl) {
        this.baseUrl = baseUrl.replace(/\/$/, "");
    }

    async getDeviceStatus(hours = 6) {

        const count = hours * 12;

        const url =
            `${this.baseUrl}/api/v1/devicestatus.json?count=${count}`;

        const response = await fetch(url);

        if (!response.ok)
            throw new Error("Ошибка получения devicestatus");

        return await response.json();
    }
    
async getProfiles() {

    const url = `${this.baseUrl}/api/v1/profile.json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Ошибка получения profile");
    }

    const profiles = await response.json();

    const root = profiles[0];

    const activeName = root.defaultProfile;

    const active = root.store[activeName];

    if (!active) {
        throw new Error(`Активный профиль "${activeName}" не найден`);
    }

    return {
        basal: active.basal,
        isf: active.sens,
        cr: active.carbratio,
        dia: active.dia,
        units: active.units
    };
//}


    //async getProfiles() {

        //const url =
           // `${this.baseUrl}/api/v1/profile.json`;

        //const response = await fetch(url);

        //if (!response.ok)
            //throw new Error("Ошибка получения profile");

        //return await response.json();
   // }

}
