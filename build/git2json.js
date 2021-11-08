var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./parsers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const parsers_1 = __importDefault(require("./parsers"));
    // Default fields
    // see https://git-scm.com/docs/pretty-formats for placeholder codes
    const defaultFields = {
        refs: { value: '%d', parser: parsers_1.default.parents },
        hash: { value: '%H' },
        hashAbbrev: { value: '%h' },
        tree: { value: '%T' },
        treeAbbrev: { value: '%t' },
        parents: { value: '%P', parser: parsers_1.default.parents },
        parentsAbbrev: { value: '%p', parser: parsers_1.default.parents },
        'author.name': { value: '%an' },
        'author.email': { value: '%ae' },
        'author.timestamp': { value: '%at', parser: parsers_1.default.timestamp },
        'author.date': { value: '%ad' },
        'committer.name': { value: '%cn' },
        'committer.email': { value: '%ce' },
        'committer.timestamp': { value: '%ct', parser: parsers_1.default.timestamp },
        subject: { value: '%s' },
        body: { value: '%b' },
        notes: { value: '%N' }
    };
    function run({ fields = defaultFields, path = process.cwd(), paths = path, extraLogOptions = ["--all"] } = {}) {
        // this require can't be global for mocking issue
        const { spawn } = require('child_process');
        const keys = Object.keys(fields);
        const prettyKeys = keys.map((a) => fields[a].value).join('%x00');
        paths = Array.isArray(paths) ? paths : [paths];
        const args = paths.map((path) => [
            '-C',
            path,
            'log',
            `--pretty=format:%x01${prettyKeys}%x01`,
            '--numstat',
            '--date-order'
        ].concat(extraLogOptions));
        return Promise.all(args.map(args => new Promise((resolve, reject) => {
            let stderr = '';
            let stdout = '';
            const cp = spawn('git', args);
            cp.stdout.on('data', (data) => {
                stdout += data;
            });
            cp.stderr.on('data', (data) => {
                stderr += data;
            });
            cp.on('error', reject)
                .on('close', (code) => {
                if (code !== 0) {
                    reject(stderr);
                }
                const data = stdout.split('\u0001');
                const stats = data.filter((a, i) => (i + 1) % 2);
                let json = data.filter((a, i) => i % 2).map((raw, k) => {
                    return Object.assign(raw.split('\u0000').reduce((mem, field, j) => {
                        const value = fields[keys[j]].parser
                            ? fields[keys[j]].parser(field)
                            : field.trim();
                        // Deal with nested key format (eg: 'author.name')
                        if (/\./.exec(keys[j])) {
                            let nameParts = keys[j].split('.');
                            mem[nameParts[0]] = Object.assign({}, mem[nameParts[0]], {
                                [nameParts[1]]: value
                            });
                        }
                        else {
                            mem[keys[j]] = value;
                        }
                        return mem;
                    }, {}), {
                        // Add parsed stats of each commit
                        stats: stats[k + 1]
                            .split('\n')
                            .filter((a) => a)
                            .map(a => {
                            let b = a.split('\t');
                            return {
                                additions: isNaN(b[0]) ? null : +b[0],
                                deletions: isNaN(b[1]) ? null : +b[1],
                                file: b[2]
                            };
                        })
                    });
                });
                resolve(json);
            });
        }))).then((item) => [].concat(...item));
    }
    exports.default = {
        run,
        defaultFields,
        parsers: parsers_1.default,
    };
});
