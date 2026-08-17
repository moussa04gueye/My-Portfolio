<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            // Langages
            ['name' => 'Python', 'category' => 'langage', 'level' => 4],
            ['name' => 'Bash', 'category' => 'langage', 'level' => 4],
            ['name' => 'C', 'category' => 'langage', 'level' => 3],
            ['name' => 'PHP', 'category' => 'langage', 'level' => 3],
            ['name' => 'PowerShell', 'category' => 'langage', 'level' => 3],

            // Frameworks / Web
            ['name' => 'Laravel', 'category' => 'framework', 'level' => 3],
            ['name' => 'HTML / CSS', 'category' => 'framework', 'level' => 3],
            ['name' => 'Bootstrap', 'category' => 'framework', 'level' => 3],

            // Administration systèmes & réseaux
            ['name' => 'Linux (RHEL, Ubuntu, Debian)', 'category' => 'systeme', 'level' => 4],
            ['name' => 'Windows Server', 'category' => 'systeme', 'level' => 3],
            ['name' => 'TCP/IP & Réseaux', 'category' => 'systeme', 'level' => 4],
            ['name' => 'SSH / DNS / DHCP', 'category' => 'systeme', 'level' => 4],

            // Sécurité / SOC
            ['name' => 'Wazuh', 'category' => 'securite', 'level' => 3],
            ['name' => 'Elastic Stack (ELK)', 'category' => 'securite', 'level' => 3],
            ['name' => 'Suricata', 'category' => 'securite', 'level' => 3],
            ['name' => 'TheHive / MISP', 'category' => 'securite', 'level' => 3],
            ['name' => 'Cortex XDR', 'category' => 'securite', 'level' => 2],

            // DevOps
            ['name' => 'Docker', 'category' => 'devops', 'level' => 3],
            ['name' => 'Jenkins', 'category' => 'devops', 'level' => 3],
            ['name' => 'GitLab CI/CD', 'category' => 'devops', 'level' => 3],
            ['name' => 'Shuffle', 'category' => 'devops', 'level' => 3],
            ['name' => 'Grafana / Prometheus', 'category' => 'devops', 'level' => 3],
            ['name' => 'SonarQube', 'category' => 'devops', 'level' => 2],
            ['name' => 'Git', 'category' => 'outil', 'level' => 4],

            // En cours d'apprentissage
            ['name' => 'Machine Learning', 'category' => 'autre', 'level' => 1],
        ];

        foreach ($skills as $i => $skill) {
            Skill::updateOrCreate(
                ['name' => $skill['name']],
                [...$skill, 'order' => $i]
            );
        }
    }
}