---
topic:
course:
tags:
  - picoctf
  - binaryexploitation
  - medium
  - complete
created: 11 Feb 2026 @ 02:54 pm
modified: 11 Feb 2026 @ 03:15 pm
aliases:
concept: use after free
---
https://learn.snyk.io/lesson/use-after-free/?ecosystem=cpp

![[Pasted image 20260211145436.png]]


```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FLAGSIZE_MAX 64

// Create struct
typedef struct {
  char a[10];
  char b[10];
  char c[10];
  char flag[5];
} object;

int num_allocs;
object *x;

void check_win() {
  if(!strcmp(x->flag, "pico")) {
    printf("YOU WIN!!11!!\n");

    // Print flag
    char buf[FLAGSIZE_MAX];
    FILE *fd = fopen("flag.txt", "r");
    fgets(buf, FLAGSIZE_MAX, fd);
    printf("%s\n", buf);
    fflush(stdout);

    exit(0);

  } else {
    printf("No flage for u :(\n");
    fflush(stdout);
  }
  // Call function in struct
}

void print_menu() {
    printf("\n1. Print Heap\n2. Allocate object\n3. Print x->flag\n4. Check for win\n5. Free x\n6. "
           "Exit\n\nEnter your choice: ");
    fflush(stdout);
}

// Create a struct
void init() {

    printf("\nfreed but still in use\nnow memory untracked\ndo you smell the bug?\n");
    fflush(stdout);

    x = malloc(sizeof(object));
    strncpy(x->flag, "bico", 5); // create the x object with flag bico
}

void alloc_object() {
    printf("Size of object allocation: ");
    fflush(stdout);
    int size = 0;
    scanf("%d", &size);
    char* alloc = malloc(size);
    printf("Data for flag: ");
    fflush(stdout);
    scanf("%s", alloc);
}

void free_memory() {
    free(x);
}

void print_heap() {
    printf("[*]   Address   ->   Value   \n");
    printf("+-------------+-----------+\n");
    printf("[*]   %p  ->   %s\n", x->flag, x->flag);
    printf("+-------------+-----------+\n");
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
            alloc_object();
            break;
        case 3:
            // print x
            printf("\n\nx = %s\n\n", x->flag);
            fflush(stdout);
            break;
        case 4:
            // Check for win condition
            check_win();
            break;
        case 5:
            free_memory();
            break;
        case 6:
            // exit
            return 0;
        default:
            printf("Invalid choice\n");
            fflush(stdout);
        }
    }
}

```

Looks like I need to create an object and overwrite the x objects flag name

By using the free memory or something
maybe to do with use after free

So I need to figure out how after I free the x object, I can get the program to allocate me that space and then override it.

Figure out: size of allocation, and what to put in flag variable, im guessing allocation needs to be bigger than 35 bytes

- Allocation needed to be 35 bytes or a bit bigger, otherwise if alloc too small, the heap allocator wouldn't use the space that was just freed.
- 

payload:
```
AAAABBBBCCCCDDDDAAAABBBBCCCCDDpico
```

![[Pasted image 20260211150538.png]]
![[Pasted image 20260211150611.png]]
```flag
picoCTF{now_thats_free_real_estate_a7381726}
```



### lessons learnt
- use after free vulnerability - x is freed() , but is still used in the code to compare
- The struct is 35 bytes big - 30 for all the a,b,c and 5 for the flag. So the payload should be 30 random bytes then pico to get the win condition to trigger
- When the memory is free it is returned to the heap allocator, as evident in this exploit, I was able to free it -> allocate a new object of the same size -> overwrite the data previously stored in the x variable.