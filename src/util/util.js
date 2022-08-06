
const d = new Date()

const printDate = ()=>{
    console.log(d)
}

const printMonth =()=>{
    console.log(d.getMonth())
}

const getBatchInfo = ()=>{
    console.log("my banch name is plutonium, week3, Day5, the topic being taught today is ….. For example - Radon, W3D3, the topic for today is Nodejs module system")
}

// module.exports.printDate =printDate
// module.exports.printMonth =printMonth
// module.exports.getBtachInfo =getBtachInfo

module.exports = {printDate,printMonth,getBatchInfo}








