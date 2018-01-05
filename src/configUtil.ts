import * as path from 'path';
import * as fs from 'fs';
import { ConfigRoot, Broker, BrokerConfig } from './types';
import { readJsonFileSync } from './util';

export function getConfigRoot(): ConfigRoot {
  let configPath =
    process.env.NODE_ENV !== 'test' ? `${__dirname}/config.json` : `${__dirname}/__tests__/config_test.json`;
  if (!fs.existsSync(configPath)) {
    configPath = path.join(process.cwd(), path.basename(configPath));
  }
  return new ConfigRoot(readJsonFileSync(configPath));
}

export function findBrokerConfig(configRoot: ConfigRoot, broker: Broker): BrokerConfig {
  const found = configRoot.brokers.find(brokerConfig => brokerConfig.broker === broker);
  if (found === undefined) {
    throw new Error(`Unabled to find ${broker} in config.`);
  }
  return found;
}
