---
topic:
course:
tags:
  - binaryexploitation
  - ctf
  - picoctf
  - medium
  - complete
created: 10-02-2026 14:41
modified: 26 Feb 2026 @ 09:43 am
aliases:
---

![[Pasted image 20260210144552.png]]

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int main(void) {
	char* username = malloc(28);
	char* shell = malloc(28);
	
	printf("username at %p\n", username);
    fflush(stdout);
	printf("shell at %p\n", shell);
    fflush(stdout);
	
	strcpy(shell, "/bin/pwd");
	
	printf("Enter username: ");
    fflush(stdout);
	scanf("%s", username);
	
	printf("Hello, %s. Your shell is %s.\n", username, shell);
	system(shell);
    fflush(stdout);
	
	return 0;
}
```

![[Pasted image 20260210211121.png]]

So it looks like I have to overflow the username buffer, which is malloc'd 28 bytes, and then get it to print the flag somehow by running that shell command

Using the addresses that they give you we can find out how close they are

![[Pasted image 20260211100907.png]]
Looks like the addresses are 30 bytes away

gggggggggggggggggggggggggggggg ggggg

48 g-s then command
gggggggggggggggggggggggggggggggggggggggggggggAAA
```
cat${IFS}flag.txt
```

Seems to be the same buffer overflow
30 hex = 48 decimal
![[Pasted image 20260211101552.png]]
testing on the target
can see the flag file
![[Pasted image 20260211101609.png]]
but cannot access it, possibly because of the space in the input
![[Pasted image 20260211101734.png]]
Was able to use a variant of the cat command that doesnt have a space.
boom
