/**
 * ApplicationHealth used to check all application integrations
 * and return status of each of then
 */
export interface ApplicationHealthDetailed {
  name: string;
  status: boolean;
  version: string;
  date: Date;
  duration: number;
  integrations: Integration[];
}
// ApplicationHealthSimple used to simple return a string "OK"
export interface ApplicationHealthSimple {
  status: string;
}
// Integration is the type result for requests
export interface Integration {
  name: string;
  kind: HealthIntegration;
  status: boolean;
  response_time: number;
  url?: string;
  error?: any;
}
// Auth is a default  to map user/pass protocol
export interface Auth {
  user?: string;
  password: string;
}
// ApplicationConfig is a config contract to init health caller
export interface ApplicationConfig {
  name?: string;
  version?: string;
  integrations: IntegrationConfig[];
}
// IntegrationConfig used to inform each integration config
export interface IntegrationConfig {
  type: HealthTypes;
  name: string;
  host?: string;
  uri?: string;
  port?: number;
  headers?: HTTPHeader[];
  db?: number;
  timeout?: number;
  auth?: Auth;
  Aws?: Aws;
}

// Aws is the interface to config aws services (dynamo)
export interface Aws {
  region?: string;
  access_key_id?: string;
  secret_access_key?: string;
}
// HTTPHeader used to setup webservices integrations
export interface HTTPHeader {
  key: string;
  value: string;
}
// Mapped types for IntegrationConfig
export enum HealthTypes {
  Redis = "Redis",
  Web = "Web",
  MongoDb = "MongoDb",
}
// Mapped types for kinds of integrations
export enum HealthIntegration {
  RedisIntegration = "Redis DB integration",
  WebServiceIntegration = "Web integrated API",
  MongoDbntegration = "MongoDb integraton",
  // MemcachedIntegration = "Memcached integraton",
  // DynamoDbIntegration = "AWS Dynamo DB",
}
// DefaultTimeOuts define all integration default timeouts
export enum Defaults {
  RedisTimeout = 2 * 1000,
  RedisDB = 0,
  RedisPort = 6379,
  MongoDbTimeout = 10000,
  MemcachedTimeout = 1000,
  MemcachePort = 11211,
  WebTimeout = 10 * 1000,
}
// HTTPChecker used to return in all services protocol
export interface HTTPChecker {
  status: boolean;
  error?: any;
}
