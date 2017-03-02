# jesterday

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

## Documentation

Full documentation available here.
