'use strict'

const db = require('../server/db')
const {Restaurant, Violation} = require('../server/db/models')
const fs = require('fs')
const etl = require('etl')
const pg = require('pg')
const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'orchardassessment',
  user: 'margaretwalker'
})

const p = etl.postgres.execute(pool)

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await fs
    .createReadStream(
      'public/DOHMH_New_York_City_Restaurant_Inspection_Results.csv'
    )
    .pipe(etl.csv())
    .pipe(
      etl.map(inspection => {
        inspection['RECORD DATE'] = new Date(inspection['RECORD DATE'])
        inspection['INSPECTION DATE'] = new Date(inspection['INSPECTION DATE'])
        inspection['GRADE DATE'] = new Date(inspection['GRADE DATE'])

        return {
          camis: inspection.CAMIS,
          dba: inspection.DBA,
          boro: inspection.BORO,
          building: inspection.BUILDING,
          street: inspection.STREET,
          zipcode: inspection.ZIPCODE,
          phone: inspection.PHONE,
          cuisine: inspection['CUISINE DESCRIPTION'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    .pipe(etl.postgres.upsert(pool, 'public', 'restaurants'))
    .promise()
    .then(() => console.log('done with Restaurants!'))
    .catch(error => console.log('Caught error', error.message))

  await fs
    .createReadStream(
      'public/DOHMH_New_York_City_Restaurant_Inspection_Results.csv'
    )
    .pipe(etl.csv())
    .pipe(
      etl.map(inspection => {
        return {
          code: inspection['VIOLATION CODE'],
          description: inspection['VIOLATION DESCRIPTION'],
          criticalflag: inspection['CRITICAL FLAG'],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    .pipe(etl.postgres.upsert(pool, 'public', 'violations'))
    .promise()
    .then(() => console.log('done with Violations!'))
    .catch(error => console.log('Caught error', error.message))

  await fs
    .createReadStream(
      'public/DOHMH_New_York_City_Restaurant_Inspection_Results.csv'
    )
    .pipe(etl.csv())
    .pipe(
      etl.map(inspection => {
        return {
          inspectiondate: inspection['INSPECTION DATE'],
          action: inspection.ACTION,
          score: inspection.SCORE,
          grade: inspection.GRADE,
          gradedate: inspection['GRADE DATE'],
          recorddate: inspection['RECORD DATE'],
          inspectiontype: inspection['INSPECTION TYPE'],
          createdAt: new Date(),
          updatedAt: new Date(),
          violationId: inspection['VIOLATION CODE'],
          restaurantId: inspection.CAMIS
        }
      })
    )
    .pipe(etl.postgres.upsert(pool, 'public', 'inspections'))
    .promise()
    .then(() => console.log('done with Inspections!'))
    .catch(error => console.log('Caught error', error.message))

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

// const restaurants = await Promise.all([
//   Restaurant.create({
//     camis: '30075445',
//     dba: 'MORRIS PARK BAKE SHOP',
//     boro: 'BRONX',
//     building: '1007',
//     street: 'MORRIS PARK AVE',
//     zipcode: '10462',
//     phone: '7188924544',
//     cuisine: 'Bakery',
//     inspectiondate: new Date(Date.UTC(2017, 4, 18)),
//     action: 'Violations were cited in the following area(s).',
//     score: 7,
//     grade: 'A',
//     gradedate: new Date(Date.UTC(2017, 4, 18)),
//     recorddate: new Date(Date.UTC(2010, 0, 13)),
//     inspectiontype: 'Cycle Inspection / Initial Inspection'
//   })
// ])

// Restaurant.bulkCreate({
//   camis: inspection.CAMIS,
//   dba: inspection.DBA,
//   recorddate: inspection['RECORD DATE'],
//   inspectiondate: inspection['INSPECTION DATE'],
//   boro: inspection.BORO,
//   building: inspection.BUILDING,
//   street: inspection.STREET,
//   zipcode: inspection.ZIPCODE,
//   phone: inspection.PHONE,
//   cuisine: inspection.CUISINE,
//   action: inspection.ACTION,
//   score: inspection.SCORE,
//   grade: inspection.GRADE,
//   gradedate: inspection['GRADE DATE'],
//   inspectiontype: inspection['INSPECTION TYPE']
// })
// // .pipe(etl.postgres.upsert(pool,'testschema', 'testable', {concurrency: 4}))
// const violations = await Promise.all([
//   Violation.create({
//     code: '10F',
//     description:
//       'Non-food contact surface improperly constructed. Unacceptable material used. Non-food contact surface or equipment improperly maintained and/or not properly sealed, raised, spaced or movable to allow accessibility for cleaning on all sides, above and underneath the unit.',
//     criticalflag: 'Not Critical'
//   })
// ])
