---
topic:
date: 2026-05-27
course:
tags:
  - projects/university
  - Year3
  - NetworksCybersecurity
aliases:
  - Highly Secure Systems
  - COMP716
draft: false
---
#### Note about course
By far my favourite course this semester, very interesting to learn about the core encryption algorithms, and the origins of todays algorithms. The practical applications are also very interesting, SSH passwordless login, openssl toolkit, certificates, etc.
# Brief Overview of Content

## Introduction & Classical Ciphers
- CIA triad, nRAF, Kerckhoffs’s principle, confusion & diffusion.
- Classical ciphers: Caesar, Vigenère, Enigma, Rail Fence; attacks: brute force & frequency analysis.
##  Modular Arithmetic
- Modular addition/multiplication, groups, fields, equivalence classes.
- Affine/Hill ciphers, Euclidean algorithms, multiplicative inverse.
##  Stream Ciphers & Modes
- Stream ciphers use XOR; OTP secure with truly random non-reused keys.
- Block modes: ECB, CBC, OFB, CFB, CTR; keystream generation via LFSR/CSPRNG.
## DES & 3DES
-  Feistel networks, permutations, S-boxes for confusion/diffusion.
-  Key size and security for DES,2DES, and 3DES  (~112-bit effective key size).
## AES
- Using polynomial arithmetic and S-box transformations.
- AES rounds: substitution, diffusion, key addition, and key scheduling.
## Hash Functions
- Hashes provide integrity via pre-image, second pre-image, and collision resistance.
- MD5/SHA-1, MAC/HMAC, salted passwords, birthday attack resistance
##  RSA
- Public/private keys, Euler’s theorem, primes, and modular arithmetic.
- Applications: encryption, key exchange, digital signatures, non-repudiation.
##  DH & ECDH
- DH/ECDH provide secure key exchange using DLP or elliptic curve mathematics.
- ECC uses point addition/scalar multiplication; vulnerable to MitM without authentication.
## Digital Signatures & PKC
- Digital signatures provide integrity, authenticity, and non-repudiation.
- RSA, DSA, ElGamal, ECDSA used in PKI, session key exchange, and cryptocurrency.
##  System Security
- AAA = Authentication, Authorization, Accounting; Kerberos and RADIUS are AAA systems.
- PKI, CA, X.509 certificates used in HTTPS, SSH, smart cards, and passports.
## Network Security
- WLAN security: WEP < WPA < WPA2 < WPA3; enterprise auth uses 802.1X/EAP.
- Firewalls: packet, stateful, NAT, proxy; IDS/IPS detect threats via signatures/triggers.