/*
============================================================
Main Controller
------------------------------------------------------------
SCM Simulator Controller

역할
1. 슬라이더 입력 읽기
2. 계산 엔진 호출
3. UI 갱신
============================================================
*/

/*
------------------------------------------------------------
슬라이더 값 읽기
------------------------------------------------------------
*/

function getInputValues() {

    return {

        scale:

            parseInt(
                document.getElementById("scale").value
            ),

        automationRate:

            parseInt(
                document.getElementById("auto_rate").value
            ),

        laborCount:

            parseInt(
                document.getElementById("l_count").value
            )

    };

}

/*
------------------------------------------------------------
슬라이더 숫자 표시
------------------------------------------------------------
*/

function updateSliderDisplay(values) {

    document.getElementById(
        "v_scale"
    ).innerText =
        values.scale;

    document.getElementById(
        "v_auto_rate"
    ).innerText =
        values.automationRate;

    document.getElementById(
        "v_l_count"
    ).innerText =
        values.laborCount;

}

/*
------------------------------------------------------------
전체 시뮬레이션 실행
------------------------------------------------------------
*/

function updateChart() {

    //----------------------------------------
    // 입력
    //----------------------------------------

    const values =
        getInputValues();

    updateSliderDisplay(values);

    //----------------------------------------
    // 계산
    //----------------------------------------

    const result =

        simulateInvestment(

            values.scale,

            values.automationRate,

            values.laborCount

        );

    //----------------------------------------
    // Dashboard
    //----------------------------------------

    updateDashboard(result);

    //----------------------------------------
    // Formula
    //----------------------------------------

    updateFormula(

        values.laborCount,

        result.laborEfficiency

    );

    //----------------------------------------
    // Graph
    //----------------------------------------

    updateGraph(

        result.history

    );

}

/*
------------------------------------------------------------
프로그램 시작
------------------------------------------------------------
*/

window.onload = function () {

    initializeChart();

    updateChart();

};