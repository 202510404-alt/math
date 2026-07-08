/*
============================================================
SCM Mathematical Model
------------------------------------------------------------
모든 수학 계산 전담
UI와 완전히 독립
============================================================
*/

/*
------------------------------------------------------------
등비수열 생산성 모델
------------------------------------------------------------
*/

function calculateLaborDiminishingReturns(
    workerCount,
    firstTerm,
    ratio
) {

    let total = 0;

    for (let i = 1; i <= workerCount; i++) {

        total +=
            firstTerm *
            Math.pow(ratio, i - 1);

    }

    return total;

}

/*
------------------------------------------------------------
초기 투자비
------------------------------------------------------------
*/

function calculateInitialCost(
    scale,
    automationRate
) {

    const buildingCost =
        REAL_DATA.baseCost *
        scale;

    const automationCost =
        automationRate *
        600 *
        scale;

    return buildingCost + automationCost;

}

/*
------------------------------------------------------------
연간 매출
------------------------------------------------------------
*/

function calculateAnnualRevenue(
    laborEfficiency,
    automationEfficiency
) {

    const dailyOrders =
        laborEfficiency +
        automationEfficiency;

    return (
        dailyOrders *
        OPERATING_DAYS *
        PROFIT_PER_ORDER
    );

}

/*
------------------------------------------------------------
연간 운영비
------------------------------------------------------------
*/

function calculateAnnualExpense(
    laborCount,
    automationRate,
    scale
) {

    const laborCost =
        laborCount *
        REAL_DATA.laborWage;

    const maintenanceCost =
        automationRate *
        25 *
        scale;

    const facilityCost =
        scale *
        2500;

    return (

        laborCost +

        maintenanceCost +

        facilityCost

    );

}

/*
------------------------------------------------------------
ROI 계산
------------------------------------------------------------
*/

function calculateROI(
    finalBalance,
    initialCost
) {

    return (
        finalBalance /
        initialCost
    ) * 100;

}

/*
------------------------------------------------------------
10년 투자 시뮬레이션
------------------------------------------------------------
*/

function simulateInvestment(
    scale,
    automationRate,
    laborCount
) {

    //--------------------------------------------------------
    // 초기 투자비
    //--------------------------------------------------------

    const initialCost =
        calculateInitialCost(
            scale,
            automationRate
        );

    //--------------------------------------------------------
    // 노동 생산성
    //--------------------------------------------------------

    const laborEfficiency =
        calculateLaborDiminishingReturns(

            laborCount,

            REAL_DATA.laborEff,

            REAL_DATA.r

        );

    //--------------------------------------------------------
    // 자동화 생산성
    //--------------------------------------------------------

    const automationEfficiency =

        (automationRate / 100) *

        REAL_DATA.autoEff *

        scale;

    //--------------------------------------------------------
    // 매출
    //--------------------------------------------------------

    const annualRevenue =

        calculateAnnualRevenue(

            laborEfficiency,

            automationEfficiency

        );

    //--------------------------------------------------------
    // 비용
    //--------------------------------------------------------

    const annualExpense =

        calculateAnnualExpense(

            laborCount,

            automationRate,

            scale

        );

    //--------------------------------------------------------
    // 순이익
    //--------------------------------------------------------

    const annualNetProfit =

        annualRevenue -

        annualExpense;

    //--------------------------------------------------------
    // 10년 시뮬레이션
    //--------------------------------------------------------

    let balance =

        -initialCost;

    let history = [

        Math.round(balance)

    ];

    let bepYear = -1;

    for (

        let year = 1;

        year <= YEARS;

        year++

    ) {

        balance += annualNetProfit;

        history.push(

            Math.round(balance)

        );

        if (

            balance >= 0 &&

            bepYear === -1

        ) {

            bepYear = year;

        }

    }

    //--------------------------------------------------------
    // 결과 반환
    //--------------------------------------------------------

    return {

        initialCost,

        laborEfficiency,

        automationEfficiency,

        annualRevenue,

        annualExpense,

        annualNetProfit,

        finalBalance: balance,

        roi: calculateROI(

            balance,

            initialCost

        ),

        bepYear,

        history

    };

}