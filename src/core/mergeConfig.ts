/* eslint-disable max-len */
import { isArray, isObject } from 'util';
import { deepMerge } from '../helpers/util';
import { AxiosRequestConfig } from '../types';

interface StrategyMap {
  [propName: string]: any;
}

const strategyMap: StrategyMap = {};

function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1;
}

function formVal2Strategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2;
  }
}

function deepMergeStrategy(val1: any, val2: any): any {
  if (isObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== 'undefined') {
    return val2;
  } else if (isObject(val1)) {
    return deepMerge(val1);
  } else if (typeof val1 !== 'undefined') {
    return val1;
  }
}

function transformStrategy(val1: any, val2: any): any {
  if (isArray(val2)) {
    return val1.concat(val2);
  } else if (val2) {
    val1.push(val2);
    return val1;
  }
  return val1;
}

const StrategyKeys = ['data', 'params', 'url'];
StrategyKeys.forEach((key) => {
  strategyMap[key] = formVal2Strategy;
});

const StrategyKeysDeepMerge = ['headers'];
StrategyKeysDeepMerge.forEach((key) => {
  strategyMap[key] = deepMergeStrategy;
});

const StrategyKeysTransform = ['transformRequest', 'transformResponse'];
StrategyKeysTransform.forEach((key) => {
  strategyMap[key] = transformStrategy;
});

export default function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig = {}): AxiosRequestConfig {
  const config = Object.create(null);
  const mergeField = (key: string): void => {
    const strategy = strategyMap[key] || defaultStrategy;
    config[key] = strategy(config1[key], config2![key]);
  };


  for (const key in config2) {
    if (config2[key]) {
      mergeField(key);
    }
  }

  for (const key in config1) {
    if (typeof config2[key] === 'undefined') {
      mergeField(key);
    }
  }

  return config!;
}
