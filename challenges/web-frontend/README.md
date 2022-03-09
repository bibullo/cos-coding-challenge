# CarOnSale

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Running the project and unit tests

To run this project you'll need both [`Noje.js and npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Development server

After that you'll need to install the dependencies running `npm install`.

Then just run `ng serve` for a development server.
Navigate to `http://localhost:4200/`.

### Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io).

A code coverage summary can be taken with the option `--coverage`. The results will be stored in the `coverage` directory.

```
=============== Coverage summary ===============
Statements   : 100% ( 245/245 )
Branches     : 100% ( 16/16 )
Functions    : 100% ( 54/54 )
Lines        : 100% ( 203/203 )
================================================
```

## About some of the choices made

### Jest

For unit testing i chose [Jest](https://jestjs.io) instead of Jasmine because it is more versatile in some testing scenarios. Also, it is very reliable and easy to setup.

### Commitlint, Commitizen and Husky git hooks

[Husky](https://typicode.github.io/husky) is being used for running [Commitizen](https://github.com/commitizen/cz-cli) on every commit attempt to help build [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) messages and after that it runs [Commitlint](https://github.com/conventional-changelog/commitlint) before the commit is actually made to ensure it has a pattern message even when Commitizen is bypassed.

It's amazing how well they work together to help making atomic commits a reality for a more understandable, revertable, trackable and cleaner commit history.

### ESLint, Prettier and Husky git hooks

[Husky](https://typicode.github.io/husky) is also being used here for running unit tests, [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) before commits are made. Again going in the same direction that development made in the application follows a certain pattern and that nothing has been broken with changes made.

### Akita

[Akita](https://datorama.github.io/akita/) is a state management built on top of [RxJS](https://rxjs.dev/), because of that it works incredibly well with Angular. It's concepts of streaming data with immutable updates to create a Observable Data Store becomes a very useful tool for maintaining a clean and scalable application.

### Architecture

One of the goals behind choosing [Akita](https://datorama.github.io/akita/) for State Management is to build a reactive app using [RxJS](https://rxjs.dev/) long-lived Observable streams following a [Push-based Architecture Pattern](https://thomasburlesonia.medium.com/push-based-architectures-with-rxjs-81b327d7c32d) which brings lots of benefits like unidirectional data flow, immutability, faster change detection and performance.

Other architecture choice was to set up a navigation UI that can make use of Angular's [Lazy-loading of feature modules](https://angular.io/guide/lazy-loading-ngmodules) to improve performance.

### Fuel and Transmission Types

Since i could not find in either the resources provided, or the API endpoints available, a proper conversion from the numbers for fuel and transmission types that are returned from the API and the actual value itself, I built a conversion that is probably not correct to the intended values, but still in a way that it can be easily swappable to reflect the values that were expected.

## Further improvements that can be made

### End-to-End testing with [Cypress](https://www.cypress.io/)

E2E Testing, together with unit tests, would make continuous improvement and maintenance of the application much easier, preventing unexpected behaviours and maximizing reliability.

### JSDoc

I would document things like guards, interceptors, pipes, services and general component methods using JSDoc. It is simple to write and helps expose the goals behind some of the implementations made.

### Accessibility

Some things in the app aren't yet perfectly accessible to all kinds of users, it is a high priority enhancement that i couldn't make fit in the limited amount of time available.

### General layout refinements

Skeleton loading to auction cards in the auction overview page.

Auction card having a swiper for when multiple car images are available.

Auction card pagination for the auction overview page.

Creating a home landing page as well as improving the design other pages like login, auctions and not found.
