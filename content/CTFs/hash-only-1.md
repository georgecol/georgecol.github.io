---
topic:
course:
tags:
  - picoctf
  - binaryexploitation
  - medium
  - complete
created: 11 Feb 2026 @ 10:19 am
modified: 11 Feb 2026 @ 04:32 pm
aliases:
---
![[Pasted image 20260211101944.png]]

![[Pasted image 20260211103022.png]]
So it give you the flag as a hash
How are we going to crack it?

So it gives us this hash ``3ee596cb43d03dbe167e9f25f37ac940 ``
 we know that the flags start with picoCTF{} is there a way to anay
and judging by the repeat ee's at the start the hash is not straight substitution, it is likely XOR'd or something idk



Probably not
The hint is hinting at getting the binary to give us the actual content, so I wonder if we specify arguments then that may do something.
Testing locally

Doesnt work locally

Inspecting the code/binary

[[pwn]]



Using strings
![[Pasted image 20260211110251.png]]
Can see this part

It is running the command m5sum with a relative path, not an absolute path, so you can change the command md5sum to whichever you want using a symbolic link, changing it to cat -> the flag will be displayed.

so changing to ``/bin/cat``
using a [[symbolic link]] to link the path /bin/cat to md5sum
which creates a file named md5sum which is a pointer to the position /bin/cat
![[Pasted image 20260211111056.png]]
![[Pasted image 20260211111105.png]]
then changing the [[path]] variable, so when the program is run, it first checks the current directory for locations of the md5sum binary.
![[Pasted image 20260211111119.png]]
adding ``.`` to start of PATH
Adding the current directory to the [[PATH]] variable means that the system will check the current directory for the executeable

So when you run the program
![[Pasted image 20260211111135.png]]
The system uses our symbolic link of md5sum to actually run the command cat on the flag, instead of hashing it. 

### Lessons learnt
- Using relative paths to run commands is very insecure
- When a program runs a command without an absolute path, the OS searches the system for the executeable using the $PATH environment variable
- path hijacking, command injection via relative binary execution