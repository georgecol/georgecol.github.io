---
topic:
course:
tags:
  - binaryexploitation
  - ctf
  - picoctf
  - medium
  - complete
created: 10-02-2026 14:11
modified: 10-02-2026 14:02
aliases:
---
![[Pasted image 20260210141149.png]]

```C
#include <string.h>
#include <stdio.h>
#include <stdlib.h> 

void fun(char *name, char *cmd);

int main() {
    char name[200];
    printf("What is your name?\n");
    fflush(stdout); // forces the printf to be written to the screen immeidiately


    fgets(name, sizeof(name), stdin);
    name[strcspn(name, "\n")] = 0;

    fun(name, "uname");
    return 0;
}

void fun(char *name, char *cmd) {
    char c[10];
    char buffer[10];

    strcpy(c, cmd); // copy uname to c
    strcpy(buffer, name); // copy user input to buffer

    printf("Goodbye, %s!\n", buffer);
    fflush(stdout);
    system(c); //used to execute an operating system command
}
```
Looks like the function uses [[fgets]] and [[uname]] and [[strcspn]]


fgets is used to get the argument from std in and put into into variable name with the size of name e.g 5 
uname is used to print the OS name to the console
and strcspn is used to set the null terminator character to 0, effectively removing the null terminator character
![[Pasted image 20260210143407.png]]
upon inspection of the fun function, it looks like the buffer is set to 10 characters,
with the newline being removed, I needed to input 10 characters to try a buffer overflow

Local testing by appending ``ls`` to the end of the 10 g's 
![[Pasted image 20260210143433.png]]
I was able to print the contents of my current directory, using that logic, we could print the contents of the directory on the target
![[Pasted image 20260210143502.png]]
which allowed me to see the flag file
all I had to do was cat the file to see the contents
![[Pasted image 20260210143529.png]]
which effectively turned the uname command into whatever 

#### What was wrong in the program
- Not validating user input
- overflowing the buffer via the strcpy command  `` strcpy(buffer, name);`` allowing the variable next to buffer on the stack to be whatever I choose.
