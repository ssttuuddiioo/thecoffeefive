import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findLotByHandle, lotHandles } from '../src/lib/lot-urls';

const lots = [
  { ref: 'HS-002', name: 'Sidra Honey' },
  { ref: 'RG-002', name: 'Regional +' },
  { ref: 'HS-006', name: 'Wush Wush Washed' },
];

test('the URL is the current name', () => {
  const handles = lotHandles(lots);
  assert.equal(handles.get('HS-002'), 'sidra-honey');
  assert.equal(handles.get('RG-002'), 'regional');
  assert.equal(findLotByHandle(lots, 'sidra-honey')?.ref, 'HS-002');
});

test('an old coffee name or a ref never opens another coffee', () => {
  // HS-002 used to be Chiroso Natural before the ref was reused.
  assert.equal(findLotByHandle(lots, 'chiroso-natural'), undefined);
  assert.equal(findLotByHandle(lots, 'hs-002'), undefined);
});

test('two lots with the same name both keep a page', () => {
  const twins = [
    { ref: 'HS-006', name: 'Wush Wush' },
    { ref: 'HS-009', name: 'Wush Wush' },
  ];
  const handles = lotHandles(twins);
  assert.equal(handles.get('HS-006'), 'wush-wush-hs-006');
  assert.equal(handles.get('HS-009'), 'wush-wush-hs-009');
  assert.equal(findLotByHandle(twins, 'wush-wush-hs-009')?.ref, 'HS-009');
});
