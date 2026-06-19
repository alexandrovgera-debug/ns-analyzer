import NightscoutAPI from "./api.js";
import Profile from "./profile.js";
import SensitivityAnalyzer from "./analyzer.js";
import { renderTable } from "./table.js";
import { drawChart } from "./charts.js";

const button = document.getElementById("analyze");

button.addEventListener("click", analyze);

async function analyze() {

    button.disabled = true;
    button.textContent = "Загрузка...";

    try {

        const url =
            document.getElementById("url").value.trim();

        const hours =
            Number(document.getElementById("period").value);

        const shift =
            Number(document.getElementById("shift").value);

        const api = new NightscoutAPI(url);

        // ---------- profile ----------

        const profileJson =
            await api.getProfiles();

        const parser =
            new ProfileParser(profileJson);

        const profile =
            parser.parse();

        // ---------- devicestatus ----------

        const deviceStatus =
            await api.getDeviceStatus(hours);

        // ---------- analyzer ----------

        const analyzer =
            new SensitivityAnalyzer(profile);

        const result =
            analyzer.analyze(
                deviceStatus,
                shift
            );

        // ---------- output ----------

        renderTable(result);

        drawChart(result);

    }
    catch (e) {

        console.error(e);

        alert(
            "Ошибка:\n\n" + e.message
        );

    }

    finally {

        button.disabled = false;
        button.textContent = "Анализ";

    }

}

window.onload = analyze;
