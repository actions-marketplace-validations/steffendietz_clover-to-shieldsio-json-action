import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';

import { xml2js } from 'xml-js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

const storeData = (data, path) => {
    try {
        const dirname = path.dirname(path)
        if (!existsSync(dirname)) {
            mkdirSync(dirname, { recursive: true })
        }
        writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

const preparePath = (relativePath) => {
    return path.join(process.env.GITHUB_WORKSPACE, relativePath)
}

try {
    const pathToClover = getInput('path-to-clover');
    const pathToShieldsIoJson = getInput('path-to-json');

    const style = getInput('style');
    const labelText = getInput('label-text');
    // thresholds
    const badThreshold = getInput('bad-threshold');
    const averageThreshold = getInput('average-threshold');
    const aboveAverageThreshold = getInput('above-average-threshold');
    // colors
    const badColor = getInput('bad-color');
    const averageColor = getInput('average-color');
    const aboveAverageColor = getInput('above-average-color');
    const goodColor = getInput('good-color');

    const xml = readFileSync(preparePath(pathToClover))
    const conversionResult = xml2js(xml, { compact: true })

    const coverageMetrics = conversionResult.coverage.project.metrics

    const codeCoveragePercent = ((coverageMetrics._attributes.coveredstatements / coverageMetrics._attributes.statements) * 100).toFixed(2)

    let color = goodColor
    if (codeCoveragePercent < aboveAverageThreshold) {
        color = aboveAverageColor
    } else if (codeCoveragePercent < averageThreshold) {
        color = averageColor
    } else if (codeCoveragePercent < badThreshold) {
        color = badColor
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
    setFailed(error.message);
}