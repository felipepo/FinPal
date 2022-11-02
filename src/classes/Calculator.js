class Calculator {
    static inssRange = [
        { percentage: 0.075, income: 1212, },
        { percentage: 0.09, income: 2427.35, },
        { percentage: 0.12, income: 3641.03, },
        { percentage: 0.14, income: 7087.22, },
    ];
    static irrfRange = [
        { percentage: 0.0, income: 1903.98, deduction: 0.0 },
        { percentage: 0.075, income: 2826.65, deduction: 142.8 },
        { percentage: 0.15, income: 3751.05, deduction: 354.8 },
        { percentage: 0.225, income: 4664.68, deduction: 636.13 },
        { percentage: 0.275, income: 1000000, deduction: 869.36 },
    ];
    static fgtsRange = [
        { percentage: 0.5, range: 500.0, fixed: 0.0 },
        { percentage: 0.4, range: 1000.0, fixed: 50.0 },
        { percentage: 0.3, range: 5000.0, fixed: 150.0 },
        { percentage: 0.2, range: 10000.0, fixed: 650.0 },
        { percentage: 0.15, range: 15000.0, fixed: 1150.0 },
        { percentage: 0.1, range: 20000.0, fixed: 1900.0 },
        { percentage: 0.05, range: 100000000.0, fixed: 2900.0 },
    ];

    static inss(gross) {
        let tax = 0;
        let prevRange = 0;
        for (let range of this.inssRange) {
            if (gross > range.income) {
                tax = tax + ((range.income - prevRange) * range.percentage);
            } else {
                tax = tax + ((gross - prevRange) * range.percentage);
                break;
            }
            prevRange = range.income;
        }
        return tax.toFixed(2)
    };

    static irrf(gross) {
        let tax = 0;
        for (let range of this.irrfRange) {
            if (gross > range.income) {
                continue
            } else {
                tax = (gross * range.percentage) - range.deduction;
                break;
            }
        }
        if (tax < 0) tax = 0;
        return tax.toFixed(2)
    };

    static fgtsAnniversary(total) {
        let income = 0;
        for (let range of this.fgtsRange) {
            if (total > range.range) {
                continue;
            } else {
                income = total * range.percentage + range.fixed;
                break
            }
        }
        return income.toFixed(2);
    }

    static net(gross) {
        return (gross - this.inss(gross) - this.irrf(gross - this.inss(gross))).toFixed(2);
    }

    static vacation(gross, days) {
        const maxDays = 30;
        return this.net((days / maxDays) * (gross * 4 / 3));
    };

    static income13() { };

    static compound_interest() { };
}

export default Calculator;