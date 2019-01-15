/* global describe beforeEach it */

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
          borough: 'Brooklyn',
          grade: 'A'
        })
      })

      it('returns true if the password is correct', () => {
        expect(sonys.correctGrade('A')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(sonys.correctGrade('B')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
