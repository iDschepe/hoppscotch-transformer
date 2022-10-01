export interface PostmanEnvironmentVariableEntry {
  key: string;
  value: string;
  enabled: boolean;
  type: string;
}

export interface PostmanEnvironment {
  id: string;
  name: string;
  values: PostmanEnvironmentVariableEntry[];
}
