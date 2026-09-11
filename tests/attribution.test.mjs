// Run with Node 22.13+ : node --test tests/attribution.test.mjs
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import { runInNewContext } from 'node:vm'
import test from 'node:test'

const source = stripTypeScriptTypes(readFileSync(new URL('../lib/utmParams.ts', import.meta.url), 'utf8'))
  .replace(/\bexport /g, '')
const key = 'robobooth_attribution'
const storage = () => {
  const values = new Map()
  return { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, v) }
}
function setup(blocked = []) {
  const window = { location: { pathname: '/corporate', search: '' } }
  for (const kind of ['localStorage', 'sessionStorage']) {
    if (blocked.includes(kind)) Object.defineProperty(window, kind, { get() { throw Error('Storage blocked') } })
    else window[kind] = storage()
  }
  const api = runInNewContext(source + '\n;({storeUtmParams,appendUtmParams})', {
    window, document: { referrer: 'https://instagram.com/' }, URLSearchParams, Date,
  })
  return {
    window,
    visit(search) { window.location.search = search; api.storeUtmParams() },
    submit() { const fd = new FormData(); api.appendUtmParams(fd); return Object.fromEntries(fd) },
  }
}
const paid = '?utm_source=ig&utm_medium=paid_social&utm_content=Ad2&campaign_id=c2&adset_id=s2&ad_id=a2'

test('paid IDs survive internal navigation and keep legacy aliases', () => {
  const h = setup(); h.visit(paid); h.visit('')
  const data = h.submit()
  assert.equal(data.ad_id, 'a2'); assert.equal(data.hsa_ad, 'a2')
  assert.equal(data.hsa_cam, 'c2'); assert.equal(data.hsa_grp, 's2')
})
test('a bio visit never inherits IDs from a previous paid ad', () => {
  const h = setup(); h.visit(paid); h.visit('?utm_source=ig&utm_medium=social&utm_content=link_in_bio')
  const data = h.submit()
  assert.equal(data.utm_content, 'link_in_bio')
  for (const field of ['ad_id', 'adset_id', 'campaign_id', 'hsa_ad', 'hsa_cam', 'hsa_grp']) assert.equal(data[field], undefined)
})
test('a partially tagged new ad does not inherit the previous campaign', () => {
  const h = setup(); h.visit(paid); h.visit('?ad_id=a4')
  assert.equal(h.submit().ad_id, 'a4'); assert.equal(h.submit().campaign_id, undefined)
  assert.equal(h.submit().utm_content, undefined)
})
for (const blocked of [['localStorage'], ['sessionStorage'], ['localStorage', 'sessionStorage']]) {
  test(`capture survives blocked ${blocked.join(' and ')}`, () => {
    const h = setup(blocked); h.visit(paid)
    assert.equal(h.submit().ad_id, 'a2')
  })
}
test('newer cross-tab attribution wins over stale session attribution', () => {
  const h = setup()
  h.window.sessionStorage.setItem(key, JSON.stringify({ ad_id: 'old', attribution_captured_at: new Date(Date.now() - 10000).toISOString() }))
  h.window.localStorage.setItem(key, JSON.stringify({ ad_id: 'new', attribution_captured_at: new Date().toISOString() }))
  assert.equal(h.submit().ad_id, 'new')
})
test('invalid storage, expired records, and preview tokens do not become lead attribution', () => {
  const h = setup()
  h.window.localStorage.setItem(key, 'null')
  h.window.sessionStorage.setItem(key, JSON.stringify({ ad_id: 'expired', attribution_captured_at: '2020-01-01' }))
  h.visit('?ad_id={{ad.id}}')
  assert.deepEqual(h.submit(), {})
})
test('fresh untagged traffic is not assigned an invented ad', () => {
  const h = setup(); h.visit(''); assert.deepEqual(h.submit(), {})
})
