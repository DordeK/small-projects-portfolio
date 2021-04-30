var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  var convertHandler = new ConvertHandler();

  app.route('/api/convert/backend')
      .get(function (req, res){
        var input = req.query.input;
        var initNum = convertHandler.getNum(input);
        var initUnit = convertHandler.getUnit(input);
        var returnNum = convertHandler.convert(initNum, initUnit);
        var returnUnit = convertHandler.getReturnUnit(initUnit);
        var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        let regex = /[a-z]+|[^a-z]+/gi

      if(input.match(regex).length>2){
        res.json("invalid input")
      }

      if(initNum==="invalid number" && initUnit==="invalid unit"){
        res.json("invalid number and unit")
      }

      if(initNum==="invalid number"){
        res.json('invalid number')
      }

      if(initUnit==="invalid unit"){
        res.json("invalid unit")
      }

      let returnedJson={}
      returnedJson["initNum"]=initNum
      returnedJson["initUnit"]=initUnit
      returnedJson["returnNum"]=returnNum
      returnedJson["returnUnit"]=returnUnit
      returnedJson["string"]=toString

      res.json(returnedJson)
    });

};
