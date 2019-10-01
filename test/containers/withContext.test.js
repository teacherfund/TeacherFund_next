import test from 'ava'
import sinon from 'sinon'
import Router from 'next/router'
import * as api from '../../api/api'
import withContext from '../../containers/withContext'

const response = { json: () => Promise.resolve({ ok: true }) }

test('withContext => constructor => helpers', (t) => {
  // setup
  const WC = withContext()

  // execution
  const wc = new WC()

  // assertions
  t.deepEqual(Object.keys(wc.helpers), [
    'handleSignup',
    'handleLogin',
    'handleVerify',
    'fetchUserStats',
    'fetchGlobalStats'
  ])
})

test('withContext => handleSignup', async (t) => {
  // setup
  const WC = withContext()
  const wc = new WC()
  const data = { email: 'a', firstName: 'b', lastName: 'c', role: 'd' }
  sinon.stub(api, 'register').resolves(response)
  sinon.stub(Router, 'push')

  // execution
  await wc.handleSignup(data)

  // assertions
  t.true(api.register.calledWith(data))
  t.true(Router.push.calledWith('/post-login'))

  // cleanup
  api.register.restore()
  Router.push.restore()
})

test('withContext => fetchGlobalStats', async (t) => {
  // setup
  const WC = withContext()
  const wc = new WC()
  sinon.stub(wc, 'setState')
  sinon.stub(api, 'fetchAllDonations').resolves({
    json: () => Promise.resolve({
      ok: true,
      donations: [{ amount: 300 }, { amount: 200 }, { amount: 100 }],
      amountSpent: 100
    })
  })

  // execution
  await wc.fetchGlobalStats()

  // assertions
  t.true(api.fetchAllDonations.calledOnce)
  t.true(wc.setState.calledWith({
    globalAmountDonated: 6,
    globalAmountSpent: 100
  }))

  // cleanup
  api.fetchAllDonations.restore()
  wc.setState.restore()
})

test('withContext => handleVerify => success', async (t) => {
  // setup
  const WC = withContext()
  const wc = new WC()
  const data = { email: 'a', auth: 'b' }
  sinon.stub(api, 'verify').resolves(response)
  sinon.stub(wc, 'setState')
  sinon.stub(wc, 'fetchUserStats')

  // execution
  await wc.handleVerify(data)

  // assertions
  t.true(api.verify.calledWith(data))
  t.true(wc.setState.calledWith({ loggedIn: true, ...data }))
  t.true(wc.fetchUserStats.calledOnce)

  // cleanup
  api.verify.restore()
  wc.setState.restore()
  wc.fetchUserStats.restore()
})

test('withContext => handleVerify => failure', async (t) => {
  // setup
  const WC = withContext()
  const wc = new WC()
  const data = { email: 'a', auth: 'b' }
  sinon.stub(wc, 'setState')
  sinon.stub(api, 'verify').resolves({
    json: () => Promise.resolve({ ok: false })
  })
  sinon.stub(wc, 'fetchUserStats')

  // execution
  try {
    await wc.handleVerify(data)
  } catch (e) {
    t.deepEqual(e.message, 'authentication failed')
  }

  // assertions
  t.true(api.verify.calledWith(data))
  t.true(wc.setState.calledWith({ loggedIn: false }))
  t.true(wc.fetchUserStats.notCalled)

  // cleanup
  api.verify.restore()
  wc.setState.restore()
  wc.fetchUserStats.restore()
})

test('withContext => fetchUserStats', async (t) => {
  // setup
  const WC = withContext()
  const wc = new WC()
  wc.state.email = 'a'
  wc.state.auth = 'b'
  sinon.stub(wc, 'setState')
  sinon.stub(api, 'fetchUserStats').resolves({
    json: () => Promise.resolve({
      ok: true,
      donations: [100]
    })
  })

  // execution
  await wc.fetchUserStats()

  // assertions
  t.true(api.fetchUserStats.calledWith({
    email: 'a', auth: 'b'
  }))
  t.true(wc.setState.calledWith({ userAmountDonated: [100] }))

  // cleanup
  api.fetchUserStats.restore()
  wc.setState.restore()
})
