# Clover to ShieldsIO JSON Action

This action uses the `metrics` of a `clover.xml` to calculate a code-coverage percentage and generates a JSON file for ShieldsIOs [enpdoint badges](https://shields.io/endpoint).

The resulting JSON file could be deployed to a custom server or probably to [GitHub Pages](https://pages.github.com) using the [Deploy to GitHub Pages](https://github.com/marketplace/actions/deploy-to-github-pages) action.

The badge generated based on the resulting JSON file could look something like this:

![Example Badge](https://img.shields.io/badge/coverage-91.02%25-green)

## Example usage

```yml
- name: "Coverage processing"
  uses: steffendietz/clover-to-shieldsio-json-action@v1.0
  with:
    path-to-clover: "clover.xml"
    path-to-json: "build/shieldsio-coverage.json"
    style: "flat-square"
```

## Inputs

### `path-to-clover`

**required**

Relative path from repository root to clover.xml.
Defaults to: `clover.xml`

### `path-to-json`

**required**

Relative path from repository root where ShieldsIO endpoint JSON is created.
Defaults to: `shieldsio.json`

### `label-text`

The left text of the badge; empty to omit left side.
Defaults to: `coverage`

### `style`

The badge style.
Defaults to: `flat`

### `bad-threshold`

Below this coverage percent, the color will be `bad-color`.
Defaults to: `50`

### `average-threshold`

Below this coverage percent, the color will be `average-color`.
Defaults to: `75`

### `above-average-threshold`

Below this coverage percent, the color will be `above-average-color`.
Defaults to: `95`

### `bad-color`

The color used for bad code coverage.
Defaults to: `red`

### `average-color`

The color used for average code coverage.
Defaults to: `yellow`

### `above-average-color`

The color used for above average code coverage.
Defaults to: `green`

### `good-color`

The color used for good code coverage.
Defaults to: `brightgreen`