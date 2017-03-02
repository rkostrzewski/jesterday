# jesterday
[![Build Status](	https://img.shields.io/travis/rkostrzewski/jesterday.svg)](https://travis-ci.org/rkostrzewski/jesterday)[![codecov](		https://img.shields.io/codecov/c/github/rkostrzewski/jesterday.svg)](https://codecov.io/gh/rkostrzewski/jesterday)[![dependencies](https://img.shields.io/david/rkostrzewski/jesterday.svg)](https://david-dm.org/rkostrzewski/jesterday)[![npm](https://img.shields.io/npm/v/jesterday.svg)](https://www.npmjs.com/package/jesterday)

## [Documentation](https://rkostrzewski.github.io/jesterday/)
## Highlights
- API focused on Functional Programming and immutability
- Small size
- Month indexing starts from 1 (seriously it's a big deal!)

## User Guide
Install as dependency: ```npm i jesterday --save```

Import functions and have fun :)
```
import { add, endOf, now } from 'jesterday'

const currentDate = now()
const endOfNextMonth = endOf('month', add(1, 'month', currentDate))
```
