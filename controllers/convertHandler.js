function ConvertHandler() {

  let regex = /[a-z]+|[^a-z]+/gi


  this.getNum = function(input) {
    var result;
      result = input.match(regex)[0]

    if (input.match(regex)[1] === undefined){
      result = 1
      return result
    }

      if(result.toString().includes("/")){
        let values = result.toString().split("/")
        if(values.length != 2 ){
          return "invalid number"
        }
        values[0] = parseFloat(values[0])
        values[1]=parseFloat(values[1])
        return parseFloat((values[0]/values[1]).toFixed(5))
      }

      if(isNaN(result)){
        return "invalid number"
      }

    return result;
  };

  this.getUnit = function(input) {
    var result;

    result = input.match(regex)[1]

    let validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG']

    if (input.match(regex)[1] === undefined){
      if(validUnits.includes(input.match(regex)[0])){
        return input.match(regex)[0]
    }else{
      return "invalid unit"
    }
  }

if(validUnits.includes(result)) {
  return result
} else{
  return "invalid unit"
}


    return result;
  };

  this.getReturnUnit = function(initUnit) {
    var result;

    if(initUnit==="gal"||initUnit==="GAL"){
      result="l"
    } else if(initUnit==="l"||initUnit==="L"){
      result="gal"
    }


    if(initUnit==="lbs"||initUnit==="LBS"){
      result="kg"
    } else if(initUnit==="kg"||initUnit==="KG"){
      result="lbs"
    }



    if(initUnit==="mi"||initUnit==="MI"){
      result="km"
    } else if(initUnit==="km"||initUnit==="KM"){
      result="mi"
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;

    if(unit==="gal"||unit==="GAL"){
      result="gallon(s)"
    } else if(unit==="l"||unit==="L"){
      result="litre(s)"
    }


    if(unit==="lbs"||unit==="LBS"){
      result="pound(s)"
    } else if(unit==="kg"||unit==="KG"){
      result="kilogram(s)"
    }



    if(unit=="mi"||unit=="MI"){
      result="mile(s)"
    } else if(unit==="km"||unit==="KM"){
      result="kilometre(s)"
    }

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    if(initUnit==="gal"||initUnit==="GAL"){
      result=parseFloat((initNum*galToL).toFixed(5))
    } else if(initUnit==="l"||initUnit==="L"){
      result=parseFloat((initNum/galToL).toFixed(5))
    }


    if(initUnit==="lbs"||initUnit==="LBS"){
      result=parseFloat((initNum*lbsToKg).toFixed(5))
    } else if(initUnit==="kg"||initUnit==="KG"){
      result=parseFloat((initNum/lbsToKg).toFixed(5))
    }



    if(initUnit==="mi"||initUnit==="MI"){
      result=parseFloat((initNum*miToKm).toFixed(5))
    } else if(initUnit==="km"||initUnit==="KM"){
      result=parseFloat((initNum/miToKm).toFixed(5))
    }



    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;

    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' +  returnNum+ ' ' + this.spellOutUnit(returnUnit)

    return result;
  };

}

module.exports = ConvertHandler;
