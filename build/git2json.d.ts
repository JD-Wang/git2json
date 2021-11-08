export declare const defaultFields: {
    refs: {
        value: string;
        parser: (a: string) => string[];
    };
    hash: {
        value: string;
    };
    hashAbbrev: {
        value: string;
    };
    tree: {
        value: string;
    };
    treeAbbrev: {
        value: string;
    };
    parents: {
        value: string;
        parser: (a: string) => string[];
    };
    parentsAbbrev: {
        value: string;
        parser: (a: string) => string[];
    };
    'author.name': {
        value: string;
    };
    'author.email': {
        value: string;
    };
    'author.timestamp': {
        value: string;
        parser: (a: string) => number;
    };
    'author.date': {
        value: string;
    };
    'committer.name': {
        value: string;
    };
    'committer.email': {
        value: string;
    };
    'committer.timestamp': {
        value: string;
        parser: (a: string) => number;
    };
    subject: {
        value: string;
    };
    body: {
        value: string;
    };
    notes: {
        value: string;
    };
};
/**
 * Execute git log on current folder and return a pretty object
 *
 * @param {object} [options]
 * @param {object} [options.fields] - fields to exports
 * @param {string} [options.path] - path of target git repo
 * @return {Promise}
 */
interface Params {
    fields?: any;
    path?: string;
    paths?: string | string[];
    extraLogOptions?: string[];
}
export declare function run({ fields, path, paths, extraLogOptions }?: Params): Promise<never[]>;
export {};
