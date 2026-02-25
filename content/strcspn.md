---
tags:
  - c
  - function
topic:
created:
aliases:
modified: 10-02-2026 14:02
---
#### definition
``strcspn()`` aka complementary span
- **Purpose:** It finds the length of the initial portion of a string that does not contain any of the characters specified in a rejection set.
- **Return Value:** Returns the number of characters before the first match. If no characters from the second string are found, it returns the total length of the first string.
- **"Complementary Span":** The name implies it spans the string until it finds a character _not_ in the desired set, effectively searching for the "complement" of the characters in `str2`.

#### example
```c
#include <stdio.h>
#include <string.h>

int main() {
    const char *str1 = "Hello World";
    const char *str2 = " "; // Space character
    
    // Finds the first space and returns the number of chars before it
    size_t length = strcspn(str1, str2);
    
    printf("Length before space: %zu\n", length); // Output: 5 ("Hello")
    return 0;
}
```


