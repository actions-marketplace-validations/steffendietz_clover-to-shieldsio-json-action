const ghrun = require('github-action-ts-run-api');
const fs = require('fs');

test('test creation of sieldsio.json', async () => {
    // RunTarget.preJsScript() and RunTarget.postJsScript() are also available
    const target = ghrun.RunTarget.jsFile('index.js', 'action.yml');
    const options = ghrun.RunOptions.create()
        // Internally, runner will fake a json file to be picked by @actions/github
        .setGithubContext({ payload: { pull_request: { number: 123 } } })
        .setWorkspaceDir('tests');

    const res = await target.run(options);

    let rawdata = fs.readFileSync('tests/shieldsio.json');
    let shieldsio = JSON.parse(rawdata);

    expect(shieldsio).toHaveProperty('message', '91.23%');
});
