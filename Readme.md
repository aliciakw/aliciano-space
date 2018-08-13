### A simple portfolio website

#### The problem
Build a well-organized and easy to update single-page application to showcase my portfolio, in the most lightweight manner possible.
* Support reusable pieces of code without resorting to the use of a javascript framework like Angular or React, which would have been overkill in this case
* Support interactivity without cluttering the html with script tags or polluting the global scope with variables
* Separation of concerns. Changes to content should be limited to updating a json file, to prevent bugs and make my life easier down the line.

#### run locally
```
npm install
npm run dev
```

#### build the public site
Compile the source code into the final static site:
```
npm run build-public-site
```
Upload the contents of `dist/` to the web host.
