import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFeed, getVideos } from './youtube.mjs';

const SAMPLE_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015">
  <title>Evan Bryce Riddle</title>
  <entry>
    <yt:videoId>aaa111AAAaa</yt:videoId>
    <title>First &amp; Best</title>
  </entry>
  <entry>
    <yt:videoId>bbb222BBBbb</yt:videoId>
    <title>Second video</title>
  </entry>
  <entry>
    <yt:videoId>ccc333CCCcc</yt:videoId>
    <title>Third video</title>
  </entry>
</feed>`;

// ── parseFeed: the expected number of video IDs ────────────────────────────
test('parseFeed extracts every video with id + decoded title', () => {
  const videos = parseFeed(SAMPLE_FEED);
  assert.equal(videos.length, 3);
  assert.deepEqual(
    videos.map((v) => v.id),
    ['aaa111AAAaa', 'bbb222BBBbb', 'ccc333CCCcc'],
  );
  assert.equal(videos[0].title, 'First & Best'); // entity decoded
});

// ── parseFeed: graceful on empty / bad input ───────────────────────────────
test('parseFeed returns [] for empty or non-string input', () => {
  assert.deepEqual(parseFeed(''), []);
  assert.deepEqual(parseFeed(undefined), []);
  assert.deepEqual(parseFeed(null), []);
});

test('parseFeed returns [] for malformed / unrelated XML', () => {
  assert.deepEqual(parseFeed('<nonsense>nothing here</nonsense>'), []);
  assert.deepEqual(parseFeed('not xml at all'), []);
});

// ── getVideos: success path (rss) ──────────────────────────────────────────
test('getVideos returns parsed videos, trimmed to count', async () => {
  const fakeFetch = async () => ({ ok: true, status: 200, text: async () => SAMPLE_FEED });
  const { videos, source } = await getVideos({
    mode: 'rss',
    channelId: 'CHAN',
    count: 2,
    fallbackIds: ['fallback1'],
    fetchImpl: fakeFetch,
  });
  assert.equal(source, 'rss');
  assert.equal(videos.length, 2);
  assert.equal(videos[0].id, 'aaa111AAAaa');
});

// ── getVideos: graceful fallback on a failed feed ──────────────────────────
test('getVideos falls back to manual IDs when the fetch throws', async () => {
  const failingFetch = async () => {
    throw new Error('network down');
  };
  const { videos, source } = await getVideos({
    mode: 'rss',
    channelId: 'CHAN',
    count: 6,
    fallbackIds: ['fb1', 'fb2'],
    fetchImpl: failingFetch,
  });
  assert.equal(source, 'manual');
  assert.deepEqual(
    videos.map((v) => v.id),
    ['fb1', 'fb2'],
  );
});

test('getVideos falls back when the feed parses to zero videos', async () => {
  const emptyFetch = async () => ({ ok: true, status: 200, text: async () => '<feed></feed>' });
  const { source } = await getVideos({
    mode: 'rss',
    channelId: 'CHAN',
    count: 6,
    fallbackIds: ['fb1'],
    fetchImpl: emptyFetch,
  });
  assert.equal(source, 'manual');
});

test('getVideos falls back when the response is an HTTP error', async () => {
  const errorFetch = async () => ({ ok: false, status: 503, text: async () => '' });
  const { source } = await getVideos({
    mode: 'rss',
    channelId: 'CHAN',
    count: 6,
    fallbackIds: ['fb1'],
    fetchImpl: errorFetch,
  });
  assert.equal(source, 'manual');
});

// ── getVideos: manual mode never hits the network ──────────────────────────
test('getVideos in manual mode uses fallback IDs without fetching', async () => {
  let called = false;
  const spyFetch = async () => {
    called = true;
    throw new Error('should not be called');
  };
  const { videos, source } = await getVideos({
    mode: 'manual',
    channelId: 'CHAN',
    count: 6,
    fallbackIds: ['m1', 'm2'],
    fetchImpl: spyFetch,
  });
  assert.equal(called, false);
  assert.equal(source, 'manual');
  assert.deepEqual(
    videos.map((v) => v.id),
    ['m1', 'm2'],
  );
});
