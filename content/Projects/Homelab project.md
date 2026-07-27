---
topic:
date: 2026-07-03
course:
tags:
  - projects/personal
aliases:
  - home labbing
  - home lab
  - homelab
draft: false
---
## Infrastructure

### HP Z420
14/4/26
I have purchased an old HP Z420 workstation and flashed it with proxmox, I am still deciding what I want to do with it. It may be useful to practice containers and docker for my [[R&D Project]], aswell as various cybersecurity labs in the future.
**Specs**
- CPU: Intel Xeon 2689 V1 8C 16T Base 2.6G
- RAM: 32gb DDR3 1333mhz ECC 
- SSD: 240gb 
- HDD: 1tb
- GPU: Quadro K500 4gb
- PSU: 600w

## Setup

I currently have my Z420 on my desk next to me, and I am sharing one ethernet port with my main computer (which has wifi thankfully). I will need to buy a switch in the future.

### Proxmox Setup
3/7/26
### First round of VM's for an AD environment

3 total VM's.
![[Pasted image 20260703181115.png]]

| Device              | vCPU | Memory | Disk (all dynamic provisioning) |
| ------------------- | ---- | ------ | ------------------------------- |
| Windows Server 2025 | 4    | 6gb    | 80gb                            |
| Windows 11          | 4    | 6gb    | 60gb                            |
| Kali Box            | 4    | 8gb    | 40gb                            |

### VM Addition

My [[R&D]] project uses a docker dev container to develop our code, which was consistently taking up 50% of my 16gb of precious ram, rendering my workflow heavily impeded. 

The solution? Offload that container to my server, which day to day wasn't getting all that much use.

It was easier than expected to create the VM, and install remote-ssh in vscode to access it remotely The hard part was troubleshooting an error that I kept getting when trying to spin up the dev container; the mongodb instance wasn't playing nice with the version of linux the server was running, and simply wouldn't start. In the end, it was solvable with the addition of an obscure environment variable in the docker config.

Lastly, I wanted to be able to access the server remotely. Whether that be from university, at a friends house, or at the top of the Sky Tower. I decided to go with Tailscale, which made connecting to my proxmox interface from anywhere, easy.

