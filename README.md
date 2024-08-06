# quiz-engine
This application is a quiz engine that reads a [json file](./data/quiz-data.json) and generate a quiz.

There are three types of quiz question:
1. Text input question.
2. Select only one option.
3. Select multiple options.

## Installation
```sh
pnpm install
```
## Run
```sh
pnpm run dev
```
## Open browser
[Localhost page](http://localhost:5173/)

## Todo list
- [] Form validation
- [] Refactor css and change colors theme with better color combination.
- [] Add edit and delete answer.
- [] Light theme.
- [] Tests to validate `quiz-data.json`.
- [] Improve question with no image styles.
- [] Navigation with keyboard arrows or tab. 
- [] Update `currentIndex` value when scroll item to view.
- [] Add conditional navigation using `questionIdToGo` `quiestionIdrequired` or other strategy.
- [] Dynamically change color theme using metadata in `./data/quiz.json`.
- [] Submit quiz answers page with thank you page.
- [] Production build best practices.
