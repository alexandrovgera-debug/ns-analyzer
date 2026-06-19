import NightscoutAPI from "./api.js";
import profile from "./profile.js";
import SensitivityAnalyzer from "./analyzer.js";
import { renderTable } from "./table.js";
import { drawChart } from "./charts.js";

const button = document.getElementById("analyze");

button.addEventListener("click", analyze);

async function analyze() {

    button.disabled = true;
    button.textContent = "Загрузка...";

    try {

        const url = document.getElementById("url").value.trim();
        const hours = Number(document.getElementById("period").value);
        const shift = Number(document.getElementById("shift").value);

        const api = new NightscoutAPI(url);

        // profile (ЛОКАЛЬНЫЙ fallback, если API не даёт профиль)
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
window.onload = analyze;