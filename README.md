![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 08: SQL and PostgreSQL
===

## Submission Instructions
Follow the submission instructions from Lab 01.

## Resources  
[SQL Syntax Cheatsheet](cheatsheets/sql.md)

[PostgreSQL Shell Cheatsheet](cheatsheets/postgress-shell.md)

## Configuration
_Your repository must include:_

```
08-sql-intro-and-postgres
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── public
│   ├── data
│   │   └── hackerIpsum.json
│   ├── index.html
│   ├── new.html
│   ├── scripts
│   │   ├── article.js
│   │   └── articleView.js
│   ├── styles
│   │   ├── base.css
│   │   ├── fonts
│   │   │   ├── icomoon.eot
│   │   │   ├── icomoon.svg
│   │   │   ├── icomoon.ttf
│   │   │   └── icomoon.woff
│   │   ├── icons.css
│   │   ├── layout.css
│   │   └── modules.css
│   └── vendor
│       └── styles
│           ├── default.css
│           ├── normalize.css
│           └── railscasts.css
└── server.js
```

## Feature Tasks

*As a user, I want to store my articles in a database so that my articles are available for users from an external source.*

- Install and require the NPM Postgres package `pg` in your server.js file. Make sure to complete the connection string.
- Note that the articleView.js methods are different now that we are not accessing the JSON file directly, and instead retrieving the articles from a database.

*As a developer, I want to review my code base so that I have a deep understanding of its overall functionality.*

-  Complete the TODO items in server.js to ensure that your server file is properly configured
- Study each of the new routes in your server.js file by examining the SQL statements and any associated data being handed through the request.
- For each of the COMMENT items in server.js, provide a brief description of what that function immediately below is doing. Be sure to indicate, where applicable, details such as:
  - What number(s) of the full-stack-diagram.png image is this part of the code interacting with?
  - Which method of article.js is interacting with this particular piece of server.js?
  - What part of ***CRUD*** is being enacted/managed by this particular piece of code?
  - As applicable, an additional sentence or two of explanation about what the code is doing, what NPM packages are involved, etc. The goal is to demonstrate that you understand what is going on in the code without glossing over details, but also without writing a novel about it.

## Documentation
_Your README.md must include:_

```md
# Project Name

**Author**: Your Name Goes Here
**Version**: 1.0.0 (increment the patch/fix version number up if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code Fellows 301 class. (i.e. What's your problem domain?) -->

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this are to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
-->
```
