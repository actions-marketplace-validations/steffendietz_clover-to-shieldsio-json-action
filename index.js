const core = require('@actions/core')
const xmljs = require('xml-js')
const fs = require('fs')
const path = require('path')

const storeData = (data, fileName) => {
    try {
        const dirName = path.dirname(fileName)
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, { recursive: true })
        }
        fs.writeFileSync(fileName, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

const preparePath = (relativePath) => {
    return path.join(process.env.GITHUB_WORKSPACE, relativePath)
}

try {
    const pathToClover = core.getInput('path-to-clover');
    const pathToShieldsIoJson = core.getInput('path-to-json');

    const style = core.getInput('style');
    const labelText = core.getInput('label-text');
    // thresholds
    const badThreshold = core.getInput('bad-threshold');
    const averageThreshold = core.getInput('average-threshold');
    const aboveAverageThreshold = core.getInput('above-average-threshold');
    // colors
    const badColor = core.getInput('bad-color');
    const averageColor = core.getInput('average-color');
    const aboveAverageColor = core.getInput('above-average-color');
    const goodColor = core.getInput('good-color');

    const xml = fs.readFileSync(preparePath(pathToClover))
    const conversionResult = xmljs.xml2js(xml, { compact: true })

    const coverageMetrics = conversionResult.coverage.project.metrics

    const codeCoveragePercent = ((coverageMetrics._attributes.coveredstatements / coverageMetrics._attributes.statements) * 100).toFixed(2)

    let color = badColor
    if (codeCoveragePercent >= aboveAverageThreshold) {
        color = goodColor
    } else if (codeCoveragePercent >= averageThreshold) {
        color = aboveAverageColor
    } else if (codeCoveragePercent >= badThreshold) {
        color = averageColor
    }

    const shieldsIoBadge = {
        schemaVersion: 1,
        label: labelText,
        message: codeCoveragePercent + '%',
        "color": color,
        isError: true,
        style: style
    }

    storeData(shieldsIoBadge, preparePath(pathToShieldsIoJson))

    console.log(shieldsIoBadge);
} catch (error) {
    core.setFailed(error.message);
}