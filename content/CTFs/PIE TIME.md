---
topic:
course:
tags:
  - picoctf
  - ctf
  - binaryexploitation
  - easy
created: 05-02-2026 19:00
modified: 10-02-2026 13:02
---
Hint
![[Pasted image 20260205190348.png]]

Before launching instance - research on the clue PIE - google search with pie + binary yields:
PIE  - Position independent code - which are executable [[binaries]] made entirely from position independent code, which means each time the program is loaded into memory it is loaded into a random location, enhancing security.

This differs from a position dependant code such as absolute code, or load-time locatable (LTL) code, where a linker or program loader modifies a program before it executes.

Different kinds of PIE's https://en.wikipedia.org/wiki/Position-independent_code
- ELF - executable and linkable format(linux)
- DLLs  - dynamically linked libraries (Windows) 

Launching the instance  we need to netcat into it, so launched my kali vm to do so.
![[Pasted image 20260205192045.png]]

So first look at the problem, we are given the address to a 'main' which I assume is the address to the main method/program entry, and then a prompt to enter an address to jump to. 

we are given the source code

```c
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
  
void segfault_handler() {
  printf("Segfault Occurred, incorrect address.\n");
  exit(0);
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
  
  printf("Address of main: %p\n", &main);
  unsigned long val;
  
  printf("Enter the address to jump to, ex => 0x12345: ");
  scanf("%lx", &val);
  printf("Your input: %lx\n", val)
  
  void (*foo)(void) = (void (*)())val;
  foo();

}
```
Enter the main address- nothing happens, asks for input again.
Enter too long of input - segmentation fault happened, and printed incorrect address


Immediately what drew my attention was the last few lines in the main method, I can see that I have to somehow give the address of the win function based on the address of the main function.

the last two lines basically assign the value of the input `val` and turn it into an executeable function, so in theory if I supply an address, then I can jump to the win function and execute it, printing the flag.

##### using a symbol table to find the functions dynamically

using the command `nm vuln` I was able to print this

nm is used to list symbols (like functions and variables) from object files , libraries and executeables(compiled files)
![[Pasted image 20260205194140.png]]
which I noticed the last 3 digits of the main function address in this output was the same as the last 3 printed by the program

So all I had to do was use the first set of dynamic digits (address) and change the last 3 to match 2a7 - the address of the win function, effectively supplying an offset

![[Pasted image 20260205194258.png]]

![[Pasted image 20260205193909.png]]