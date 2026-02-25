---
tags:
  - TryHackMe
  - personal
modified: 04-02-2026 15:02
---

![[Pasted image 20260112211720.png]]
https://tryhackme.com/room/layer2
#### Navigation
[[#Background]] 
[[#Commands]] 
[[#General Knowledge Learnt |Info]]
[[#Passive Network Sniffing - Task 4|Task 4]]  [[#Task 5 Sniffing While Mac flooding|Task 5]]  [[#Task 6 MITM ARP Posioning|Task 6]]   [[#Task 7 ARP Posioning without host precautions|Task 7]]   [[#Task 8 - Fully fledged MITM|Task 8]]

#### Background
![[Pasted image 20260112214237.png]]

SSH Into vulnerable endpoint

``` bash
ssh admin@10.67.145.211 -p 22
pass: Layer2
```

Upgrade to root user

```bash
sudo su -
pass: Layer2
```


### Commands
[[#Navigation |Home]]

| Host Discovery (Ping Scan) | Identifies which hosts are online without performing a full port scan. | `nmap -sn 192.168.1.0/24`     |
| -------------------------- | ---------------------------------------------------------------------- | ----------------------------- |
| Host Details               | Nmap full scan aggressive, contains all details e.g host (-O) etc      | ``nmap -A<br>192.168.1.0/24`` |
|                            |                                                                        | ettercap -A -i                |
|                            |                                                                        |                               |
Must use /24 prefix to scan all the hosts (255) - (-sn flag to skip the port scan for each host)
Must run as sudo

First, have a look at the adapter:  

`ip address show eth1` or the shorthand version: `ip a s eth1` -- show only one interface out of the ip a range of interfaces



### General Knowledge Learnt
[[#Navigation |Home]]
**CIDR** - prefix - routing protocol - (Classless Inter-Domain Routing) - /24
**Ettercap** - mitm 
**tcpdump** - packet sniffing on particular interface
**SCP** - secure copy protocol - copy files to and from remote and local 
**Reverse Shell** - method of remote access that is different from the norm by "reverseing" the typical connection model. Used to bypass firewalls, because they usually restrict incoming traffic more than outgoing. Initiated by exploting the target machine to estabilish a connection to the attacking machine, instead of the attacker trying to connect to the target. 


### Passive Network Sniffing - Task 4
[[#Navigation |Home]] [[#Task 5 Sniffing While Mac flooding|Next]]
**Q1 and 2:**
Running **tcpdump** on the **eth1** network interface:
`tcpdump -i eth1`

*Used to dump all packets captured on that interface we can see ICMP packets coming from eve (machine we are one) and bob (192.168.12.2)*
![[Pasted image 20260112221046.png]]

Optionally, for a more verbose output that prints each packet (minus its link level header) in ASCII format:
`tcpdump -A -i eth1   `


**Q3 and 4:**
We can redirect them into a **pcap** file providing a destination file via the **-w** argument:

`tcpdump -A -i eth1 -w /tmp/tcpdump.pcap`
*Save to local file on target host*

Capture traffic for about a minute, then transfer the pcap to either your machine or the AttackBox to open it in Wireshark.

Example to transfer the packet capture using **scp** and open it in Wireshark:

`scp admin@10.67.145.211:/tmp/tcpdump.pcap .   wireshark tcpdump.pcap`

*Use this command in your own machine to open in kali wireshark*

![[Pasted image 20260112221526.png| 1000]]

Size of data section = 666 bytes 

#### Task 5: Sniffing While Mac flooding
[[#Navigation |Home]] [[#Task 6 MITM ARP Posioning|Next]]
Flooding the switch with macof
![[Pasted image 20260113110519.png]]

Sniffing while mac flooding 
flood the switch on one ssh connection
and sniff the packets on antoher
![[Pasted image 20260113110634.png]]

Transfer the sniffed packet capture file to your main machine, using Secure Copy Protocol (SCP)

![[Pasted image 20260113111015.png]]

Transfer VIA scp - then open wireshark with that file


Then analyse the packet capture file to find out what kind of packets *alice* is sending to *bob* (which we should not normally be able to see as *eve*)
![[Pasted image 20260113114100.png]]
We can see alice 192.168.2.1 trying to ping bob  192.168.2.2 continusouly to no reply

And bob try to ping eve 192.168.2.66 with a reply

However this packet capture file is very big, and hard to comb through. Mac flooding is a real noisy technique, and easily detectable. 
#### Task 6: MITM: ARP Posioning
[[#Navigation |Home]] [[#Task 7 ARP Posioning without host precautions|Next]]

ARP cache posioning is the next technique, where we spoof frames pretending to be a certain mac address e.g alice or bob, to try and get our IP address associated with that mac , so we can intercept all their traffic.
```bash
ettercap -T -i eth1 -M arp
```
![[Pasted image 20260113114937.png]]
![[Pasted image 20260113114953.png]]

Host has ARP cache validation - so we are unable to access the other hosts packets
evident in the screenshot above just showing the traffic to and from our host.
#### Task 7: ARP Posioning without host precautions
[[#Navigation|Home]] [[#Task 8 - Fully fledged MITM|Next]]

This task is a different machine where bob and alice have a different OS e.g ubuntu
And the switch has ARP DAI disabled - dynamic arp inspection - meaning we can posion it better and actually receive all the traffic.

Login and scan network with ``nmap -sN 192.168.12.66/24``

![[Pasted image 20260113115621.png]]



Discover open ports on the hosts using

```bash
nmap -O 192.168.12.20 -p-6000 // meaning scan aggressively all ports up to 6000
nmap -O 192.168.12.10 -p-6000 
```

output
![[Pasted image 20260113120219.png]]
Port 80 open on 192.168.12.20 "bob" - web service port (HTTP)

![[Pasted image 20260113120232.png]]

packet sniffing command
-A flag: 
-i flag:
-eth1: interface to sniff on
-w flag: write to this location 
-/tmp/tcpdump2.pcap: location 
```
tcpdump -A -i eth1 -w /tmp/tcpdump2.pcap
```
new ip to copy over sniffed pcap
``` bash
scp admin@10.67.167.99:/tmp/tcpdump.pcap .
wireshark tcpdump.pcap
```
I was able to inspect this in wireshark and notice three key things:
HTTP GET requests from alice 
HTTP 200 Ok response from server (bob)
HTTP GET request had credentials in plaintext, that alice was using to authenticate with bob and read txt files
```
admin:s3cr3t_P4zz
```

and managed to figure out eventually that this estabilished a tcp connection for alice, that enabled her to have  a  "reverse shell" on the webserver, evident by the traffic to alice - "ls, whoami, pwd, "root"" 

I was able to use the credientials to find the flag in user.txt, after seeing that alice had run "ls" on the server, displaying user.txt
 
![[Pasted image 20260113122834.png]]





####  Task 8 - Fully fledged MITM
[[#Navigation|Home]] [[#Task 7 ARP Posioning without host precautions|Previous]]











