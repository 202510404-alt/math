/*
============================================================
Formula Manager
------------------------------------------------------------
MathJax Formula Rendering
등비수열 수리 모델 출력 전담
============================================================
*/

/*
------------------------------------------------------------
수식 생성
------------------------------------------------------------
*/

function createFormula(workerCount) {

    return `
$$
\\text{Total Labor Efficiency}
=
\\sum_{i=1}^{${workerCount}}
450
\\times
0.88^{i-1}
$$
`;

}

/*
------------------------------------------------------------
MathJax 수식 출력
------------------------------------------------------------
*/

function updateFormula(
    workerCount,
    totalEfficiency
) {

    const formulaElement =
        document.getElementById(
            "formula_display"
        );

    formulaElement.innerHTML =
        createFormula(workerCount);

    if (
        window.MathJax &&
        MathJax.typesetPromise
    ) {

        MathJax.typesetClear([
            formulaElement
        ]);

        MathJax.typesetPromise([
            formulaElement
        ]);

    }

    document.getElementById(
        "f_count"
    ).innerText =
        workerCount;

    document.getElementById(
        "f_result"
    ).innerText =
        Math.round(
            totalEfficiency
        ).toLocaleString();

}