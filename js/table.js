export function renderTable(data) {

    const tbody =
        document.querySelector("#resultTable tbody");

    tbody.innerHTML = "";

    for (const row of data) {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `

            <td>${String(row.hour).padStart(2,"0")}:00</td>

            <td>${row.avgSR.toFixed(2)}</td>

            <td>${row.basal.toFixed(2)}</td>

            <td>${row.recommendedBasal.toFixed(2)}</td>

            <td>${row.isf.toFixed(2)}</td>

            <td>${row.recommendedISF.toFixed(2)}</td>

            <td>${row.cr.toFixed(2)}</td>

            <td>${row.recommendedCR.toFixed(2)}</td>

        `;

        tbody.appendChild(tr);

    }

}
