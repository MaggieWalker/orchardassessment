const {expect} = require('chai')
const db = require('../index')
const Restaurant = db.model('restaurant')

describe('Restaurant model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctGrade', () => {
      let sonys

      beforeEach(async () => {
        sonys = await Restaurant.create({
          boro: 'Brooklyn',
          grade: 'A',
          camis: '32456',
          dba: 'sonys',
          cuisine: 'Thai',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })

      it('returns true if the grade is correct', () => {
        expect(sonys.correctGrade('A')).to.be.equal(true)
      })

      it('returns false if the grade is incorrect', () => {
        expect(sonys.correctGrade('B')).to.be.equal(false)
      })
    }) // end describe('correctGrade')
  }) // end describe('instanceMethods')
}) // end describe('Restaurant model')
