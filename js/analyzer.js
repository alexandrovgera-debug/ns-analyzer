export default class SensitivityAnalyzer {

    constructor(profile) {
        this.profile = profile;
    }

    analyze(deviceStatus, shiftMinutes = 60) {

        const hours = new Array(24)
            .fill(0)
            .map(() => ({
                sum: 0,
                count: 0
            }));

        for (const row of deviceStatus) {

            const sr =
                row?.openaps?.suggested?.sensitivityRatio;

            if (sr === undefined)
                continue;

            const date =
                new Date(row.created_at);

            date.setMinutes(
                date.getMinutes() + shiftMinutes
            );

            const h = date.getHours();

            hours[h].sum += sr;
            hours[h].count++;
        }

        const result = [];

        for (let h = 0; h < 24; h++) {

            const avgSR =
                hours[h].count
                    ? hours[h].sum / hours[h].count
                    : 1.0;

            const basal =
                this.getBasal(h);

            const isf =
                this.getISF(h);

            const cr =
                this.getCR(h);

            result.push({

                hour: h,

                avgSR:
                    Number(avgSR.toFixed(3)),

                basal:
                    basal,

                recommendedBasal:
                    Number(
                        (basal * avgSR).toFixed(2)
                    ),

                isf:
                    isf,

                recommendedISF:
                    Number(
                        (isf / avgSR).toFixed(2)
                    ),

                cr:
                    cr,

                recommendedCR:
                    Number(
                        (cr / avgSR).toFixed(2)
                    )

            });

        }

        return result;

    }

    getBasal(hour) {

        if (!this.profile.basal)
            return 0;

        for (let i = this.profile.basal.length - 1; i >= 0; i--) {

            const item = this.profile.basal[i];

            const h =
                Number(item.time.substr(0, 2));

            if (hour >= h)
                return Number(item.value);

        }

        return Number(this.profile.basal[0].value);

    }

    getISF(hour) {

        if (!this.profile.isf)
            return 0;

        for (let i = this.profile.isf.length - 1; i >= 0; i--) {

            const item = this.profile.isf[i];

            const h =
                Number(item.time.substr(0, 2));

            if (hour >= h)
                return Number(item.value);

        }

        return Number(this.profile.isf[0].value);

    }

    getCR(hour) {

        if (!this.profile.cr)
            return 0;

        for (let i = this.profile.cr.length - 1; i >= 0; i--) {

            const item = this.profile.cr[i];

            const h =
                Number(item.time.substr(0, 2));

            if (hour >= h)
                return Number(item.value);

        }

        return Number(this.profile.cr[0].value);

    }

}
