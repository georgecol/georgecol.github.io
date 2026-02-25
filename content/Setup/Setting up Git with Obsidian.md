---
tags:
  - Setup
modified: 2026-02-25T08:42:00+13:00
draft: true
---

### Step 1: Create new obsidian vault in a folder
Manage Vaults -> New Vault -> Name and Location
****
### Step 2: Create a new git repo on github web
![[Pasted image 20260104223405.png|400]]
****
### Step 3: Initialise a git repo in the obsidian folder
~~~bash
git init
git branch -M main
~~~
****
### Step 4: Generate SSH key to connect to github (if dont have one) 

```bash
ssh-keygen -t ed25519 -C "gcollier229@gmail.com"
```
Go through keygen process - use a passphrase
Add Key to Github:
```Bash
cat ~/.ssh/id_ed25519.pub
```
Copy the whole key and paste into: GitHub -> Settings -> SSH Keys -> Add
![[Pasted image 20260104223712.png|450]]
****
### Step 5: Add Remote Repo
```Shell
git remote add origin git@github.com:georgecol/obsidian-notes.git
```
****
### Step 6: First Commit
```Bash
git add .
git commit -m "Initial Obsidian vault"
git push -u origin main
```
****
### Step 7: Installing Git Obsidian Plugin
Install:
- Obsidian → Settings → Community plugins
- Enable **Obsidian Git**
Configure:
- Auto pull on startup
- Auto commit every X minutes
- Commit message template
	- `Vault backup: {{date}}`
This makes syncing **basically automatic**.
****
### Step 8: Git Ignore
In obsidian/git folder
```
touch .gitignore
nano .gitignore
```
paste:
~~~ 
.obsidian/workspace*
.obsidian/cache
.trash
~~~

****
### Make sure
- git config is set  
~~~bash
git config --global user.name "George Collier"
git config --global user.email "YOUR_GITHUB_EMAIL@example.com"
~~~

### Saving work and commiting
Side bar -> Command Pallete -> Git: Commit and Sync