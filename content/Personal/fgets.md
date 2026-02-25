---
tags:
  - c
  - function
topic:
created:
aliases:
modified: 10-02-2026 14:02
---
#### definiton
function definition:
```c
char *fgets(char *str, int n, FILE *stream);
```

The parameters are:

- `str`: A pointer to a character array (buffer) for storing the read string.
- `n`: The maximum number of characters to read, including the null terminator. It reads at most `n - 1` characters.
- `stream`: A pointer to a `FILE` object, such as a file pointer or `stdin` for standard input.
#### abstract
The `fgets()` function in C programming is used to read a line of text from a specified input stream (like a file or standard input) and store it safely into a character array (buffer)