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
TXT,
            ],
             ['title' => 'Analyste SOC/Sécurité ', 'company' => 'La Poste Sn'],
            [
                'location' => 'Dakar',
                'start_date' => '2026-03-02',
                'end_date' => '2026-08-31',
                'type' => 'stage',
                'order' => 0,
                'description' => <<<'TXT'
Stagiaire en Sécurité des Systèmes d'Informations . Membre des responsables charger de la mise en place d'un SOC Interne Robuste . analyse des logs (SIEM), détection et réponse aux incidents (EDR), threat intelligence, investigation. Outils utilisés : Wazuh, Elastic Stack (ELK), Cortex XDR, MISP, TheHive, Suricata, Yara, Sysmon, Auditd, VirusTotal.......
TXT,
            ]


        );
    }
}
