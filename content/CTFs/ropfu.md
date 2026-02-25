---
topic:
course:
tags:
  - picoctf
  - binaryexploitation
  - hard
  - in-complete
created: 11 Feb 2026 @ 08:04 pm
modified: 15 Feb 2026 @ 10:57 am
aliases:
---
![[Pasted image 20260211200436.png]]
![[Pasted image 20260211200443.png]]
ROP = return oriented programming

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>

#define BUFSIZE 16

void vuln() {
  char buf[16];
  printf("How strong is your ROP-fu? Snatch the shell from my hand, grasshopper!\n");
  return gets(buf);

}

int main(int argc, char **argv){

  setvbuf(stdout, NULL, _IONBF, 0);
  

  // Set the gid to the effective gid
  // this prevents /bin/sh from dropping the privileges
  gid_t gid = getegid();
  setresgid(gid, gid, gid);
  vuln();
  
}

```