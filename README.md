# Clover to ShieldsIO JSON Action

This action uses the `metrics` of a `clover.xml` to calculate a code-coverage percentage and generate a JSON file for ShieldsIOs [enpoint badges](https://shields.io/endpoint).

The resulting JSON file could then be deployed to a custom server or probably to [GitHub Pages](https://github.com/marketplace/actions/deploy-to-github-pages).

The badge generated based on the JSON file could look something like this:

![Example Badge](https://img.shields.io/badge/coverage-91.02%25-green)