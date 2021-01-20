# How To Contribute

Welcome, and thank you for your interest in contributing to the TeacherFund website!

There are many ways to contribute, beyond writing code. The goal of this document is to provide a high-level overview of how you can get involved.

## Reporting Issues
We want to hear about any problems with the website. Whether it be a visual bug, a functional issue (e.g. links don't work, server errors when donating or logging in, etc.), or just a suggestion to make things more maintainable, please log an issue in this repository.

### Look For an Existing Issue
Before you create a new issue, please do a search in [open issues](https://github.com/teacherfund/TeacherFund_next/issues) to see if the issue or feature request has already been filed.

If you find your issue already exists, make relevant comments and add your reaction. Use a reaction in place of a "+1" comment:

- 👍 - upvote
- 👎 - downvote

### Writing Good Bug Reports and Feature Requests
File a single issue per problem and feature request. Do not enumerate multiple bugs or feature requests in the same issue.

Do not add your issue as a comment to an existing issue unless it's for the identical input. Many issues look similar, but have different causes.

These would be very helpful to include:
- Reproducible steps (1... 2... 3...) that cause the issue
- What you expected to see, versus what you actually saw
- Images, animations, or a link to a video showing the issue occurring

## Writing Code
If you are interested in writing code to fix issues, read the below to understand our project structure and set up your development environment.

Please note: all design should be made with [our home page style](https://github.com/teacherfund/TeacherFund_next/blob/master/HomePageDesign.pdf) in mind.

**In order to avoid duplicate work and to save you from wasting time, please comment in an open issue your intention to code out the resolution to that issue. If it isn't obvious how that issue will be solved, outline what you plan to do to make sure it's in line with the maintainers' vision for the project.**

The website is written in [React](https://github.com/facebook/react/) using [Next.js](https://github.com/zeit/next.js) from Zeit. [Chakra UI](https://chakra-ui.com/) is used as a React component library. [Magic](https://magic.link) is used for authentication. [Stripe](https://stripe.com) is used for payment processing.

### Directory Structure
- **components**
  - _Custom React components_
- **containers**
  - _Higher-order React components_
- **hooks**
  - _React hooks_
- **lib**
  - _Utilities used by the serverless functions_
- **pages**
  - _React component containers that correspond to actual pages_
  - **api**
    - _Vercel serverless functions to manage authentication / donations_
- **public**
  - _Images and SCSS files_
- **test**
  - _Unit tests_
- **utils**
  - _Reusable utility functions_

### Local Development Environment
- Install [Node.js and NPM](https://nodejs.org) `>= 8.x`
- Fork this repository, clone it locally, and keep it in sync by following the instructions [here](https://help.github.com/articles/fork-a-repo/)
- Install dependencies by running `npm install` in the project directory
- Create a local environment file named `.env.local`
  - Add `NEXT_PUBLIC_DEVELOPMENT=1` to the file. This will allow you to skip authentication during local development, since the Magic authentication environment variables are not public.
  - If you need Stripe to work while developing locally, contact [@joelwass](https://github.com/joelwass/) and he can provide the Stripe test keys
- Start the website locally by running
  ```shell
  npm run dev
  ```
  When it's done building, access it at this link: http://localhost:3001/

### Opening a Pull Request
Commit any code changes to a branch (e.g. `fix/header` or `feature/donate-form`).

When you've finished making changes and committed the changes into your branch, you can open a pull request. Please reference the issue you have solved in your pull request.

### Coding Standards
- Code should pass linting by [Standard](https://standardjs.com/). Run `npm run lint` to confirm there are no linting errors. You can have Standard auto-fix linting issues by running `npx standard --fix`.
- Bugfixes should be accompanied by tests to avoid regression

## Thank You!
Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute.
