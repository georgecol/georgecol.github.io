---
tags:
  - personal
  - Setup
aliases:
  - Quartz
modified: 05-02-2026 18:02
topic:
course:
created: 2026-02-04
---
Working on displaying my obsidian notes to my static site, this will be an easier way to serve my writeups and other stuff I would like to do in the future. Following my [[Learning Goals for the next two weeks|Plan]] 


Installing
```bash
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

Create github repo for it on website
Copy HTTP link
```
git remote -rm origin //removes jackyzha0
git remote add origin "repolink"
```
verify remote
``git remote -v
 ![[Pasted image 20260204101654.png]]


Then open file path as a vault to start creating new notes in the content folder

then once happy - sync to github
```
npx quartz sync --no-pull
```

**Building the site** - 
``npx quartz build --serve
opens up on port 8080
localhost:8080

![[Pasted image 20260204102224.png]]

#### syncing to github (pushing basically)
```bash
npx quartz sync
```


Editing site

Must have index.md 

changed to 

in `quartz.config.ts
changed name to `""`
changed base url to the github one


Progress so far - setup quartz site to run locally - having trouble deploying to github actions with the deploy script - this is different to how  I deployed the other site via the github branch and root directory, you cannot do this in quartz because It cant use jellykl or whatever its called.

