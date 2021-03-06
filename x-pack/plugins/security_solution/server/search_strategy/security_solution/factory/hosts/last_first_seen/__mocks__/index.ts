/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { HostsQueries } from '../../../../../../../common/search_strategy';

export const mockOptions = {
  defaultIndex: [
    'apm-*-transaction*',
    'auditbeat-*',
    'endgame-*',
    'filebeat-*',
    'logs-*',
    'packetbeat-*',
    'winlogbeat-*',
  ],
  docValueFields: [],
  factoryQueryType: HostsQueries.firstLastSeen,
  hostName: 'siem-kibana',
};

export const mockSearchStrategyResponse = {
  isPartial: false,
  isRunning: false,
  rawResponse: {
    took: 230,
    timed_out: false,
    _shards: { total: 21, successful: 21, skipped: 0, failed: 0 },
    hits: { total: -1, max_score: 0, hits: [] },
    aggregations: {
      lastSeen: { value: 1599554931759, value_as_string: '2020-09-08T08:48:51.759Z' },
      firstSeen: { value: 1591611722000, value_as_string: '2020-06-08T10:22:02.000Z' },
    },
  },
  total: 21,
  loaded: 21,
};

export const formattedSearchStrategyResponse = {
  isPartial: false,
  isRunning: false,
  rawResponse: {
    took: 230,
    timed_out: false,
    _shards: { total: 21, successful: 21, skipped: 0, failed: 0 },
    hits: { total: -1, max_score: 0, hits: [] },
    aggregations: {
      lastSeen: { value: 1599554931759, value_as_string: '2020-09-08T08:48:51.759Z' },
      firstSeen: { value: 1591611722000, value_as_string: '2020-06-08T10:22:02.000Z' },
    },
  },
  total: 21,
  loaded: 21,
  inspect: {
    dsl: [
      '{\n  "allowNoIndices": true,\n  "index": [\n    "apm-*-transaction*",\n    "auditbeat-*",\n    "endgame-*",\n    "filebeat-*",\n    "logs-*",\n    "packetbeat-*",\n    "winlogbeat-*"\n  ],\n  "ignoreUnavailable": true,\n  "body": {\n    "docvalue_fields": [],\n    "aggregations": {\n      "firstSeen": {\n        "min": {\n          "field": "@timestamp"\n        }\n      },\n      "lastSeen": {\n        "max": {\n          "field": "@timestamp"\n        }\n      }\n    },\n    "query": {\n      "bool": {\n        "filter": [\n          {\n            "term": {\n              "host.name": "siem-kibana"\n            }\n          }\n        ]\n      }\n    },\n    "size": 0,\n    "track_total_hits": false\n  }\n}',
    ],
  },
  firstSeen: '2020-06-08T10:22:02.000Z',
  lastSeen: '2020-09-08T08:48:51.759Z',
};

export const expectedDsl = {
  allowNoIndices: true,
  index: [
    'apm-*-transaction*',
    'auditbeat-*',
    'endgame-*',
    'filebeat-*',
    'logs-*',
    'packetbeat-*',
    'winlogbeat-*',
  ],
  ignoreUnavailable: true,
  body: {
    docvalue_fields: [],
    aggregations: {
      firstSeen: { min: { field: '@timestamp' } },
      lastSeen: { max: { field: '@timestamp' } },
    },
    query: { bool: { filter: [{ term: { 'host.name': 'siem-kibana' } }] } },
    size: 0,
    track_total_hits: false,
  },
};
