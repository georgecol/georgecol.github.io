---
tags:
  - HSS
  - PublicKeyEncryption
  - University
  - math
aliases:
created: 12-12-2025
modified: 22 Feb 2026 @ 09:53 pm
---

Useful definitions
*Congruent* - the same as *or* having the same size or shape
### 2.1

Modular arithmetic is also used in public key encryption, as well as 
AES. 
### *Unique Prime Factorisation:*
Every integer a greater than 1 can be factorised as a product of prime numbers

- Break it down into primes
- 

#### *Factor*
Is a number when you divide it by another number, it leaves a whole number.
Factors of 12:
*1,2,3,4,6,12*
1x12, 2x6, 3x4
#### *Prime*
A number that can only be divided by 1 and itself - (only have two factors)
e,g 7 - 1x7

#### *Factorisation*
Splitting a number up into its factors
#### Unique Prime Factorisation - only one way
e.g 
![[Pasted image 20260107130812.png]]

Question - 66 = 2 x 3 x 11 
![[Pasted image 20260107130924.png]]
84 = 2 x 2 x 3 x 7
![[Pasted image 20260107131020.png]]


The example in the text - 
216000 = $2^5$ x $3^3$ x $5^2$
Means - 2 appears 5 times in the primes of unique prime factorisation of 216000
3 appears 3 times, and 5 appears twice.

#### *As a consequence, if a prime p divides a product ab then it must be one of the primes in the factorization of the product ab and thus also be a prime in the factorization of either a or of b, so must divide either a or b (or both).*    *pg 26*

if *p* is a prime and divides *a x b* then *p* must divide b (or both)
This is sometimes called Euclid's Lemma. 

So for example, let a = 12, and b = 15.
ab = 300
if you have a prime 2, that divides the product 300, then it must be a factor in either a or b.
Which it is in a - 2 x 6.
If a prime divides the product of ab , then it must be a factor of either a or b.


**Key analogy** - Prime factors are the “atoms” of numbers. So when you multiply numbers, you only combine atoms, you never create new ones.
So if a prime is present in a product, it must have come from one of the numbers being multiplied.

### Fermat's Little Theorem
Fermat's Little Thereom tells us that a *$a^{p−1}$* mod p = 1
as long *P* is prime, *A* is a positive integer, and  the greatest common divisor between *P* and *A* is 1.

In simple words - allows you to find a remainder when you divide a **large** number by a **small** number

As an example, 7 is a prime number that does not divide 21600 (as 7 does not appear in its prime factorization). Hence $21600^6$ mod 7 = 1

e.g
gcd(5,2) = 1
$2^{5-1}$ mod 5 = 1 
$2^4$ = 16 mod 5 = 3 remainder **1**

e.g
What is $2^{502}$ mod 5 ? (hard to work out with calc cus number so large)
We know what $2^4$ is congruent to mod 5 (1).
So we can use this to figure out the larger one.
How many time does 4 go into 502 - 125 times , remainder 2
![[Pasted image 20260108171013.png]]
We know that $2^4$ mod 5 = 1
![[Pasted image 20260108171239.png]]
So $2^{502}$ mod 5 = 4

#### Proof
Start with number p = 7, and a = 3
Since 7 is a prime, and 3 is an integer not divisible by 7.
->
Start with the set 
1,2,3,4,5,6(p-1)
->
Multiply each by a and take the remainder mod p to get the set
->
(1 x 3) mod 7 = 3
(2 x 3) mod 7 = 6
(3 x 3) mod 7 = 2
(4 x 3) mod 7 = 5
(5 x 3) mod 7 = 1
(6 x 3) mod 7 = 4
->
So the set now becomes {3,6,2,5,1,4}
->
Which is just a permutation (rearrangement) of the original set.
->
Multiply everything together mod 7
-> 1x2x3x4x5x6 = 720
New Product
-> (3 x 6 x 2 x 5 x 1 x 4) = $3^6$ x (1x2x3x4x5x6) --- (3^6 comes from the 6 times we multiple the set by 3)
-> 
720 $\cong$ $3^6$ x 720 (mod 7)
-> 
cancel common 720 (divide both sides by it)
 -> $3^6$ = 1 (mod 7)
 only allowed to cancel because 720 (the product of the set) has an inverse mod p
 
###  Multiplicative Inverse
A number x has an inverse modulo p if there exists a number y such that
x * y = 1 (mod p)
The y is called the multiplicative inverse of x mod p
in other words -> "What do I multiply x by to get 1, after taking the remainder mod p"

A multiplicative inverse of a number say 7 - is any non-zero real number that when multiplied by the original (7) results in 1.
 
https://www.youtube.com/watch?v=H7zcXkQkCGg