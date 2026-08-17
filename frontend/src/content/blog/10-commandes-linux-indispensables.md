---
title: "10 commandes Linux indispensables pour admins systèmes"
slug: "10-commandes-linux-indispensables"
date: "2026-08-17"
tags: [Linux, Administration, DevOps, Outils, Astuces]
summary: "10 commandes pratiques, exemples et cas d'usage pour administrer efficacement des serveurs Linux."
---

TL;DR
Un rappel rapide des 10 commandes à connaître : `ssh`, `top`/`htop`, `journalctl`, `systemctl`, `ss`, `df`/`du`, `ps`/`kill`, `grep` (avec `awk`/`sed`), `rsync`, `tar`.

## Introduction

En administration système, maîtriser quelques commandes permet de diagnostiquer, corriger et automatiser rapidement. Voici 10 commandes essentielles avec exemples concrets et bonnes pratiques.

## 1) `ssh` — accès distant sécurisé

- Usage : se connecter à une machine distante.

```bash
ssh -A -o ServerAliveInterval=60 user@server.example.com
```

Astuce : activer l’agent (`ssh-agent`) pour forwarding, désactiver le mot de passe côté serveur (keys only).

## 2) `top` / `htop` — supervision en temps réel

- `top` (installé partout) ; `htop` (plus lisible, interactif).

```bash
top
htop
```

Cas d'usage : CPU, mémoire, processus gourmands. Surveillez les temps de swap et load average.

## 3) `journalctl` — logs système (systemd)

Afficher le journal :

```bash
journalctl -u nginx.service --since "2 hours ago"
journalctl -f               # suivi en temps réel
```

Astuce : combinez avec `-o cat` pour une lecture brute, `--no-pager` pour les scripts.

## 4) `systemctl` — gérer les services (systemd)

Démarrer/arrêter/reloader/status :

```bash
systemctl restart nginx
systemctl status nginx
systemctl enable --now myservice
```

Conseils : utilisez `systemd` unit files pour démarrer des services en production et définissez `Restart=`.

## 5) `ss` — info connexions réseau (remplace `netstat`)

Voir connexions TCP/UDP et ports écoutés :

```bash
ss -tuln
ss -s          # résumé des sockets
ss -tp         # processus associés
```

Astuce : filtrer par port ou adresse pour diagnostiquer écoute et firewall.

## 6) `df` / `du` — espace disque

- `df -h` (espace des systèmes de fichiers), `du -sh` (taille d’un répertoire) :

```bash
df -h
du -sh /var/log
du -ah /var/log | sort -rh | head -n 20
```

Cas réel : identifier gros fichiers qui remplissent `/var`.

## 7) `ps` / `kill` / `pgrep` — gestion des processus

Trouver et tuer :

```bash
ps aux | grep myapp
pgrep -fl java
kill -15 <pid>   # SIGTERM propre
kill -9 <pid>    # SIGKILL si nécessaire
```

Astuce : préférez `pkill -f` avec prudence ; vérifiez `strace -p <pid>` pour diagnostiquer.

## 8) `grep` / `awk` / `sed` — recherche et extraction dans les fichiers

Exemples :

```bash
grep -R --line-number "ERROR" /var/log
awk '{print $5}' access.log | sort | uniq -c | sort -rn
sed -n '1,200p' file.conf
```

Utilité : parsing rapide, scripts d’automatisation et monitoring.

## 9) `rsync` — synchronisation & sauvegarde efficace

Copier efficacement avec compression et lien :

```bash
rsync -avz --delete --numeric-ids /var/www/ backup:/backups/www/
```

Astuce : utilisez `--link-dest` pour snapshots incrémentaux, `--bwlimit` pour limiter la bande passante.

## 10) `tar` — archivage et compression

Créer / extraire archives :

```bash
tar -caf backup-$(date +%F).tar.gz /etc /var/www
tar -xvf archive.tar.gz -C /tmp
```

Combinez avec `pigz` (parallélisation) pour grosses archives.

## Bonnes pratiques transverses

- Toujours tester en staging avant prod.
- Automatiser sauvegardes et vérifier leur intégrité régulièrement.
- Limiter le `sudo` et auditer les accès.
- Documenter les commandes et procédures dans un README ops.

## Petites commandes utiles

- Trouver fichiers modifiés récemment : `find /var/www -type f -mtime -7`
- Vérifier disque I/O : `iostat -xz 1` (ou `iotop` si disponible)
- Rechercher processus consommant mémoire : `ps aux --sort=-%mem | head`

## Conclusion & next steps

Commence par mémoriser 3–4 commandes qui correspondent à ton quotidien (logs, services, disque), puis ajoute une nouvelle commande par semaine.

Si tu veux, je peux :
- générer un PDF / cheat-sheet imprimable,
- ajouter des extraits de commandes à la version HTML du blog,
- créer un repo GitHub associé et lier le post.


<!-- End of post -->
