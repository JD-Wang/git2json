# git-log-json

>Frok from [git2json](https://github.com/fabien0102/git2json)

Simple tool to get a JSON from your git log.

## CLI usage

1. Install package globally -> `npm i -g git-log-json` or `yarn global add git-log-json`
1. Navigate to your local git repository folder
1. Do `git2json > export.json`
1. Voilà!

## Lib usage

1. Add dependency -> `npm i -s git-log-json` or `yarn add git-log-json`
1. Use it!

```javascript
import git2json from 'git-log-json'

git2json
  .run()
  .then(myGitLogJSON => console.log(myGitLogJSON));
```

## Advanced usage

If needed, you have access to `parsers` and `defaultFields` for easy overriding.

Example:

```javascript
import git2json from 'git-log-json'
const exportedFields = {
  author: git2json.defaultFields['author.name'],
  commit: git2json.defaultFields.commit,
  shortTree: { value: '%T', parser: a => a.slice(0, 5)}
};

git2json
  // more extra like
  // extraLogOptions: ['v1.0.0..v3.0.0'] 
  .run({fields: exportedFields}, extraLogOptions: []) 
  .then(json => console.log(json));
```

You can also specify a path, or paths, for the git repository. Just like the above options, doing so is optional with sane defaults. Multiple paths results in a flattened combined log output.

Example specifying `path`:

```javascript
import git2json from 'git-log-json'
const path = '~/src/hack/git2json';

git2json
  .run({ path })
  .then(console.log);
```

Example specifying `paths`:

```javascript
import git2json from 'git-log-json'
const paths = ['~/etc', '~/src/hack/git2json'];

git2json
  .run({ paths })
  .then(console.log);
```