import NightscoutAPI from "./api.js";
import profile from "./profile.js";
import SensitivityAnalyzer from "./analyzer.js";
import { renderTable } from "./table.js";
import { drawChart } from "./charts.js";

const button = document.getElementById("analyze");

button.addEventListener("click", analyze);

function getUrl() {
    const url = document.getElementById("url").value.trim();

    if (!url) {
        throw new Error("Введите URL Nightscout");
    }

    if (url.includes("github.io")) {
        throw new Error("Ошибка: выбран неправильный Nightscout URL");
    }

    return url;
}

async function analyze() {

    button.disabled = true;
    button.textContent = "Загрузка...";

    try {

        const url = getUrl();
        const hours = Number(document.getElementById("period").value);
        const shift = Number(document.getElementById("shift").value);

        console.log("Nightscout URL:", url);

        const api = new NightscoutAPI(url);

        const profileJson = await api.getProfiles().catch(() => profile);

        const deviceStatus = await api.getDeviceStatus(hours);

        const analyzer = new SensitivityAnalyzer(profileJson);

        const result = analyzer.analyze(deviceStatus, shift);

        renderTable(result);
        drawChart(result);

    } catch (e) {

        console.error(e);
        alert("Ошибка:\n\n" + e.message);

    } finally {

        button.disabled = false;
        button.textContent = "Анализ";
    }
}
