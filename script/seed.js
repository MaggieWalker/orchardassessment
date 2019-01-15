'use strict'

const db = require('../server/db')
const {Restaurant, Violation} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const restaurants = await Promise.all([
    Restaurant.create({
      camis: '30075445',
      dba: 'MORRIS PARK BAKE SHOP',
      boro: 'BRONX',
      building: '1007',
      street: 'MORRIS PARK AVE',
      zipcode: '10462',
      phone: '7188924544',
      cuisine: 'Bakery',
      inspectiondate: new Date(Date.UTC(2017, 4, 18)),
      action: 'Violations were cited in the following area(s).',
      score: 7,
      grade: 'A',
      gradedate: new Date(Date.UTC(2017, 4, 18)),
      recorddate: new Date(Date.UTC(2010, 0, 13)),
      inspectiontype: 'Cycle Inspection / Initial Inspection'
    })
  ])

  const violations = await Promise.all([
    Violation.create({
      code: '10F',
      description:
        'Non-food contact surface improperly constructed. Unacceptable material used. Non-food contact surface or equipment improperly maintained and/or not properly sealed, raised, spaced or movable to allow accessibility for cleaning on all sides, above and underneath the unit.',
      criticalflag: 'Not Critical'
    })
  ])

  console.log(`seeded ${restaurants.length} users`)
  console.log(`seeded ${violations.length} violations`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
