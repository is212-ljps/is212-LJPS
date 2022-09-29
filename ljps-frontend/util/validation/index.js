function validateLength(input, min, max){
    if(input.length<min || input.length>max){
        return false
    }
    return true 
}


export { 
    validateLength
}