//Possibily another helper filer witch is required in and provides the unit of alchol per drink/size of drink.

const UnitHelper = function (drinkType, drinkSize) {
  this.drinkType = drinkType;
  this.drinkSize = drinkSize;
}

UnitHelper.prototype.sizeToUnits = function () {
  if (this.drinkType === 'beer') {
    if (this.drinkSize === 'half Pint') {
      return 1;
    } else if (this.drinkSize === 'pint') {
      return 2;
    } else if (this.drinkSize === 'bottle') {
      return 1.7;
    }
  } else if (this.drinkType === 'wine') {
    if (this.drinkSize === 'small') {
      return 1.5;
    } else if (this.drinkSize === 'medium') {
      return 2.1;
    } else if (this.drinkSize === 'large') {
      return 3;
    }
  } else if (this.drinkType === 'spirits') {
    if (this.drinkSize === 'single') {
      return 2;
    } else if (this.drinkSize === 'double') {
      return 4;
    }
  }
}



// UnitHelper.prototype.sizeToUnits = function () {
//   if (this.drinkType === 'beer') {
//     if (this.drinkSize === 'Half Pint') {
//       return 1;
//     } else if (this.drinkSize === 'Pint') {
//       return 2;
//     } else if (this.drinkSize === 'Bottle' {
//       return 1.7;
//     }
//   } else if (this.drinkType === 'wine') {
//     if (this.drinkSize === 'Small') {
//       return 1.5;
//     } else if (this.drinkSize === 'Medium') {
//       return 2.2;
//     } else if (this.drinkSize === 'Large') {
//       return 3;
//     }
//   } else if (this.drinkType === 'spirits') {
//     if (this.drinkSize === 'Single') {
//       return 2;
//     } else if (this.drinkSize === 'Double') {
//       return 4;
//     }
//   }
// };

module.exports = UnitHelper;
