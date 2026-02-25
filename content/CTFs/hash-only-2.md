---
topic:
course:
tags:
  - picoctf
  - binaryexploitation
  - medium
  - complete
created: 11 Feb 2026 @ 11:20 am
modified: 11 Feb 2026 @ 02:09 pm
aliases:
---
![[Pasted image 20260211112141.png]]
connecting
nothing in main directory

can run the flaghasher - with just the command flaghasher
![[Pasted image 20260211112926.png]]

to find where it is
```bash
whereis flaghasher
```
![[Pasted image 20260211112950.png]]


We cannot CD to it, so all commands to check out this binary will have to use that absolute file path.
Upon first inspection with strings, it looks like it does the same thing as the first one? Wondering if I can do the same exploit?
![[Pasted image 20260211113117.png]]

Create symbolic link because we have write permissions in the user/local/bin
![[Pasted image 20260211114013.png]]
With command
![[Pasted image 20260211113425.png]]
Check:
![[Pasted image 20260211113441.png]]

Update path variable using
export PATH=".":$PATH
Cannot do that, but it looks like the path has that anyway
![[Pasted image 20260211113506.png]]
Run the command
![[Pasted image 20260211113543.png]]
boom

### Lessons learnt
- the ``whereis`` command to locate stuff (replace the intuitive find that I always seem to try and it fails)
- 