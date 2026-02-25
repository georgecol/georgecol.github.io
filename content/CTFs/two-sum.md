---
topic:
course:
tags:
  - picoctf
  - binaryexploitation
  - medium
  - complete
created: 11 Feb 2026 @ 03:13 pm
modified: 2026-02-15T00:41:30+13:00
aliases:
---
![[Pasted image 20260211151340.png]]

```C
#include <stdio.h>
#include <stdlib.h>

static int addIntOvf(int result, int a, int b) {
    result = a + b;
    if(a > 0 && b > 0 && result < 0)
        return -1;
    if(a < 0 && b < 0 && result > 0)
        return -1;
    return 0;
}

int main() {
    int num1, num2, sum;
    FILE *flag;
    char c;

    printf("n1 > n1 + n2 OR n2 > n1 + n2 \n");
    fflush(stdout);
    printf("What two positive numbers can make this possible: \n");
    fflush(stdout);

    if (scanf("%d", &num1) && scanf("%d", &num2)) {
        printf("You entered %d and %d\n", num1, num2);
        fflush(stdout);
        sum = num1 + num2;
        if (addIntOvf(sum, num1, num2) == 0) {
            printf("No overflow\n");
            fflush(stdout);
            exit(0);
        } else if (addIntOvf(sum, num1, num2) == -1) {
            printf("You have an integer overflow\n");
            fflush(stdout);
        }

        if (num1 > 0 || num2 > 0) {
            flag = fopen("flag.txt","r");
            if(flag == NULL){
                printf("flag not found: please run this on the server\n");
                fflush(stdout);
                exit(0);
            }
            char buf[60];
            fgets(buf, 59, flag);
            printf("YOUR FLAG IS: %s\n", buf);
            fflush(stdout);
            exit(0);
        }
    }
    return 0;
}
```

Size of int in C = 4 bytes - 
unsigned - Range - **-32,767** to **+32,767**
signed 0 - **2,147,483,647**
So maybe 65534  

```
2147483647 2
```
![[Pasted image 20260211151954.png]]
```flag
picoCTF{Tw0_Sum_Integer_Bu773R_0v3rfl0w_76f333c8}
```
#### lessons learn
- integer overflow - an unsigned int of 4 bytes can only hold so big a number till you increment one to the binary version of it and it flips to the other side 
