import createConnection from '../../Database'
import Factory from '../../Database/factory'
import { Connection, getConnection } from 'typeorm'

import test from 'japa'
import app from '../../server'
import request from 'supertest'

let connection: Connection
const factory = new Factory()

test.group('> [1] User', group => {
  group.before(async () => {
    connection = await createConnection('test-connection')
    await connection.runMigrations()
  })

  group.beforeEach(async () => {
    await connection.query('DELETE FROM users')
  })

  group.after(async () => {
    await connection.dropDatabase()
    const mainConnection = getConnection()

    await connection.close()
    await mainConnection.close()
  })

  test('> [A] it should store a user', async assert => {
    const response = await request(app).post(`${process.env.APP_PREFIX}/users`)
    .send({
      // json body
    })

    assert.exists(response.body.data.name)
  }).timeout(5000) // 5 segundos, remove pra ficar sem timeout
})
