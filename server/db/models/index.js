const Restaurant = require('./restaurant')
const Violation = require('./violation')
const Inspection = require('./inspection')

Inspection.belongsTo(Restaurant, {foreignKey: 'restaurantId'}) //one-to-one relationship
Restaurant.hasMany(Inspection, {foreignKey: 'restaurantId'}) //one-to-many relationship

//Still working on populating join table -- possible syntax issue with naming of columns
Inspection.belongsToMany(Violation, {
  through: 'InspectionViolation',
  foreignKey: 'inspecionId'
}) //many-to-many relationship
Violation.belongsToMany(Inspection, {
  through: 'InspectionViolation',
  foreignKey: 'violationCode'
}) //many-to-many relationship

module.exports = {
  Restaurant,
  Violation,
  Inspection
}
