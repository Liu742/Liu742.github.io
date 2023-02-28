
function parseLOG(d) {

    console.log(d);

}


// Examples of Public APIs:
// https://datausa.io/about/api/
// https://github.com/public-apis/public-apis/blob/master/README.md
// https://www.kaggle.com/datasets

let url1 = "http://api.worldbank.org/v2/country/all/indicator/SE.PRM.CMPT.FE.ZS;SE.PRM.CMPT.MA.ZS;SE.PRM.CMPT.ZS?source=14";

d3.xml(url1).then(parseLOG);