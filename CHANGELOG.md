# [8.1.0](https://github.com/projectcaluma/ember-emeis/compare/v8.0.1...v8.1.0) (2023-10-13)


### Features

* **user:** filter export ([#722](https://github.com/projectcaluma/ember-emeis/issues/722)) ([2b53e45](https://github.com/projectcaluma/ember-emeis/commit/2b53e453f7d812d2457710db69fa51ffbe7e9139))

## [8.0.1](https://github.com/projectcaluma/ember-emeis/compare/v8.0.0...v8.0.1) (2023-08-17)


### Bug Fixes

* mount point of the package ([#707](https://github.com/projectcaluma/ember-emeis/issues/707)) ([2caca26](https://github.com/projectcaluma/ember-emeis/commit/2caca26f04052709e322453a91706825911f43d4))

# [8.0.0](https://github.com/projectcaluma/ember-emeis/compare/v7.0.0...v8.0.0) (2023-07-05)


### chore

* udpate to ember 4.12 and make embroider optimized ([37cdaed](https://github.com/projectcaluma/ember-emeis/commit/37cdaeda348f17d3a6e7a4e34fb9a1ef88a19700))
* update to ember v4 ([04865f1](https://github.com/projectcaluma/ember-emeis/commit/04865f1d0e947a6b90a6a34082f9197ab8f7557a))


### Code Refactoring

* rename `router` service dependency to `hostRouter` ([855a842](https://github.com/projectcaluma/ember-emeis/commit/855a84276f1111e530aba5dcb554db602b09f9df))


### BREAKING CHANGES

* - Ember.js v3.28 or above
- Ember CLI v3.28 or above
- Node.js v14 or above
* - Rename `router` service dependency to `hostRouter` due to deprecation

Deprecation id: ember-engines.deprecation-router-service-from-host
* - Ember.js v3.28 or above
- Ember CLI v3.28 or above
- Node.js v16 or above

# [7.0.0](https://github.com/projectcaluma/ember-emeis/compare/v6.3.2...v7.0.0) (2023-05-16)


### Bug Fixes

* confirm task tests ([#669](https://github.com/projectcaluma/ember-emeis/issues/669)) ([01db8a2](https://github.com/projectcaluma/ember-emeis/commit/01db8a235aa270f5f58b67594126966f52e929cd))
* **scopes:** show updated parent after selection ([#665](https://github.com/projectcaluma/ember-emeis/issues/665)) ([2eb3440](https://github.com/projectcaluma/ember-emeis/commit/2eb3440e335a95739cb25fd5438b0c2863611699))


### chore

* adapt ember try scenarios ([#670](https://github.com/projectcaluma/ember-emeis/issues/670)) ([f9e530b](https://github.com/projectcaluma/ember-emeis/commit/f9e530b93e4f22765bdb418326920a7c18fa0a1c))


### BREAKING CHANGES

* drop support for ember v3.24

* chore(deps): update ember-ty to v3.0.0-beta.1

Prevents local build error.

* test(confirm-task): revert waitUntil calls

* fix(confirm-task): catch nested promise rejection

* test(confirm-task): skip flaky test
* drop support for ember v3.24

* chore(deps): update ember-ty to v3.0.0-beta.1

Prevents local build error.

## [6.3.2](https://github.com/projectcaluma/ember-emeis/compare/v6.3.1...v6.3.2) (2023-05-09)


### Bug Fixes

* **scopes:** prevent circular relation selection ([#656](https://github.com/projectcaluma/ember-emeis/issues/656)) ([ecfcc97](https://github.com/projectcaluma/ember-emeis/commit/ecfcc97ac777a6cb44c724c7c02b128aec11b8b1))

## [6.3.1](https://github.com/projectcaluma/ember-emeis/compare/v6.3.0...v6.3.1) (2023-04-17)


### Bug Fixes

* typo in user filter visibility setting ([#649](https://github.com/projectcaluma/ember-emeis/issues/649)) ([ef9c07b](https://github.com/projectcaluma/ember-emeis/commit/ef9c07b1f765d94f5d466c0fa734f98c22c370de))

# [6.3.0](https://github.com/projectcaluma/ember-emeis/compare/v6.2.4...v6.3.0) (2023-04-17)


### Features

* **emeisOptions:** make user filter optionally visible ([#648](https://github.com/projectcaluma/ember-emeis/issues/648)) ([107b7de](https://github.com/projectcaluma/ember-emeis/commit/107b7de222e548d1e10748e14eb817f79aa95294))

## [6.2.4](https://github.com/projectcaluma/ember-emeis/compare/v6.2.3...v6.2.4) (2022-11-18)


### Bug Fixes

* **layout:** remove overflow from main container ([#585](https://github.com/projectcaluma/ember-emeis/issues/585)) ([1b63fe3](https://github.com/projectcaluma/ember-emeis/commit/1b63fe30bc6f0000466b9a21ed86ff3140de8b4e))

## [6.2.3](https://github.com/projectcaluma/ember-emeis/compare/v6.2.2...v6.2.3) (2022-11-18)


### Bug Fixes

* always sort scopes client-side ([#583](https://github.com/projectcaluma/ember-emeis/issues/583)) ([d7896ee](https://github.com/projectcaluma/ember-emeis/commit/d7896eec24a624c36f3ec25675172402cd4abbda))

## [6.2.2](https://github.com/projectcaluma/ember-emeis/compare/v6.2.1...v6.2.2) (2022-09-26)


### Bug Fixes

* **scope:** sort by full (hierarchical) name ([#565](https://github.com/projectcaluma/ember-emeis/issues/565)) ([9cf849b](https://github.com/projectcaluma/ember-emeis/commit/9cf849b9677f14103eb905752810d64ae4887f09))
* **user:** probe ability to delete user already in table view ([#562](https://github.com/projectcaluma/ember-emeis/issues/562)) ([6982c32](https://github.com/projectcaluma/ember-emeis/commit/6982c3255a6d54952afc32c5d1a593d9fef43a2a))

## [6.2.1](https://github.com/projectcaluma/ember-emeis/compare/v6.2.0...v6.2.1) (2022-08-08)


### Bug Fixes

* **data-table:** always include page meta info ([#544](https://github.com/projectcaluma/ember-emeis/issues/544)) ([43c6a28](https://github.com/projectcaluma/ember-emeis/commit/43c6a28313c80b4df936ea88d33982731447cba0))
* **editForm:** relax phone regex ([#537](https://github.com/projectcaluma/ember-emeis/issues/537)) ([bd2d63c](https://github.com/projectcaluma/ember-emeis/commit/bd2d63c3f24778e745f38a865b2264f60a3ae0e2))
* phone number placeholder ([#538](https://github.com/projectcaluma/ember-emeis/issues/538)) ([9b75903](https://github.com/projectcaluma/ember-emeis/commit/9b759032d98a2aeaaa922a6ad7e376ed8f5d498d))

# [6.2.0](https://github.com/projectcaluma/ember-emeis/compare/v6.1.0...v6.2.0) (2022-07-26)


### Features

* **emeis-options:** custom user status component ([#523](https://github.com/projectcaluma/ember-emeis/issues/523)) ([63eb4c7](https://github.com/projectcaluma/ember-emeis/commit/63eb4c77fe7df16bb8d67021a1553d6d58e204ee))

# [6.1.0](https://github.com/projectcaluma/ember-emeis/compare/v6.0.0...v6.1.0) (2022-07-05)


### Bug Fixes

* **data-table:** fix search bar width ([#521](https://github.com/projectcaluma/ember-emeis/issues/521)) ([6009e0d](https://github.com/projectcaluma/ember-emeis/commit/6009e0d139dbccf243db80f848b4cb781ed0a4be))
* **emeisOptions:** save access on options properties ([#519](https://github.com/projectcaluma/ember-emeis/issues/519)) ([a990be3](https://github.com/projectcaluma/ember-emeis/commit/a990be35429c3976bf96447b523c5798d42e5395))


### Features

* **data-table:** show entry count on list views ([#520](https://github.com/projectcaluma/ember-emeis/issues/520)) ([4a36b53](https://github.com/projectcaluma/ember-emeis/commit/4a36b530ca4f41ee41e8a992b614201b4c1d543a))

# [6.0.0](https://github.com/projectcaluma/ember-emeis/compare/v5.1.0...v6.0.0) (2022-07-04)


### Bug Fixes

* adapt table hover style ([#465](https://github.com/projectcaluma/ember-emeis/issues/465)) ([c3338b5](https://github.com/projectcaluma/ember-emeis/commit/c3338b535615fd70436aa0588d284de033ee700b))
* allow to clear parent scope selection ([#464](https://github.com/projectcaluma/ember-emeis/issues/464)) ([b24dd06](https://github.com/projectcaluma/ember-emeis/commit/b24dd06d48d36a446c53c7b3f57300be7a2818be))
* handle case where engine is mounted under different name ([#476](https://github.com/projectcaluma/ember-emeis/issues/476)) ([533b3de](https://github.com/projectcaluma/ember-emeis/commit/533b3de497821d3bd0d26984e5a7d7825703fb07))
* tree search expansion ([#501](https://github.com/projectcaluma/ember-emeis/issues/501)) ([5eb804c](https://github.com/projectcaluma/ember-emeis/commit/5eb804cde573680b9ca49362f5582530a44b72a0))


### Features

* **emeisOptions:** action button label overrides ([#515](https://github.com/projectcaluma/ember-emeis/issues/515)) ([3d1bfce](https://github.com/projectcaluma/ember-emeis/commit/3d1bfce6f10125bf7e368f95a6e9a4ccdf224958))
* **emeisOptions:** add custom column option ([#516](https://github.com/projectcaluma/ember-emeis/issues/516)) ([1d88b42](https://github.com/projectcaluma/ember-emeis/commit/1d88b4216784b4750101efb952b89d99d8964b06))
* **emeisOptions:** make "delete" and "deactivate" buttons visibility configurable ([#462](https://github.com/projectcaluma/ember-emeis/issues/462)) ([afc7ca4](https://github.com/projectcaluma/ember-emeis/commit/afc7ca441c8a4952ad5c7bf81fe65ceae3934b4b))
* mark optional fields ([#507](https://github.com/projectcaluma/ember-emeis/issues/507)) ([51debd0](https://github.com/projectcaluma/ember-emeis/commit/51debd0f006e44312d744fab725d1d1cbe4ba808))
* **tree:** expand root only if its single ([#460](https://github.com/projectcaluma/ember-emeis/issues/460)) ([1ca9783](https://github.com/projectcaluma/ember-emeis/commit/1ca9783453d1109687ffd6b8cab9661ea3eaa6f5))
* **users:** add 'isActive' filter radio buttons ([#510](https://github.com/projectcaluma/ember-emeis/issues/510)) ([67e6401](https://github.com/projectcaluma/ember-emeis/commit/67e6401b2972c73daeb0ea00a4dbb61dc53b64e3))


### BREAKING CHANGES

* **emeisOptions:** the emeis options object got restructured

* feat(emeisOptions): enable action button label overrides

* feat: accept functions as label overrides

to allow different labels for active/inactive models

* fix: remove incorrect `fn` lookup, minor refactoring

Co-authored-by: Christian Zosel <christian@zosel.ch>

# [5.1.0](https://github.com/projectcaluma/ember-emeis/compare/v5.0.0...v5.1.0) (2022-03-09)


### Features

* **emeisOptions:** passing options as a function ([#438](https://github.com/projectcaluma/ember-emeis/issues/438)) ([953421c](https://github.com/projectcaluma/ember-emeis/commit/953421caed528fa5db2dfba8bd9d0b1734ca85d6))

# [5.0.0](https://github.com/projectcaluma/ember-emeis/compare/v4.2.1...v5.0.0) (2022-03-04)


* feat(emeisOptions)!: component injection via emeisOptions (#431) ([a293ea8](https://github.com/projectcaluma/ember-emeis/commit/a293ea88662db8679a6f32c9b34ae026f9049a74)), closes [#431](https://github.com/projectcaluma/ember-emeis/issues/431)


### BREAKING CHANGES

* replaces customButton with customComponent property in emeisOptions service

## [4.2.1](https://github.com/projectcaluma/ember-emeis/compare/v4.2.0...v4.2.1) (2022-02-23)


### Bug Fixes

* **translations:** consistent warning msg for user deletion ([#422](https://github.com/projectcaluma/ember-emeis/issues/422)) ([7f27ae3](https://github.com/projectcaluma/ember-emeis/commit/7f27ae37929b6a13ccb1a96f07c6582e8e59633d))

# [4.2.0](https://github.com/projectcaluma/ember-emeis/compare/v4.1.1...v4.2.0) (2022-02-17)


### Features

* **emeis-options:** add setting to force the locale of models ([2c30e54](https://github.com/projectcaluma/ember-emeis/commit/2c30e540f47737157f5eb068c7f76085acf14d1b))

## [4.1.1](https://github.com/projectcaluma/ember-emeis/compare/v4.1.0...v4.1.1) (2022-02-16)


### Bug Fixes

* show full scope name in acl wizzard ([0e123f9](https://github.com/projectcaluma/ember-emeis/commit/0e123f90162bf36613a1d7b05281d8c0c383371b))

# [4.1.0](https://github.com/projectcaluma/ember-emeis/compare/v4.0.2...v4.1.0) (2022-02-11)


### Features

* show user export button ([#412](https://github.com/projectcaluma/ember-emeis/issues/412)) ([0ad6560](https://github.com/projectcaluma/ember-emeis/commit/0ad656062b1cda5c87247aa4c4432c436c0f486a))

## [4.0.2](https://github.com/projectcaluma/ember-emeis/compare/v4.0.1...v4.0.2) (2022-02-09)


### Bug Fixes

* minor translation corrections ([#410](https://github.com/projectcaluma/ember-emeis/issues/410)) ([1ddec03](https://github.com/projectcaluma/ember-emeis/commit/1ddec036d9da36a3f0cbc962753605c42aeae2ef))
* show full scope names in user acl table ([#411](https://github.com/projectcaluma/ember-emeis/issues/411)) ([3efcb94](https://github.com/projectcaluma/ember-emeis/commit/3efcb94db330276efe50ad24de1eefc924664d9e))

## [4.0.1](https://github.com/projectcaluma/ember-emeis/compare/v4.0.0...v4.0.1) (2022-02-09)


### Bug Fixes

* **deps:** upgrade to ember-uikit v5 ([#408](https://github.com/projectcaluma/ember-emeis/issues/408)) ([4322550](https://github.com/projectcaluma/ember-emeis/commit/4322550ffe0cb89219076851df27abcde2dc9873))

# [4.0.0](https://github.com/projectcaluma/ember-emeis/compare/v3.2.1...v4.0.0) (2022-02-04)


### chore

* trigger major release ([#405](https://github.com/projectcaluma/ember-emeis/issues/405)) ([253ff91](https://github.com/projectcaluma/ember-emeis/commit/253ff9196e2e211badf1fdfe8f32c37f925758af))


### BREAKING CHANGES

* fix major release

## [3.2.1](https://github.com/projectcaluma/ember-emeis/compare/v3.2.0...v3.2.1) (2022-02-04)


### Bug Fixes

* prevent non fresh scope in scope tree view ([#403](https://github.com/projectcaluma/ember-emeis/issues/403)) ([ac2278e](https://github.com/projectcaluma/ember-emeis/commit/ac2278e9c96c8dbeeff0d3049aeb7a8ecbc2c6b0))

# [3.2.0](https://github.com/projectcaluma/ember-emeis/compare/v3.1.1...v3.2.0) (2022-02-04)


### Bug Fixes

* new users are active (isActive) by default ([#396](https://github.com/projectcaluma/ember-emeis/issues/396)) ([2010ea0](https://github.com/projectcaluma/ember-emeis/commit/2010ea0cc36ea253f0ec70a6f17601ec9caee66e))
* special icon and info for empty acl list ([#398](https://github.com/projectcaluma/ember-emeis/issues/398)) ([3fea057](https://github.com/projectcaluma/ember-emeis/commit/3fea057cde88f721ee397fe7257d5bbba70cc106))
* use fullName of scopes in userlists ([#397](https://github.com/projectcaluma/ember-emeis/issues/397)) ([3dd1955](https://github.com/projectcaluma/ember-emeis/commit/3dd1955854b0b61257295ecfbf3226c480e6e7b8))


### Features

* adds edit and delete functionality to userlist ([#399](https://github.com/projectcaluma/ember-emeis/issues/399)) ([69d3c17](https://github.com/projectcaluma/ember-emeis/commit/69d3c17fe52eb2119b733f549b93bd5b72e3897b))

## [3.1.1](https://github.com/projectcaluma/ember-emeis/compare/v3.1.0...v3.1.1) (2022-01-27)


### Bug Fixes

* don't fetch ACLs when user doesn't exist yet ([#385](https://github.com/projectcaluma/ember-emeis/issues/385)) ([b407b5e](https://github.com/projectcaluma/ember-emeis/commit/b407b5e1f5248ad21c14472492ed4de18c22cf5f))
* error handling decorator for ember-concurrency tasks ([#386](https://github.com/projectcaluma/ember-emeis/issues/386)) ([63b8704](https://github.com/projectcaluma/ember-emeis/commit/63b8704039985c2f45edf7cc2b356448d4198bcf))
* tree control search and expansion ([#387](https://github.com/projectcaluma/ember-emeis/issues/387)) ([98adf1c](https://github.com/projectcaluma/ember-emeis/commit/98adf1c094bc23b4de866979517651dc342eed66))
* use full-name in parent scope selection ([#389](https://github.com/projectcaluma/ember-emeis/issues/389)) ([f54d27a](https://github.com/projectcaluma/ember-emeis/commit/f54d27ac5af790ac1db144ee620c44f2c55c7f6e))
* use intl translation ([#394](https://github.com/projectcaluma/ember-emeis/issues/394)) ([2bb4942](https://github.com/projectcaluma/ember-emeis/commit/2bb49428255a760241df511e601eebe61a434535))

## [2.1.1](https://github.com/projectcaluma/ember-emeis/compare/v2.1.0...v2.1.1) (2021-12-13)


### Bug Fixes

* tree-node selection in acl tab, tree scroll container ([#335](https://github.com/projectcaluma/ember-emeis/issues/335)) ([a50623e](https://github.com/projectcaluma/ember-emeis/commit/a50623ed668339a664736d0f48bfdaf09a6e5f91))

# [2.1.0](https://github.com/projectcaluma/ember-emeis/compare/v2.0.1...v2.1.0) (2021-12-10)


### Bug Fixes

* german translation ([#310](https://github.com/projectcaluma/ember-emeis/issues/310)) ([7eac49f](https://github.com/projectcaluma/ember-emeis/commit/7eac49fbc08662d21e1e48c3d1c62282dd72aee5))


### Features

* adds reset-search button to search bar ([#333](https://github.com/projectcaluma/ember-emeis/issues/333)) ([520269e](https://github.com/projectcaluma/ember-emeis/commit/520269e894fdfdfdd20617861818a0d0438a7811))
* tree view for scopes ([#328](https://github.com/projectcaluma/ember-emeis/issues/328)) ([36e5976](https://github.com/projectcaluma/ember-emeis/commit/36e59769b60b832370cd12c1381f1e30429c9de6))

## [2.0.1](https://github.com/projectcaluma/ember-emeis/compare/v2.0.0...v2.0.1) (2021-11-18)


### Bug Fixes

* **data-table:** do not include page query param when searching ([#302](https://github.com/projectcaluma/ember-emeis/issues/302)) ([07b027d](https://github.com/projectcaluma/ember-emeis/commit/07b027dd6a3ea7252ba01e905fd1af0df3ec46b6))

# [2.0.0](https://github.com/projectcaluma/ember-emeis/compare/v1.1.0...v2.0.0) (2021-11-09)


### Bug Fixes

* **translations:** use better naming for "ACL" ([#299](https://github.com/projectcaluma/ember-emeis/issues/299)) ([73bb397](https://github.com/projectcaluma/ember-emeis/commit/73bb397dc2726110ab0b3c7376766035923ba2d4))
* add missing tests ([#293](https://github.com/projectcaluma/ember-emeis/issues/293)) ([bbb972b](https://github.com/projectcaluma/ember-emeis/commit/bbb972b53ed75138eac4f54dae95da394cac11fa))
* allow to clear select in meta fields ([#294](https://github.com/projectcaluma/ember-emeis/issues/294)) ([6428909](https://github.com/projectcaluma/ember-emeis/commit/6428909b181e4f12e05eeef74af63d33201fcaa3))
* data table paging ([#296](https://github.com/projectcaluma/ember-emeis/issues/296)) ([f8e8c63](https://github.com/projectcaluma/ember-emeis/commit/f8e8c63d36da99eb4f0ce1c18d92e49153e4a099))
* redirect to /users on index ([#270](https://github.com/projectcaluma/ember-emeis/issues/270)) ([146d6f3](https://github.com/projectcaluma/ember-emeis/commit/146d6f39b2f5b9d3fcad5512f46042982fc5660c))
* sort user list by last name ([#274](https://github.com/projectcaluma/ember-emeis/issues/274)) ([c72cb81](https://github.com/projectcaluma/ember-emeis/commit/c72cb811fa2e6364c23e670c8b34a652e86db79e))


### chore

* drop support for node 10 ([#295](https://github.com/projectcaluma/ember-emeis/issues/295)) ([96e5335](https://github.com/projectcaluma/ember-emeis/commit/96e533534dbfbe7d0338a12e0745a816107a152a))


### Features

* extract meta fields rendering into a component ([#277](https://github.com/projectcaluma/ember-emeis/issues/277)) ([2527ed5](https://github.com/projectcaluma/ember-emeis/commit/2527ed5787e9c73602003f7dcb8452eeb8d71e9a))
* **scopes:** display corresponding ACLs ([#275](https://github.com/projectcaluma/ember-emeis/issues/275)) ([0daa8b0](https://github.com/projectcaluma/ember-emeis/commit/0daa8b0b231f433f888fad589203fadd50da4ab9))
* **scopes:** introduce meta fields ([#272](https://github.com/projectcaluma/ember-emeis/issues/272)) ([af82ec2](https://github.com/projectcaluma/ember-emeis/commit/af82ec287f6433128d271645addf7a31817ea1b4))
* make addon configurable via config service ([#269](https://github.com/projectcaluma/ember-emeis/issues/269)) ([3a56283](https://github.com/projectcaluma/ember-emeis/commit/3a562838886a3a609c62a103b88f6b4a64ea55f0))


### BREAKING CHANGES

* drop support for node 10 as it has reached EOL.

Co-authored-by: Akanksh Saxena <akanksh.saxena@adfinis-sygroup.ch>

# [1.1.0](https://github.com/projectcaluma/ember-emeis/compare/v1.0.0...v1.1.0) (2021-08-11)


### Bug Fixes

* add ember-engines to blueprint, docs ([#258](https://github.com/projectcaluma/ember-emeis/issues/258)) ([35c40a7](https://github.com/projectcaluma/ember-emeis/commit/35c40a742e3d00ea0b5860f826a613777b09402f))


### Features

* indent scopes list according to level ([#260](https://github.com/projectcaluma/ember-emeis/issues/260)) ([13c822f](https://github.com/projectcaluma/ember-emeis/commit/13c822fcd172c9a871eefd10e4a1a638ae0e72fb))

# 1.0.0 (2021-08-11)


### Bug Fixes

* **application.hbs:** set container to overflow: auto ([853fb9e](https://github.com/projectcaluma/ember-emeis/commit/853fb9e8b45e09b5236c36366dd8d046cd939878))
* **concurrency:** use dropTask to prevent state issues ([7a0bb4a](https://github.com/projectcaluma/ember-emeis/commit/7a0bb4a09558e2d484b7362b5413e8d1c890313c))
* **edit-form:** prevent type error by checking if listViewRouteName is passed ([09e03c5](https://github.com/projectcaluma/ember-emeis/commit/09e03c5eb62998029639e8d02671abfade7dde6f))
* **edit-form:** replace hardcoded route name handling with dynamic since an engine can be mouted with a different name ([e770214](https://github.com/projectcaluma/ember-emeis/commit/e77021404a2a9e4d84ad2b900169d4cbccecea34))
* **import:** fix import of pagination controller ([27c6d1b](https://github.com/projectcaluma/ember-emeis/commit/27c6d1bf540fe1b4cea926ccc905314d2165e434))
* **pagination:** only check if strings are empty so they are not serialized as an empty qp ([d79e0a4](https://github.com/projectcaluma/ember-emeis/commit/d79e0a42da7b0db3f8a806f2a6f94540a30b9cb0))
* add ember-engines to blueprint, docs ([#258](https://github.com/projectcaluma/ember-emeis/issues/258)) ([35c40a7](https://github.com/projectcaluma/ember-emeis/commit/35c40a742e3d00ea0b5860f826a613777b09402f))
* **relationship-select:** only debounce if search is set so we dont debounce the initial request ([a8c2f03](https://github.com/projectcaluma/ember-emeis/commit/a8c2f0336bfb52a15ef311c1a1eb8a52c82dd54b))
* **relationship-select:** use let instead of with ([690c0ba](https://github.com/projectcaluma/ember-emeis/commit/690c0baab23b288a27656af9f56574cf4b7bd353))
* **route model hooks:** just return a promise to the model hook, no need for async ([fe9ccbf](https://github.com/projectcaluma/ember-emeis/commit/fe9ccbf57391f271603bcc1b61797af7f4dcb180))
* **user-edit:** make route name argument passed to edit form for listview relative ([80d16d5](https://github.com/projectcaluma/ember-emeis/commit/80d16d5544905a24d0c1e04c8cc604299b80f63d))
* **users/edit:** remove UkTab component usage ([abfd9d5](https://github.com/projectcaluma/ember-emeis/commit/abfd9d50a5c4893be59d7ad81ecf330d6505991c))


### Features

* **acl-wizzard:** add wizzard to guide user through acl creation ([50d5a22](https://github.com/projectcaluma/ember-emeis/commit/50d5a228b97eb265077186a0fbb8c5dbe43a6209))
* **create route:** add class for creating new models by reusing the edit view ([ac278ec](https://github.com/projectcaluma/ember-emeis/commit/ac278ec85c94beb6d7cab556b9fc86a09b93a16a))
* **decorators:** add error handling for common model usage ([38155db](https://github.com/projectcaluma/ember-emeis/commit/38155dbf22614b6fad9467c83521764712a49146))
* **edit-form:** add a minimalistic form for editing model fields ([31e4a99](https://github.com/projectcaluma/ember-emeis/commit/31e4a992a46ad13d3186bef22c8c33868e6a521f))
* **engine:** add blueprint and dependencies ([9d31cfb](https://github.com/projectcaluma/ember-emeis/commit/9d31cfb5aa5fe5ab35a943d3f57118f1574caa80))
* **engine:** initialize ember-engines configuration ([b22fcff](https://github.com/projectcaluma/ember-emeis/commit/b22fcffac9d1598875a88570fdde64ebb1f8be95))
* **models:** add models and factories ([fe09023](https://github.com/projectcaluma/ember-emeis/commit/fe090230df41223469cbcfd67a8eb2f98be457ce))
* **multilang:** add decorator for localized fields ([ec20d27](https://github.com/projectcaluma/ember-emeis/commit/ec20d273dcffec2bc73721f37ff0822c9aed99af))
* **multilang:** add serializers for localized models ([88c89c5](https://github.com/projectcaluma/ember-emeis/commit/88c89c58d07edafd9c15337bca0e08de84d7c68d))
* **nav:** add nav ([a40bdcc](https://github.com/projectcaluma/ember-emeis/commit/a40bdcc62b4af525e2f22779e1e1d535baf93417))
* **nav:** add nav components ([066f867](https://github.com/projectcaluma/ember-emeis/commit/066f8676a8395ceffd2657dc9906d9df6036a4f6))
* **permission index view:** add permission list view ([749b00c](https://github.com/projectcaluma/ember-emeis/commit/749b00ca862135af533b456068763144f64b92b7))
* **permissions:**  add permission edit view ([666c720](https://github.com/projectcaluma/ember-emeis/commit/666c72062c0b56f5e6b9853674bd9c3f2f22eb30))
* **permissions:** add a create view ([c5846ae](https://github.com/projectcaluma/ember-emeis/commit/c5846aecdfb84bffe670a883f618b7d532d4b7e6))
* **relationship-select:** add component to select a model for a relationship via power-select ([373f213](https://github.com/projectcaluma/ember-emeis/commit/373f2138b64e4152f5a311253ce7d03596c8457c))
* **role index view:** add roles list view ([5dccab4](https://github.com/projectcaluma/ember-emeis/commit/5dccab401512bfd2372359be8cbe799144d9ddc4))
* add example route and model for group ([10b7843](https://github.com/projectcaluma/ember-emeis/commit/10b784343332accf36ab6d46226ad266b5d8c2fd))
* **scopes:** add create view ([55b93ef](https://github.com/projectcaluma/ember-emeis/commit/55b93ef3cd737c684ea6412bf7bc23c78b98b446))
* indent scopes list according to level ([#260](https://github.com/projectcaluma/ember-emeis/issues/260)) ([13c822f](https://github.com/projectcaluma/ember-emeis/commit/13c822fcd172c9a871eefd10e4a1a638ae0e72fb))
* **roles:** add create view ([b9013d9](https://github.com/projectcaluma/ember-emeis/commit/b9013d97b6455fcfaff3cb69349bbd8765679dad))
* **roles:** add edit view ([7bb7cc4](https://github.com/projectcaluma/ember-emeis/commit/7bb7cc4ea0430e6394d575b3e4a06330ead276e1))
* **routes:** add basic route setup ([26b57ce](https://github.com/projectcaluma/ember-emeis/commit/26b57ce8511df5d814e8d1a17af7da9c0c8e89f3))
* **scope index view:** add list view for scopes ([490ead0](https://github.com/projectcaluma/ember-emeis/commit/490ead07e96c71fd6797b02e6a3a6124177d6bd0))
* **scopes:** add edit view for scopes ([a5847bf](https://github.com/projectcaluma/ember-emeis/commit/a5847bf32003904baa9174900175c12813b3312e))
* **section title:** add a component for section headings ([e0437bf](https://github.com/projectcaluma/ember-emeis/commit/e0437bf2288da6925111c420f0afab24e499c77d))
* **store blueprint:** add a blueprint for customizing the store passed to emeis engine ([2b434d6](https://github.com/projectcaluma/ember-emeis/commit/2b434d622c2e595d6da8d70aeef160bbef97138f))
* **user:** add acl edit and create views ([cc990ab](https://github.com/projectcaluma/ember-emeis/commit/cc990ab35a7efdea966240587fba2855c5819e12))
* **user:** add create view ([7a3caf4](https://github.com/projectcaluma/ember-emeis/commit/7a3caf40d215679a0dabb0fbdb5ed205b13b7e6f))
* **user:** add edit view ([2b19e3f](https://github.com/projectcaluma/ember-emeis/commit/2b19e3f0f69bbda630cd06cefcde69a03269cd4e))
* **user index view:** add user list view ([ac51323](https://github.com/projectcaluma/ember-emeis/commit/ac513234f095de508c2d9cd0869c22d1f4e5ae4a))

# 1.0.0 (2021-08-11)


### Bug Fixes

* **application.hbs:** set container to overflow: auto ([853fb9e](https://github.com/projectcaluma/ember-emeis/commit/853fb9e8b45e09b5236c36366dd8d046cd939878))
* **concurrency:** use dropTask to prevent state issues ([7a0bb4a](https://github.com/projectcaluma/ember-emeis/commit/7a0bb4a09558e2d484b7362b5413e8d1c890313c))
* **edit-form:** prevent type error by checking if listViewRouteName is passed ([09e03c5](https://github.com/projectcaluma/ember-emeis/commit/09e03c5eb62998029639e8d02671abfade7dde6f))
* **edit-form:** replace hardcoded route name handling with dynamic since an engine can be mouted with a different name ([e770214](https://github.com/projectcaluma/ember-emeis/commit/e77021404a2a9e4d84ad2b900169d4cbccecea34))
* **import:** fix import of pagination controller ([27c6d1b](https://github.com/projectcaluma/ember-emeis/commit/27c6d1bf540fe1b4cea926ccc905314d2165e434))
* **pagination:** only check if strings are empty so they are not serialized as an empty qp ([d79e0a4](https://github.com/projectcaluma/ember-emeis/commit/d79e0a42da7b0db3f8a806f2a6f94540a30b9cb0))
* add ember-engines to blueprint, docs ([#258](https://github.com/projectcaluma/ember-emeis/issues/258)) ([35c40a7](https://github.com/projectcaluma/ember-emeis/commit/35c40a742e3d00ea0b5860f826a613777b09402f))
* **relationship-select:** only debounce if search is set so we dont debounce the initial request ([a8c2f03](https://github.com/projectcaluma/ember-emeis/commit/a8c2f0336bfb52a15ef311c1a1eb8a52c82dd54b))
* **relationship-select:** use let instead of with ([690c0ba](https://github.com/projectcaluma/ember-emeis/commit/690c0baab23b288a27656af9f56574cf4b7bd353))
* **route model hooks:** just return a promise to the model hook, no need for async ([fe9ccbf](https://github.com/projectcaluma/ember-emeis/commit/fe9ccbf57391f271603bcc1b61797af7f4dcb180))
* **user-edit:** make route name argument passed to edit form for listview relative ([80d16d5](https://github.com/projectcaluma/ember-emeis/commit/80d16d5544905a24d0c1e04c8cc604299b80f63d))
* **users/edit:** remove UkTab component usage ([abfd9d5](https://github.com/projectcaluma/ember-emeis/commit/abfd9d50a5c4893be59d7ad81ecf330d6505991c))


### Features

* **acl-wizzard:** add wizzard to guide user through acl creation ([50d5a22](https://github.com/projectcaluma/ember-emeis/commit/50d5a228b97eb265077186a0fbb8c5dbe43a6209))
* **create route:** add class for creating new models by reusing the edit view ([ac278ec](https://github.com/projectcaluma/ember-emeis/commit/ac278ec85c94beb6d7cab556b9fc86a09b93a16a))
* **decorators:** add error handling for common model usage ([38155db](https://github.com/projectcaluma/ember-emeis/commit/38155dbf22614b6fad9467c83521764712a49146))
* **edit-form:** add a minimalistic form for editing model fields ([31e4a99](https://github.com/projectcaluma/ember-emeis/commit/31e4a992a46ad13d3186bef22c8c33868e6a521f))
* **engine:** add blueprint and dependencies ([9d31cfb](https://github.com/projectcaluma/ember-emeis/commit/9d31cfb5aa5fe5ab35a943d3f57118f1574caa80))
* **engine:** initialize ember-engines configuration ([b22fcff](https://github.com/projectcaluma/ember-emeis/commit/b22fcffac9d1598875a88570fdde64ebb1f8be95))
* **models:** add models and factories ([fe09023](https://github.com/projectcaluma/ember-emeis/commit/fe090230df41223469cbcfd67a8eb2f98be457ce))
* **multilang:** add decorator for localized fields ([ec20d27](https://github.com/projectcaluma/ember-emeis/commit/ec20d273dcffec2bc73721f37ff0822c9aed99af))
* **multilang:** add serializers for localized models ([88c89c5](https://github.com/projectcaluma/ember-emeis/commit/88c89c58d07edafd9c15337bca0e08de84d7c68d))
* **nav:** add nav ([a40bdcc](https://github.com/projectcaluma/ember-emeis/commit/a40bdcc62b4af525e2f22779e1e1d535baf93417))
* **nav:** add nav components ([066f867](https://github.com/projectcaluma/ember-emeis/commit/066f8676a8395ceffd2657dc9906d9df6036a4f6))
* **permission index view:** add permission list view ([749b00c](https://github.com/projectcaluma/ember-emeis/commit/749b00ca862135af533b456068763144f64b92b7))
* **permissions:**  add permission edit view ([666c720](https://github.com/projectcaluma/ember-emeis/commit/666c72062c0b56f5e6b9853674bd9c3f2f22eb30))
* **permissions:** add a create view ([c5846ae](https://github.com/projectcaluma/ember-emeis/commit/c5846aecdfb84bffe670a883f618b7d532d4b7e6))
* **relationship-select:** add component to select a model for a relationship via power-select ([373f213](https://github.com/projectcaluma/ember-emeis/commit/373f2138b64e4152f5a311253ce7d03596c8457c))
* **role index view:** add roles list view ([5dccab4](https://github.com/projectcaluma/ember-emeis/commit/5dccab401512bfd2372359be8cbe799144d9ddc4))
* add example route and model for group ([10b7843](https://github.com/projectcaluma/ember-emeis/commit/10b784343332accf36ab6d46226ad266b5d8c2fd))
* **scopes:** add create view ([55b93ef](https://github.com/projectcaluma/ember-emeis/commit/55b93ef3cd737c684ea6412bf7bc23c78b98b446))
* indent scopes list according to level ([#260](https://github.com/projectcaluma/ember-emeis/issues/260)) ([13c822f](https://github.com/projectcaluma/ember-emeis/commit/13c822fcd172c9a871eefd10e4a1a638ae0e72fb))
* **roles:** add create view ([b9013d9](https://github.com/projectcaluma/ember-emeis/commit/b9013d97b6455fcfaff3cb69349bbd8765679dad))
* **roles:** add edit view ([7bb7cc4](https://github.com/projectcaluma/ember-emeis/commit/7bb7cc4ea0430e6394d575b3e4a06330ead276e1))
* **routes:** add basic route setup ([26b57ce](https://github.com/projectcaluma/ember-emeis/commit/26b57ce8511df5d814e8d1a17af7da9c0c8e89f3))
* **scope index view:** add list view for scopes ([490ead0](https://github.com/projectcaluma/ember-emeis/commit/490ead07e96c71fd6797b02e6a3a6124177d6bd0))
* **scopes:** add edit view for scopes ([a5847bf](https://github.com/projectcaluma/ember-emeis/commit/a5847bf32003904baa9174900175c12813b3312e))
* **section title:** add a component for section headings ([e0437bf](https://github.com/projectcaluma/ember-emeis/commit/e0437bf2288da6925111c420f0afab24e499c77d))
* **store blueprint:** add a blueprint for customizing the store passed to emeis engine ([2b434d6](https://github.com/projectcaluma/ember-emeis/commit/2b434d622c2e595d6da8d70aeef160bbef97138f))
* **user:** add acl edit and create views ([cc990ab](https://github.com/projectcaluma/ember-emeis/commit/cc990ab35a7efdea966240587fba2855c5819e12))
* **user:** add create view ([7a3caf4](https://github.com/projectcaluma/ember-emeis/commit/7a3caf40d215679a0dabb0fbdb5ed205b13b7e6f))
* **user:** add edit view ([2b19e3f](https://github.com/projectcaluma/ember-emeis/commit/2b19e3f0f69bbda630cd06cefcde69a03269cd4e))
* **user index view:** add user list view ([ac51323](https://github.com/projectcaluma/ember-emeis/commit/ac513234f095de508c2d9cd0869c22d1f4e5ae4a))

# 1.0.0 (2020-10-27)


### Bug Fixes

* **application.hbs:** set container to overflow: auto ([853fb9e](https://github.com/projectcaluma/ember-emeis/commit/853fb9e8b45e09b5236c36366dd8d046cd939878))
* **concurrency:** use dropTask to prevent state issues ([7a0bb4a](https://github.com/projectcaluma/ember-emeis/commit/7a0bb4a09558e2d484b7362b5413e8d1c890313c))
* **edit-form:** prevent type error by checking if listViewRouteName is passed ([09e03c5](https://github.com/projectcaluma/ember-emeis/commit/09e03c5eb62998029639e8d02671abfade7dde6f))
* **edit-form:** replace hardcoded route name handling with dynamic since an engine can be mouted with a different name ([e770214](https://github.com/projectcaluma/ember-emeis/commit/e77021404a2a9e4d84ad2b900169d4cbccecea34))
* **import:** fix import of pagination controller ([27c6d1b](https://github.com/projectcaluma/ember-emeis/commit/27c6d1bf540fe1b4cea926ccc905314d2165e434))
* **pagination:** only check if strings are empty so they are not serialized as an empty qp ([d79e0a4](https://github.com/projectcaluma/ember-emeis/commit/d79e0a42da7b0db3f8a806f2a6f94540a30b9cb0))
* **relationship-select:** only debounce if search is set so we dont debounce the initial request ([a8c2f03](https://github.com/projectcaluma/ember-emeis/commit/a8c2f0336bfb52a15ef311c1a1eb8a52c82dd54b))
* **relationship-select:** use let instead of with ([690c0ba](https://github.com/projectcaluma/ember-emeis/commit/690c0baab23b288a27656af9f56574cf4b7bd353))
* **route model hooks:** just return a promise to the model hook, no need for async ([fe9ccbf](https://github.com/projectcaluma/ember-emeis/commit/fe9ccbf57391f271603bcc1b61797af7f4dcb180))
* **user-edit:** make route name argument passed to edit form for listview relative ([80d16d5](https://github.com/projectcaluma/ember-emeis/commit/80d16d5544905a24d0c1e04c8cc604299b80f63d))
* **users/edit:** remove UkTab component usage ([abfd9d5](https://github.com/projectcaluma/ember-emeis/commit/abfd9d50a5c4893be59d7ad81ecf330d6505991c))


### Features

* **acl-wizzard:** add wizzard to guide user through acl creation ([50d5a22](https://github.com/projectcaluma/ember-emeis/commit/50d5a228b97eb265077186a0fbb8c5dbe43a6209))
* **create route:** add class for creating new models by reusing the edit view ([ac278ec](https://github.com/projectcaluma/ember-emeis/commit/ac278ec85c94beb6d7cab556b9fc86a09b93a16a))
* **decorators:** add error handling for common model usage ([38155db](https://github.com/projectcaluma/ember-emeis/commit/38155dbf22614b6fad9467c83521764712a49146))
* **edit-form:** add a minimalistic form for editing model fields ([31e4a99](https://github.com/projectcaluma/ember-emeis/commit/31e4a992a46ad13d3186bef22c8c33868e6a521f))
* **engine:** add blueprint and dependencies ([9d31cfb](https://github.com/projectcaluma/ember-emeis/commit/9d31cfb5aa5fe5ab35a943d3f57118f1574caa80))
* **engine:** initialize ember-engines configuration ([b22fcff](https://github.com/projectcaluma/ember-emeis/commit/b22fcffac9d1598875a88570fdde64ebb1f8be95))
* **models:** add models and factories ([fe09023](https://github.com/projectcaluma/ember-emeis/commit/fe090230df41223469cbcfd67a8eb2f98be457ce))
* **multilang:** add decorator for localized fields ([ec20d27](https://github.com/projectcaluma/ember-emeis/commit/ec20d273dcffec2bc73721f37ff0822c9aed99af))
* **multilang:** add serializers for localized models ([88c89c5](https://github.com/projectcaluma/ember-emeis/commit/88c89c58d07edafd9c15337bca0e08de84d7c68d))
* **nav:** add nav ([a40bdcc](https://github.com/projectcaluma/ember-emeis/commit/a40bdcc62b4af525e2f22779e1e1d535baf93417))
* **nav:** add nav components ([066f867](https://github.com/projectcaluma/ember-emeis/commit/066f8676a8395ceffd2657dc9906d9df6036a4f6))
* **permission index view:** add permission list view ([749b00c](https://github.com/projectcaluma/ember-emeis/commit/749b00ca862135af533b456068763144f64b92b7))
* **permissions:**  add permission edit view ([666c720](https://github.com/projectcaluma/ember-emeis/commit/666c72062c0b56f5e6b9853674bd9c3f2f22eb30))
* **permissions:** add a create view ([c5846ae](https://github.com/projectcaluma/ember-emeis/commit/c5846aecdfb84bffe670a883f618b7d532d4b7e6))
* **relationship-select:** add component to select a model for a relationship via power-select ([373f213](https://github.com/projectcaluma/ember-emeis/commit/373f2138b64e4152f5a311253ce7d03596c8457c))
* **role index view:** add roles list view ([5dccab4](https://github.com/projectcaluma/ember-emeis/commit/5dccab401512bfd2372359be8cbe799144d9ddc4))
* **roles:** add create view ([b9013d9](https://github.com/projectcaluma/ember-emeis/commit/b9013d97b6455fcfaff3cb69349bbd8765679dad))
* **roles:** add edit view ([7bb7cc4](https://github.com/projectcaluma/ember-emeis/commit/7bb7cc4ea0430e6394d575b3e4a06330ead276e1))
* **routes:** add basic route setup ([26b57ce](https://github.com/projectcaluma/ember-emeis/commit/26b57ce8511df5d814e8d1a17af7da9c0c8e89f3))
* **scope index view:** add list view for scopes ([490ead0](https://github.com/projectcaluma/ember-emeis/commit/490ead07e96c71fd6797b02e6a3a6124177d6bd0))
* **scopes:** add create view ([55b93ef](https://github.com/projectcaluma/ember-emeis/commit/55b93ef3cd737c684ea6412bf7bc23c78b98b446))
* **scopes:** add edit view for scopes ([a5847bf](https://github.com/projectcaluma/ember-emeis/commit/a5847bf32003904baa9174900175c12813b3312e))
* **section title:** add a component for section headings ([e0437bf](https://github.com/projectcaluma/ember-emeis/commit/e0437bf2288da6925111c420f0afab24e499c77d))
* **store blueprint:** add a blueprint for customizing the store passed to emeis engine ([2b434d6](https://github.com/projectcaluma/ember-emeis/commit/2b434d622c2e595d6da8d70aeef160bbef97138f))
* **user:** add acl edit and create views ([cc990ab](https://github.com/projectcaluma/ember-emeis/commit/cc990ab35a7efdea966240587fba2855c5819e12))
* **user:** add create view ([7a3caf4](https://github.com/projectcaluma/ember-emeis/commit/7a3caf40d215679a0dabb0fbdb5ed205b13b7e6f))
* add example route and model for group ([10b7843](https://github.com/projectcaluma/ember-emeis/commit/10b784343332accf36ab6d46226ad266b5d8c2fd))
* **user:** add edit view ([2b19e3f](https://github.com/projectcaluma/ember-emeis/commit/2b19e3f0f69bbda630cd06cefcde69a03269cd4e))
* **user index view:** add user list view ([ac51323](https://github.com/projectcaluma/ember-emeis/commit/ac513234f095de508c2d9cd0869c22d1f4e5ae4a))
