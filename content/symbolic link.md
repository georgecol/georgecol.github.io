---
topic:
course:
tags:
  - c
  - linux
  - filesystem
created: 11 Feb 2026 @ 11:03 am
modified: 11 Feb 2026 @ 11:20 am
aliases:
---
#### definition
A **symbolic link** (also known as a **symlink** or **soft link**) in Unix-like operating systems is a special type of file that serves as a pointer or shortcut to another file or directory by storing a path to its target

command for creating a link in unix = ``ln``
with the flag ``-s`` for symbolic

```bash
ln -s /path/to/target /path/to/new_symbolic_link
```

**Example**: To create a symbolic link named `mylink.txt` in your current directory that points to a file named `original_file.txt` in your home directory:
```bash
ln -s /home/username/original_file.txt mylink.txt
```