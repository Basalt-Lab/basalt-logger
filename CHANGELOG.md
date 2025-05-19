# Changelog

## v1.13.0-canary-20250519-8b05a3d

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.2-canary-20250505-340b01c...v1.13.0-canary-20250519-8b05a3d)

### 🚀 Enhancements

- **🚀:** [ enhance BasaltLogger full type-safe] ([aa66c77](https://github.com/Basalt-Lab/basalt-logger/commit/aa66c77))

### 🧹 Refactors

- **🧹:** [Refacto files structure] ([4fa283c](https://github.com/Basalt-Lab/basalt-logger/commit/4fa283c))
- **🧹:** [Refacto build, delete files, etc..] ([98cb820](https://github.com/Basalt-Lab/basalt-logger/commit/98cb820))

### 📦 Build

- **📦:** [Update ESLint and dependencies in package.json] ([6961f6e](https://github.com/Basalt-Lab/basalt-logger/commit/6961f6e))
- **📦:** [Fix incorrect path for error strategy file] Updated the path for the error strategy file from './source/strategy/index.ts' to './source/strategies/index.ts' to ensure correct file referencing in the build process. ([2e6a85d](https://github.com/Basalt-Lab/basalt-logger/commit/2e6a85d))

### 🦉 Chore

- **🦉:** V1.12.2 ([b9f0bf9](https://github.com/Basalt-Lab/basalt-logger/commit/b9f0bf9))
- **🦉:** [Add new issue templates for feature requests, bug reports, documentation, and help requests] ([68a8ad8](https://github.com/Basalt-Lab/basalt-logger/commit/68a8ad8))
- **🦉:** [Remove useless file] ([6646e01](https://github.com/Basalt-Lab/basalt-logger/commit/6646e01))

### 🧪 Tests

- **🧪:** [Refactor tests] ([d94c830](https://github.com/Basalt-Lab/basalt-logger/commit/d94c830))

### 🎨 Styles

- **🎨:** [Disable no-empty-object-type rule in ESLint config] ([78776ff](https://github.com/Basalt-Lab/basalt-logger/commit/78776ff))

### 🤖 CI

- **🤖:** [Update GitHub Actions workflows for release process] ([186dd02](https://github.com/Basalt-Lab/basalt-logger/commit/186dd02))

### ❤️ Contributors

- Ruby <necrelox@proton.me>
- Github-actions <necrelox@proton.me>

## v1.12.2

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.2-canary-20250505-340b01c...v1.12.2)

## v1.12.2-canary-20250505-340b01c

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.1-canary-20250408-8ff6c0a...v1.12.2-canary-20250505-340b01c)

### 🧹 Refactors

- **🧹:** [refactor import statements in basaltLogger.ts] ([dd24154](https://github.com/Basalt-Lab/basalt-logger/commit/dd24154))

### 📦 Build

- **📦:** [update devDependencies in package.json] ## Build Changes - Updated `@eslint/js` from `^9.24.0` to `^9.26.0` - Updated `@types/bun` from `^1.2.8` to `^1.2.12` - Updated `eslint` from `^9.24.0` to `^9.26.0` - Updated `tsc-alias` from `^1.8.13` to `^1.8.15` - Updated `typedoc` from `^0.28.2` to `^0.28.4` - Updated `typescript-eslint` from `^8.29.1` to `^8.31.1` ([46884ed](https://github.com/Basalt-Lab/basalt-logger/commit/46884ed))

### 🦉 Chore

- **🦉:** V1.12.1 ([a8132d9](https://github.com/Basalt-Lab/basalt-logger/commit/a8132d9))
- **🦉:** [add unit test script to package.json] ([355b08e](https://github.com/Basalt-Lab/basalt-logger/commit/355b08e))

### 🤖 CI

- **🤖:** [enhance pull request checker workflow] ([9189537](https://github.com/Basalt-Lab/basalt-logger/commit/9189537))
- **🤖:** [add reusable GitHub workflows for build, lint, test, and publish] ## CI Changes - Added `build.yml`: Defines a reusable workflow for building the project. - Added `lint.yml`: Implements a reusable workflow for linting the code with auto-fix capabilities. - Added `unit-test.yml`: Establishes a reusable workflow for running unit tests and summarizing results. - Added `create-github-release.yml`: Creates a reusable workflow for publishing releases on GitHub. - Added `publish-npm.yml`: Sets up a reusable workflow for publishing the package to NPM. ([1967cdd](https://github.com/Basalt-Lab/basalt-logger/commit/1967cdd))
- **🤖:** [refactor CI workflows for merge and pull request checks] - Updated `merge-dev.yml` and `merge-main.yml` to streamline job definitions and enhance reusability. - Consolidated lint, build, unit-test, create-github-release, and publish-npm jobs using reusable workflows. - Improved `pull-request-checker.yml` by removing redundant steps and utilizing reusable lint and build workflows. ([9b65e4a](https://github.com/Basalt-Lab/basalt-logger/commit/9b65e4a))
- **🤖:** [add reusable workflows for build, lint, unit test, and release] ([31151a8](https://github.com/Basalt-Lab/basalt-logger/commit/31151a8))
- **🤖:** [add final summary for unit test results] ## CI Changes - Added a final summary step to the unit test workflow. ## Description This change introduces a final summary output that indicates whether all unit tests passed or if some tests failed, providing clearer feedback in the workflow logs. ([69a85f7](https://github.com/Basalt-Lab/basalt-logger/commit/69a85f7))
- **🤖:** [enhance build and unit test summaries with duration and status] ## CI Changes - Updated build and unit test workflows to use millisecond precision for duration. - Improved final summary output to include status icons and detailed messages. - Changed summary tables to display duration in milliseconds for better clarity. ([6a0b5b4](https://github.com/Basalt-Lab/basalt-logger/commit/6a0b5b4))
- **🤖:** [refactor unit test step for improved output handling] ([b2518fd](https://github.com/Basalt-Lab/basalt-logger/commit/b2518fd))
- **🤖:** Update .github/workflows/create-github-release.yml ([ddce37c](https://github.com/Basalt-Lab/basalt-logger/commit/ddce37c))

### ❤️ Contributors

- Necrelox ([@Necrelox](https://github.com/Necrelox))
- Ruby <necrelox@proton.me>
- Github-actions <necrelox@proton.me>

## v1.12.1

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.1-canary-20250408-8ff6c0a...v1.12.1)

## v1.12.1-canary-20250408-8ff6c0a

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.0...v1.12.1-canary-20250408-8ff6c0a)

### 📦 Build

- **📦:** [Add build script for project setup] ([76335a4](https://github.com/Basalt-Lab/basalt-logger/commit/76335a4))
- **📦:** [Refactor TypeScript configuration for improved clarity] ## Refactoring - Consolidated TypeScript compiler options for better organization. - Enhanced module resolution and paths for improved project structure. - Added support for JavaScript files and interop constraints. ([2fe37dd](https://github.com/Basalt-Lab/basalt-logger/commit/2fe37dd))
- **📦:** [update package.json] ([38ba782](https://github.com/Basalt-Lab/basalt-logger/commit/38ba782))

### 🦉 Chore

- **🦉:** [Update .gitignore for improved file exclusions] ([6ee74ff](https://github.com/Basalt-Lab/basalt-logger/commit/6ee74ff))

### 🎨 Styles

- **🎨:** [Refactor ESLint configuration for improved clarity] ## Refactoring - Removed unused `tsdoclint` plugin. - Updated rules for better organization and clarity. - Adjusted TypeScript rules for consistency. ([2051553](https://github.com/Basalt-Lab/basalt-logger/commit/2051553))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.12.0

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.0-canary-20250130-9f3764c...v1.12.0)

## v1.12.0-canary-20250130-9f3764c

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.0-canary-20250129-e2fed1f...v1.12.0-canary-20250130-9f3764c)

### 🧹 Refactors

- **🧹:** Refactor error system and remove translation ([98fbe83](https://github.com/Basalt-Lab/basalt-logger/commit/98fbe83))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.12.0-canary-20250129-e2fed1f

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.0-canary-20250128-2792d81...v1.12.0-canary-20250129-e2fed1f)

### 🧹 Refactors

- **🧹:** Update error message keys for basalt-logger localization ([727617d](https://github.com/Basalt-Lab/basalt-logger/commit/727617d))

### 📦 Build

- **📦:** Add tsconfig.dts.json to .npmignore ([f35f9bd](https://github.com/Basalt-Lab/basalt-logger/commit/f35f9bd))
- **📦:** Update dependencies ([be0685c](https://github.com/Basalt-Lab/basalt-logger/commit/be0685c))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.12.0-canary-20250128-2792d81

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.0-canary-20250124-74e684f...v1.12.0-canary-20250128-2792d81)

### 📦 Build

- **📦:** Use tsc to generate .d.ts and tsc alias for relative path ([6d47c51](https://github.com/Basalt-Lab/basalt-logger/commit/6d47c51))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.12.0-canary-20250124-74e684f

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.0-canary-20250124-7745cdf...v1.12.0-canary-20250124-74e684f)

### 🧹 Refactors

- **🧹:** Rename error code to statusCode for clarity ([d3b3437](https://github.com/Basalt-Lab/basalt-logger/commit/d3b3437))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.12.0-canary-20250124-7745cdf

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.0-canary-20250124-1bd6eac...v1.12.0-canary-20250124-7745cdf)

### 📦 Build

- **📦:** Disable minify identifiers ([c4f9ac8](https://github.com/Basalt-Lab/basalt-logger/commit/c4f9ac8))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.12.0-canary-20250124-1bd6eac

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.0-canary-20250124-1c3d3bf...v1.12.0-canary-20250124-1bd6eac)

### 📖 Documentation

- **📖:** Update README & package description ([8f7d7f5](https://github.com/Basalt-Lab/basalt-logger/commit/8f7d7f5))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.12.0-canary-20250124-1c3d3bf

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.12.0-canary-20250124-53f2a2f...v1.12.0-canary-20250124-1c3d3bf)

### 🚀 Enhancements

- **🚀:** Add 'strategy_error' message to multiple language files ([e1956fa](https://github.com/Basalt-Lab/basalt-logger/commit/e1956fa))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.12.0-canary-20250124-53f2a2f

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.11.4-canary-20250123-37d2c3b...v1.12.0-canary-20250124-53f2a2f)

### 🚀 Enhancements

- **🚀:** Update logger strategy to support async logging ([2849190](https://github.com/Basalt-Lab/basalt-logger/commit/2849190))
- **🚀:** Add new error const ([f7d49e4](https://github.com/Basalt-Lab/basalt-logger/commit/f7d49e4))

### 🧪 Tests

- **🧪:** Enhance tests with error handling and strategy registration ([9b8f3e0](https://github.com/Basalt-Lab/basalt-logger/commit/9b8f3e0))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.11.4-canary-20250123-37d2c3b

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.11.3...v1.11.4-canary-20250123-37d2c3b)

### 🧹 Refactors

- **🧹:** Simplify error constants, tsdoc, basalt error ([ee45db1](https://github.com/Basalt-Lab/basalt-logger/commit/ee45db1))

### 📦 Build

- **📦:** Update dependencies and refine .npmignore ([9aa4422](https://github.com/Basalt-Lab/basalt-logger/commit/9aa4422))
- **📦:** Change build target to bun ([1fb8a81](https://github.com/Basalt-Lab/basalt-logger/commit/1fb8a81))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.11.3

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.11.2-canary-20241220-5181144...v1.11.3)

### 🧹 Refactors

- **🧹:** Architecture + code + tests ([1c020a4](https://github.com/Basalt-Lab/basalt-logger/commit/1c020a4))

### 🦉 Chore

- **🦉:** V1.11.2 ([4907d1a](https://github.com/Basalt-Lab/basalt-logger/commit/4907d1a))
- **🦉:** V1.11.3-canary-20250107-804476b ([95a6551](https://github.com/Basalt-Lab/basalt-logger/commit/95a6551))

### ❤️ Contributors

- Github-actions <necrelox@proton.me>
- Ruby <necrelox@proton.me>

## v1.11.3-canary-20250107-804476b

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.11.2-canary-20241220-5181144...v1.11.3-canary-20250107-804476b)

### 🧹 Refactors

- **🧹:** Architecture + code + tests ([1c020a4](https://github.com/Basalt-Lab/basalt-logger/commit/1c020a4))

### 🦉 Chore

- **🦉:** V1.11.2 ([4907d1a](https://github.com/Basalt-Lab/basalt-logger/commit/4907d1a))

### ❤️ Contributors

- Ruby <necrelox@proton.me>
- Github-actions <necrelox@proton.me>

## v1.11.2

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.11.2-canary-20241220-5181144...v1.11.2)

## v1.11.2-canary-20241220-5181144

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.11.1...v1.11.2-canary-20241220-5181144)

### 🤖 CI

- **🤖:** Add rebase step for develop branch in merge workflow ([f4f4afe](https://github.com/Basalt-Lab/basalt-logger/commit/f4f4afe))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.11.1

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.11.1-canary-20241218-5624400...v1.11.1)

## v1.11.1-canary-20241218-5624400

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.11.0...v1.11.1-canary-20241218-5624400)

### 🤖 CI

- **🤖:** Import GPG and autosign commit ([4c64aa5](https://github.com/Basalt-Lab/basalt-logger/commit/4c64aa5))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## v1.11.0

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.11.0-canary-20241218-cdb8efc...v1.11.0)

## v1.11.0-canary-20241218-cdb8efc

[compare changes](https://github.com/Basalt-Lab/basalt-logger/compare/v1.10.0...v1.11.0-canary-20241218-cdb8efc)

### 🚀 Enhancements

- **🚀:** Integrate translation ([f78fb16](https://github.com/Basalt-Lab/basalt-logger/commit/f78fb16))

### 🧹 Refactors

- **🧹:** Refacto Error System ([573145d](https://github.com/Basalt-Lab/basalt-logger/commit/573145d))

### 📦 Build

- **📦:** Update npm ignore ([dcf507a](https://github.com/Basalt-Lab/basalt-logger/commit/dcf507a))
- **📦:** Bump node version to 23.4 and update dependencies ([073c84f](https://github.com/Basalt-Lab/basalt-logger/commit/073c84f))

### 🧪 Tests

- **🧪:** Refactor and improvements tests ([f80fd44](https://github.com/Basalt-Lab/basalt-logger/commit/f80fd44))

### 🤖 CI

- **🤖:** Add workflow Pull Request Checker ([299741f](https://github.com/Basalt-Lab/basalt-logger/commit/299741f))
- **🤖:** Add workflow merge dev and main ([4da7f72](https://github.com/Basalt-Lab/basalt-logger/commit/4da7f72))

### ❤️ Contributors

- Ruby <necrelox@proton.me>

## [1.10.0](https://github.com/Basalt-Lab/basalt-logger/compare/v1.9.3...v1.10.0) (2024-11-11)


### Features

* Don't use Barrel File in code base only to export ([b97af71](https://github.com/Basalt-Lab/basalt-logger/commit/b97af714b6160ae213d74d9c8d0e5f40ceae06bf))


### Bug Fixes

* correction name erroKeys ([2d8869c](https://github.com/Basalt-Lab/basalt-logger/commit/2d8869cf664df9901d2be58b020b8c0d9cc50e98))


### Code Refactoring

* rename all files with extension ([8475fc7](https://github.com/Basalt-Lab/basalt-logger/commit/8475fc710ed76e4241b24966a0ea5aff84f42df3))
* rename file and change index ([67bc341](https://github.com/Basalt-Lab/basalt-logger/commit/67bc3415ad7aafd35a114a5903ac3352aa0acb1d))


### Build System

* add exports multiple entry point ([81528f2](https://github.com/Basalt-Lab/basalt-logger/commit/81528f22192415acdf4c5db06df8e425fe71c66e))
* add splitting ([ddbd203](https://github.com/Basalt-Lab/basalt-logger/commit/ddbd20316871c610163e8b574ccade0691dd5729))
* change export (simplify) ([1659059](https://github.com/Basalt-Lab/basalt-logger/commit/16590596b9316172d2f06feeceef9d034840c5ad))
* update package export and update nvmrc and bundler ([926bd99](https://github.com/Basalt-Lab/basalt-logger/commit/926bd99dec930e3e98f01d919b6e16c93f3aa4e2))

## [1.9.3](https://github.com/Basalt-Lab/basalt-logger/compare/v1.9.2...v1.9.3) (2024-11-07)


### Build System

* reduce package size ([c96d52d](https://github.com/Basalt-Lab/basalt-logger/commit/c96d52da48574ce215ab04c04f2fc5f9899ab495))

## [1.9.2](https://github.com/Basalt-Lab/basalt-logger/compare/v1.9.1...v1.9.2) (2024-11-07)


### Build System

* update script package json ([cb5668c](https://github.com/Basalt-Lab/basalt-logger/commit/cb5668cdf5efb06b48ffb4695d6c39821ee00f9e))
* updates packages ([3bd2408](https://github.com/Basalt-Lab/basalt-logger/commit/3bd2408fa90c6ca1f8d99c54325078861a4cbd77))


### Styles

* update eslint ([1eeb8a6](https://github.com/Basalt-Lab/basalt-logger/commit/1eeb8a604579a055cece5c8d70fd21cf6203bd79))

## [1.9.1](https://github.com/Basalt-Lab/basalt-logger/compare/v1.9.0...v1.9.1) (2024-10-07)


### Bug Fixes

* correction name (because bun bundler has no keepName like esbuild) ([c8f628a](https://github.com/Basalt-Lab/basalt-logger/commit/c8f628a00b33b45839d6b6d46ccab31573d703dd))

## [1.9.0](https://github.com/Basalt-Lab/basalt-logger/compare/v1.8.2...v1.9.0) (2024-10-03)


### Features

* add color to console logger strategy ([f6042bd](https://github.com/Basalt-Lab/basalt-logger/commit/f6042bdb5b9ae5f0b64c322277383c27c980dfca))
* change structure and nomenclature ... ([7809ddb](https://github.com/Basalt-Lab/basalt-logger/commit/7809ddb3d636d19f947e28607ef9a21de0a9f930))


### Code Refactoring

* code improvement ([b0b7f78](https://github.com/Basalt-Lab/basalt-logger/commit/b0b7f788102034357492ac6251b5de6b28fe47f6))


### Build System

* change build system ([7b99b2a](https://github.com/Basalt-Lab/basalt-logger/commit/7b99b2a1d292929db9373d0645051cbb3dab333b))
* update dependencies ([6e3e362](https://github.com/Basalt-Lab/basalt-logger/commit/6e3e3629e027287b73d1fbb062843dceee88a406))


### Tests

* add tests (not finish) ([103fe7a](https://github.com/Basalt-Lab/basalt-logger/commit/103fe7a43e67b90c2829580143a38b048fc7baaa))


### Continuous Integration

* refacto to support bun ([fc91ebc](https://github.com/Basalt-Lab/basalt-logger/commit/fc91ebc71564d9c70d7441987158f5c794a50337))

## [1.8.2](https://github.com/Basalt-Lab/basalt-logger/compare/v1.8.1...v1.8.2) (2024-08-14)


### Documentation

* add comment on errors when interpolated ([dca197e](https://github.com/Basalt-Lab/basalt-logger/commit/dca197e1242ca172fe94c193884ae7fde5a130b9))

## [1.8.1](https://github.com/Basalt-Lab/basalt-logger/compare/v1.8.0...v1.8.1) (2024-08-14)


### Code Refactoring

* merge all errorkeys + clean value... ([e44d51a](https://github.com/Basalt-Lab/basalt-logger/commit/e44d51add99ec7575be4d4541c7175e9f6a3b4d8))


### Build System

* downgrade version for the moment ([6cc42b4](https://github.com/Basalt-Lab/basalt-logger/commit/6cc42b4a89859172a90ead1e358f159b2f9cd5fa))

## [1.8.0](https://github.com/Basalt-Lab/basalt-logger/compare/v1.7.3...v1.8.0) (2024-08-13)


### Features

* add name to BasaltError ([12dc704](https://github.com/Basalt-Lab/basalt-logger/commit/12dc70414c50a7379d082db15b74653260b69414))

## [1.7.3](https://github.com/Basalt-Lab/basalt-logger/compare/v1.7.2...v1.7.3) (2024-08-13)


### Code Refactoring

* change error value for i18n ([b3a01d5](https://github.com/Basalt-Lab/basalt-logger/commit/b3a01d59d19256e32e43c01f2cfbf6fccaa4388a))


### Build System

* update dependencies and node version ([c3c42d7](https://github.com/Basalt-Lab/basalt-logger/commit/c3c42d796d95d45929d62e5f148788de7ef1ad1f))

## [1.7.2](https://github.com/Basalt-Lab/basalt-logger/compare/v1.7.1...v1.7.2) (2024-07-12)


### Build System

* update dependencies ([0abd07c](https://github.com/Basalt-Lab/basalt-logger/commit/0abd07c7fe9ff393d63ebf6667f3b67806c0e958))

## [1.7.1](https://github.com/Basalt-Lab/basalt-logger/compare/v1.7.0...v1.7.1) (2024-07-01)


### Code Refactoring

* improve to esm ([243f34b](https://github.com/Basalt-Lab/basalt-logger/commit/243f34b8868e57826709911c9e2967bab63f95f8))

## [1.7.0](https://github.com/Basalt-Lab/basalt-logger/compare/v1.6.2...v1.7.0) (2024-06-27)


### Features

* cjs to esm + imrpovement ... ([cfc1340](https://github.com/Basalt-Lab/basalt-logger/commit/cfc134014058cb6b04bdca3718f9b906dc1cc14c))

## [1.6.2](https://github.com/Basalt-Lab/basalt-logger/compare/v1.6.1...v1.6.2) (2024-03-28)


### Build System

* update packages + add comment to bundle ([f5d2dbd](https://github.com/Basalt-Lab/basalt-logger/commit/f5d2dbdfee5327a6e8379c5b51341717533a9f61))


### Continuous Integration

* change node version to workflow file ([f8a1471](https://github.com/Basalt-Lab/basalt-logger/commit/f8a1471304c1e14667ef1df8db15d7e40d7aa14d))

## [1.6.1](https://github.com/Basalt-Lab/basalt-logger/compare/v1.6.0...v1.6.1) (2024-03-22)


### Bug Fixes

* correction npmignore ([2921a75](https://github.com/Basalt-Lab/basalt-logger/commit/2921a7512479e51144c83b77277788bd5f291eaa))


### Continuous Integration

* update workflows ([ca3b997](https://github.com/Basalt-Lab/basalt-logger/commit/ca3b99766fd721a4f65bc59024f5cca60cff95db))


### Documentation

* update readme ([d48ef5f](https://github.com/Basalt-Lab/basalt-logger/commit/d48ef5fdb13789952e6b6e69de1a540ab707720e))

## [1.6.0](https://github.com/Basalt-Lab/basalt-logger/compare/v1.5.1...v1.6.0) (2024-03-22)


### Features

* Update build env ([ccb320b](https://github.com/Basalt-Lab/basalt-logger/commit/ccb320b355ae497b0c42acc6ea9c5e5ae02be349))


### Code Refactoring

* improvement of archi ([8c1d116](https://github.com/Basalt-Lab/basalt-logger/commit/8c1d116f95cd15ac36fee43ed061bf8a5b26dbc3))


### Tests

* add test + improvements ([1457713](https://github.com/Basalt-Lab/basalt-logger/commit/1457713a365de8e6769a322fc2f823509c66fe0f))

## [1.5.1](https://github.com/Basalt-Lab/basalt-logger/compare/v1.5.0...v1.5.1) (2024-01-16)


### Bug Fixes

* recreate date object ([abcd6f7](https://github.com/Basalt-Lab/basalt-logger/commit/abcd6f7d3c522c22cd740806edf94080c3b45e68))


### Tests

* correction units tests ([a1ab0be](https://github.com/Basalt-Lab/basalt-logger/commit/a1ab0be22b2cf64fdfcc6774c3ea424791a9d9bd))

## [1.5.0](https://github.com/Basalt-Lab/basalt-logger/compare/v1.4.0...v1.5.0) (2023-12-27)


### Features

* change prefixDate to date ([7bede12](https://github.com/Basalt-Lab/basalt-logger/commit/7bede12adb5ab472019e0675a7e67942df302ea0))


### Tests

* update test for changement prefixDate to date ([4bbfb95](https://github.com/Basalt-Lab/basalt-logger/commit/4bbfb95d954b63cfd4776628a0b7f8895e003ce4))

## [1.4.0](https://github.com/Basalt-Lab/basalt-logger/compare/v1.3.0...v1.4.0) (2023-12-18)


### Features

* possibility to log an object + create a new strategy is more flex ([093e5ca](https://github.com/Basalt-Lab/basalt-logger/commit/093e5ca4bbd0eb43f2bfc00724934069b5a76113))


### Build System

* update version and package ([5aca607](https://github.com/Basalt-Lab/basalt-logger/commit/5aca607be8afed4980f095fa9088cc065a3462da))


### Tests

* correction and add new tests ([01e762a](https://github.com/Basalt-Lab/basalt-logger/commit/01e762ad26c673e18b8e79cb2f5d81144c3ead85))

## [1.3.0](https://github.com/Basalt-Lab/basalt-logger/compare/v1.2.0...v1.3.0) (2023-12-12)


### Features

* add getter for strategies ([09b6cfd](https://github.com/Basalt-Lab/basalt-logger/commit/09b6cfd0c45265e094c809caca54bcfcfc11a11d))


### Tests

* add units tests ([52df8b7](https://github.com/Basalt-Lab/basalt-logger/commit/52df8b7444cac534b5346b57ecb6db3d5eea82c7))

## [1.2.0](https://github.com/Basalt-Lab/basalt-logger/compare/v1.1.0...v1.2.0) (2023-11-26)


### Features

* Log in specific strategies and not necessarily all strategies ([8ef3d9a](https://github.com/Basalt-Lab/basalt-logger/commit/8ef3d9a1ee3764f1d895d872891f9870cf03e118))


### Tests

* update tests ([f131178](https://github.com/Basalt-Lab/basalt-logger/commit/f131178dc73432acd167b0661e6adaa2d4548c98))

## [1.1.0](https://github.com/Basalt-Lab/basalt-logger/compare/v1.0.0...v1.1.0) (2023-11-23)


### Features

* add FileLoggerStrategy ([2c35468](https://github.com/Basalt-Lab/basalt-logger/commit/2c354688ff641d32e30a7c4fd250b9722735e158))


### Tests

* add FileLoggerStrategy tests ([9a61214](https://github.com/Basalt-Lab/basalt-logger/commit/9a612146aedf40364d12e2d33d0bfd436bf604b7))
* improvement BasaltLogger tests ([4af8112](https://github.com/Basalt-Lab/basalt-logger/commit/4af8112df107e848ea322d8adc3ed219b4496bdb))
* improvement ConsoleLoggerStrategy tests ([7d2a52f](https://github.com/Basalt-Lab/basalt-logger/commit/7d2a52f2f05696bb0a9dc46bbe886312d53ce46f))

## 1.0.0 (2023-11-21)


### Features

* add clearStrategies and add throw error when no strategy ([519a051](https://github.com/Basalt-Lab/basalt-logger/commit/519a051f7762556b3fe2e33b69e6ce1320c35638))
* add console strategy ([7b2dc8a](https://github.com/Basalt-Lab/basalt-logger/commit/7b2dc8a8f177114bcc1ece430d0d6d1c383e0876))
* add Enum LogLevels ([2350816](https://github.com/Basalt-Lab/basalt-logger/commit/2350816e0c43dc84fb8e691ebac5e90007da4e4b))
* Add main classes BasaltLogger ([379c704](https://github.com/Basalt-Lab/basalt-logger/commit/379c7040df9f3ccabe05e42bdb09b78c553fd54d))
* Error Classes ([6e05546](https://github.com/Basalt-Lab/basalt-logger/commit/6e05546bdbc9ee9af5f02d67fc6a44974a7d93f6))
* interface for Strategy ([2992f99](https://github.com/Basalt-Lab/basalt-logger/commit/2992f99937cfa63a86bd4af260503127b45ce787))


### Bug Fixes

* little correction BasaltLogger and console logger strategy ([2e8b0a1](https://github.com/Basalt-Lab/basalt-logger/commit/2e8b0a1d3778510c8e4fe0977b5ac7815ba422f1))
* remove color for more flexibility ([1ba3bd8](https://github.com/Basalt-Lab/basalt-logger/commit/1ba3bd899ad0410b0ddf4807e730560a691c09ad))
* remove type string of chunk ([224b893](https://github.com/Basalt-Lab/basalt-logger/commit/224b893f80811a5e9a87701f726dca299ddb26db))


### Build System

* init env to compile and add dependencies ([8d827de](https://github.com/Basalt-Lab/basalt-logger/commit/8d827de6c194230930d18e154b17bd04879b587f))


### Tests

* add new test ([0886fc0](https://github.com/Basalt-Lab/basalt-logger/commit/0886fc069706a7f720b3632d28c55c4d3bb5b556))
* add units tests ([1797fec](https://github.com/Basalt-Lab/basalt-logger/commit/1797fec92fca0cf4f1062fa7191313cc064f3153))
* fix should throw an error when no strategies are added of debug ([655f41b](https://github.com/Basalt-Lab/basalt-logger/commit/655f41b54b8617323e1c7767c581db35228f6022))


### Continuous Integration

* add github action to coverage and release ([0a9e40c](https://github.com/Basalt-Lab/basalt-logger/commit/0a9e40c286effd7e668ad7905c535c8834e2aee7))


### Documentation

* add JsDoc ([0cf7a42](https://github.com/Basalt-Lab/basalt-logger/commit/0cf7a42dae780215679063bf5835a5f04ef33cb4))
* write readme ([ce05c40](https://github.com/Basalt-Lab/basalt-logger/commit/ce05c40ea5a502c415feb04cfdfa8e9650f5a3a6))


### Styles

* add eslint ([0d3f296](https://github.com/Basalt-Lab/basalt-logger/commit/0d3f296ec6956fb4d0b9063d6f87f519b48b3626))
