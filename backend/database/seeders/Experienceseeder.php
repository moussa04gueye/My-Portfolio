<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        Experience::updateOrCreate(
            ['title' => 'Administrateur système et Sécurité (Junior)', 'company' => 'La Poste Sn'],
            [
                'location' => 'Dakar',
                'start_date' => '2025-09-01',
                'end_date' => '2025-12-31',
                'type' => 'stage',
                'order' => 0,
                'description' => <<<'TXT'
Analyste SOC : analyse des logs (SIEM), détection et réponse aux incidents (EDR), threat intelligence, investigation. Outils utilisés : Wazuh, Elastic Stack (ELK), Cortex XDR, MISP, TheHive, Suricata, Yara, Sysmon, Auditd, VirusTotal.

Infrastructure réseau et services : mise en place d'un serveur de messagerie Postfix sécurisé sous Linux, déploiement d'un réseau intégrant SSH (clé publique), DHCP, DNS, HTTP/HTTPS et une application CRUD, configuration réseau avec Cisco Packet Tracer.

Administration système (Linux, Windows) : gestion des utilisateurs, permissions et stockage, surveillance des logs/ports/services, sécurisation des accès SSH par clé publique, mise en place d'une infrastructure Windows Server.

Développement web : interface web et site d'inscription des étudiants (HTML, CSS, Bootstrap, MySQL, PHP, Laravel, Java).

DevOps : intégration et déploiement continus, conteneurisation, surveillance d'applications avec Jenkins, GitLab, Docker, Nexus, Grafana, Prometheus, Node Exporter, Alertmanager, Keycloak, SonarQube.
TXT,
            ]
        );
    }
}