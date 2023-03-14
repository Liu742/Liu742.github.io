
function parseLOG(d) {

    console.log(d);

}

let url1 = "http://api.worldbank.org/v2/country/all/indicator/SE.PRM.NENR.FE;SE.PRM.NENR.MA;SE.PRM.NENR;SE.PRM.ENRR.FE;SE.PRM.ENRR.MA;SE.PRM.ENRR?source=14";

d3.xml(url1).then(parseLOG);