---
topic:
date: "2026-05-27"
course:
tags:
aliases:
draft: true
---
# Content

Lecture 1: Introduction and Classical Ciphers
1. Security triads -- CIA nRAF
2. Kerchoffs's principle
3. Substitution ciphers -- mono alphabetic
- Monoalphabetic - Caesar's
- Polyalphabetic -- Vignere, Enigma
4. Transposition ciphers -- rail fence, permutation ciphers
5. Attacks on ciphers -- Cryptanalysis
- Frequency analysis attacks on mon-alphabetic substitution
- Brute force
6. Principle of modern ciphers -- confusion, diffusion
Lecture 2: Modulo arithmetic
7. Modular arithmetic
- modulo operations for addition, multiplication
- equivalence class
2. Groups have one operation: additive or multiplicative
Axioms: has closure, is associative, has a neutral (identity element):
3. Fields are groups with two operations.
4. Application in Affine cipher, Hill cipher
5. Finding multiplicative inverse modulo n.
- existence of multiplicative inverse: a-1 mod n exist only if gcd(a,n)=1
- Finding gcd:
- Euclidean algorithm,
- extended Euclidean algorithm
- Finding multiplicative inverse modulo m
Lecture 3: Stream ciphers and Block cipher modes
1. Stream cipher -
- XOR operations,
- OTP, security based on long, random non-repeating key stream
2. Keystream generation methods
- LFSR operations, block cipher in OFB, CTR mode, CSPRNG
3. Block cipher modes
- ECB, CBC, OFB, CFB, CTR
- Use of OFB, CTR nodes for key stream
- operations, uses
Lecture 4: Symmetric Key Ciphers – DES
1. Basic principles: confusion and diffusion,
2. DES algorithm
- operation -- permutations, Fiestal network, S-boxes, key schedule
- Security of DES, key size is 56 bits
3. 3DES - operation, effective key size approx 112 bits, security features
- meet-inside attack
Lecture 5: AES cipher
1. Uses multiplication, addition operations on blocks of 8-bit data (byte)
Requires multiplicative and additive group with 8-bit elements
- use the extension field GF(28)
- represent 8-bit data as polynomials in GF(28)
Polynomial arithmetic modulo an irreducible polynomial mod P(x)
- addition of elements in GF(28) mod P(x)
- multiplication of elements in GF(28) mod P(x)
2. AES algorithm
- operations: key schedule, key addition, byte substitution S-box, diffusion layer operations
- AES security, key sizes
- Implementations using hardware or software.
Lecture 6: Hash Functions
1. Protecting Integrity
2. Properties of cryptographic hash functions
- one wayness (pre-image resistance): cannot reverse
- Second preimage resistance (weak collision resistance): finding one specific collision pair
- Strong collision resistance: finding any collision pair
- Other properties -- easy to compute, fixed length output, avalanche effect
3. Birthday attack, applied to hashes: resistance is 2n/2
4. Hash from block ciphers
5. MD5, SHA-1 hash functions
6. Storing passwords, use of 'salt'
7. Protecting message integrity using hash functions
8. Protecting message integrity and authenticity using shared key and:
MAC – using encryption
HMAC – using hash
Lecture 7: Asymmetric Key cryptography -- RSA
9. Asymmetric key operation
- private key, public key, encryption algorithm, decryption algorithm
2. One way function, trap door function
3. Some number theory :
- basic concepts: prime, relatively prime, co-prime
- Euler's totient function, Euler's theorem
- Fermat's Little theorem
- Chinese Remainder Theorem
4. RSA algorithm
- choosing primes p, q
- calculating totient function
- computing private and public keys
- encryption and decryption process
5. RSA implementation and security
- square-and-multiply
- finding large primes
- security basis for RSA
- attacks on RSA
6. RSA applications
- Key exchange (transport)
- Digital signature (non-repudiation)
Lecture 8: Asymmetric Key cryptography -- DH and ECDH
1. DH basic principles
DH for key agreement
2. Elgamal scheme for encryption
3. Security of DH scheme
- Discrete Log Problem (DLP)
4. Elliptic curves
- Points on the elliptic curve -- additive group
- Point addition (scalar point multiplication)
5. ECDH algorithm
- key exchange
- security -- EC DLP
6. Comparison between RSA and DH algorithms
7. MiTM attacks
Lecture 9: PKC applications and Digital signatures
8. Session Key exchange
9. Digital signature -- provide integrity, authenticity, and non-repudiation
10. RSA signature
11. Elgamal signature scheme
12. DSA signature
13. ECDSA
14. Comparison between symmetric and asymmetric crypto algorithm, speed, key sizes, etc.
15. Application in crypto currency – bitcoin transactions
Lecture 10: System Security
16. AA -- definitions
- AAA servers: Kerberos, RADIUS,
- Authentication -- mechanisms
2. Key Distribution Centres
- KDC operations
- KDC implementation -- Kerberos
3. Digital Certificates
- Public Key Infrastructure
- Certificate Authorities
- X509 v3 certificates
4. Certificate applications
SSH
HTTPS
Electronic passports
Smart cards
Lecture 11: Network Security
5. Access to Networks
- Wired networks, Wireless networks
2. Access to WLANs -- MAC filtering, device authentication
3. Device authentication
- Open access (no authentication at all)
- Personal/home: PSK
- Enterprise: 802.1x using username password
-- authentication server, authenticator, supplicant
4. Authentication protocols
- EAP
- EAP-TLS, EAP-TTLS, PEAP
5. Wireless Security -- protection for CIA
WEP -- Stream cipher, 24 bits IV, CRC for integrity
WPA -- termporary fix for WEP
Uses Temporal Key Integrity Protocol (TKIP) -- unique session
-- unique session keys
-- 48 bit IV,
-- uses MIC for integrity
WPA2 -- uses AES-CBC-MAC: provides encryption, authentication and integrity
-- Personal: encryption key derived from shared password, SSID, nonces
-- Enterprise: encryption key derived from user password
-- Open access -- not encryption, no authentication.
WPA3 -- uses ECDH for key establishment between AP and supplicant (wireless device)
-- Personal: handshake establishes session key using ECH
authentication, session key parameters (nonces, challenge, response) are
encrypted
allows for simple easy to remember pre-shared password (passphrase)
provides for perfect forward secrecy (pfs)
-- Enterprise uses 802.1x
ECDH used for key establishment
min 192 bit keys, 384 bit hash, 384 bit ECDH
-- Open WiFi has Opportunistic Wireless Encryption (OWE)
ECDH used to obtain a shared key for encryption
No authentication
6. Firewalls and Intrusion Prevention/Detection
- Packet filters,
- Stateful firewalls,
- NAT firewalls, and Proxy firewalls
- IPS and IDS - Network based, host based IPS
- signatures, triggers, actions.