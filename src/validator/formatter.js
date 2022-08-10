const fullName = "     Gautam Dhakate        "

const trim = ()=>{
    console.log(fullName.trim())
}

const lowerCase = ()=>{
    console.log(fullName.trim().toLowerCase())
}

const upperCase =()=>{
    console.log(fullName.trim().toUpperCase())
}

module.exports = {trim ,lowerCase, upperCase}