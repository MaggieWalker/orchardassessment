const Restaurant = require('./restaurant')
const Violation = require('./violation')
const Inspection = require('./inspection')

Inspection.belongsTo(Restaurant, {foreignKey: 'restaurantId'}) //one-to-one relationship
Restaurant.hasMany(Inspection, {foreignKey: 'restaurantId'}) //one-to-many relationship

Inspection.belongsToMany(Violation, {
  through: 'InspectionViolation'
  // foreignKey: 'inspectionId'
}) //many-to-many relationship
Violation.belongsToMany(Inspection, {
  through: 'InspectionViolation'
  // foreignKey: 'violationId'
}) //many-to-many relationship

module.exports = {
  Restaurant,
  Violation,
  Inspection
}
