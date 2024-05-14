const formEl = document.getElementById('mainForm');
const outputAreaEl = document.getElementById('outputArea');


function formHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userInput = Object.fromEntries(formData.entries());
    CalculateTatalAllScopes(userInput)

}

function CalculateTatalAllScopes(userInput) {

    console.log(userInput);

    // EKLEDİĞİN YENİ INPUT'U HESABA BURADA DAHİL ET
    // user.Input.<|INDEX.HTML DOSYASINDAKİ İLGİLİ İNPUT'UN NAME DEĞERİ|>

    let scopeOneTotal = (Number(userInput.palletisationOperation) * 0.03) +
        (Number(userInput.cokeOvengasCombusition) * 1.6) +
        (Number(userInput.blastFurnaceGasCombustion) * 1.35) +
        (Number(userInput.directReducedIronProduction) * 0.7) 

       
        ;



    let scopeTwoTotal = (Number(userInput.electricityForProductionProcess) * 0.4) +
        (Number(userInput.electricityForLigting) * 0.4)
       
        ;



    let scopeThreeTotal = (Number(userInput.rawMaterialTransportation) * 0.15) +
        (Number(userInput.employeeCommuting) * 0.15)
        
        ;







    let emissionLimit = (Number(userInput.emissionCap));

    let weeklyETSPrice = (Number(userInput.weeklyETSPrice));

    let amountExported = (Number(userInput.amountExported));


    CalculateTax(scopeOneTotal, scopeTwoTotal, scopeThreeTotal, emissionLimit, weeklyETSPrice, amountExported);

}

function CalculateTax(scopeOneTotal, scopeTwoTotal, scopeThreeTotal, emissionLimit, weeklyETSPrice, amountExported) {

    const totalEmission = scopeOneTotal + scopeTwoTotal + scopeThreeTotal;

    let cbamTax = 0;

    if (totalEmission > emissionLimit) {
        cbamTax = (totalEmission - emissionLimit) * weeklyETSPrice * amountExported;
    }



    let totalEmissionPercentageOfLimit = totalEmission * emissionLimit * 100;

    let GraphData = [scopeOneTotal, scopeTwoTotal, scopeThreeTotal]

    createOutputelement(totalEmission, cbamTax, emissionLimit, weeklyETSPrice, scopeOneTotal, scopeTwoTotal, scopeThreeTotal, totalEmissionPercentageOfLimit, GraphData);


}


function createOutputelement(totalEmission, cbamTax, emissionLimit, weeklyETSPrice, scopeOneTotal, scopeTwoTotal, scopeThreeTotal, totalEmissionPercentageOfLimit, GraphData) {

    outputAreaEl.innerHTML = `
    <div class="total-em-result bg">
          <p>totalEmission</p>
          <h4>${totalEmission}</h4>
        </div>

        <div class="tax-result bg">
          <p>cbamTax</p>
          <h4> ${cbamTax} </h4>
        </div>

        <div class="graph-result bg" id = "chartContainer">
            
                <canvas id="myChart"  ></canvas>
  

        </div>

        <div class="emission-cap bg">
          <p>emissionLimit</p>
          <h4>${emissionLimit}</h4>
        </div>
        <div class="emission-cap-percent bg">
          <p>totalEmissionPercentageOfLimit</p>
          <h4>${totalEmissionPercentageOfLimit} ½ </h4>
        </div>
        <div class="wekly bg">
          <p>weeklyETSPrice</p>
          <h4>${weeklyETSPrice}</h4>
        </div>
        <div class="scope-one-result bg">
          <p>scopeOneTotal</p>
          <h4>${scopeOneTotal}</h4>
        </div>
        <div class="scope-two-result bg">
          <p>scopeTwoTotal</p>
          <h4>${scopeTwoTotal}</h4>
        </div>
        <div class="scope-three-result bg">
          <p>scopeThreeTotal</p>
          <h4>${scopeThreeTotal}</h4>
        </div>
        <div class="scope-all-result bg">
          <p>asd</p>
          <h4>all Scopes Res</h4>
        </div>
    `;

    createGraph(GraphData)

}

function createGraph(GraphData) {
    const ctx = document.getElementById('myChart');
    // console.log(ctx);
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Scope1', 'Scope2', 'Scope3'],
            datasets: [{
                label: 'tonnes CO2e',
                data: GraphData,
                backgroundColor: [
                    '#CEF238',
                    '#F24A38',
                    '#3889F2'
                ],
            }]
        },

        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    position: "right"
                },

            },

        },

    });
}

function formResetHandler(e) {
    e.preventDefault();
    outputAreaEl.innerHTML = ""
}

formEl.addEventListener('submit', (e) => formHandler(e));
formEl.addEventListener('reset', (e) => formResetHandler(e));

