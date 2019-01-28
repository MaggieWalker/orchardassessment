'use strict'

const db = require('../server/db')
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
          violationCode: inspection['VIOLATION CODE'],
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
          inspectionId: `${inspection['INSPECTION DATE']}${inspection.CAMIS}`,
          inspectiondate: inspection['INSPECTION DATE'],
          action: inspection.ACTION,
          score: inspection.SCORE,
          grade: inspection.GRADE,
          gradedate: inspection['GRADE DATE'],
          recorddate: inspection['RECORD DATE'],
          inspectiontype: inspection['INSPECTION TYPE'],
          createdAt: new Date(),
          updatedAt: new Date(),
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
