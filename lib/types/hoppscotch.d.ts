export interface HoppscotchEnvironmentVariableEntry {
    key: string;
    value: string;
}
export interface HoppscotchEnvironment {
    name: string;
    variables: HoppscotchEnvironmentVariableEntry[];
}
