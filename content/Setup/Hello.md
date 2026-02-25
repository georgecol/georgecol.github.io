---
tags:
  - Setup
draft: true
---


Testing from Windows Main PC! Again!

SSH agent not working properly on windows machine, make sure it is started in PowerShell.

Changing passphrase - admin mode
```powershell
ssh-keygen -p -f $env:USERPROFILE\.ssh\id_ed25519
```

Left as blank - fixed the push and sync, should be good.