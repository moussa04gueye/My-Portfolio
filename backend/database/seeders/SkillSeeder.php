<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            ['name' => 'Python', 'category' => 'langage', 'level' => 5],
            ['name' => 'JavaScript', 'category' => 'langage', 'level' => 4],
            ['name' => 'Java', 'category' => 'langage', 'level' => 5],
            ['name' => 'MySQL', 'category' => 'base de données', 'level' => 5],
            ['name' => 'Keycloak', 'category' => 'securite', 'level' => 3],
            ['name' => 'SQLServer', 'category' => 'base de données', 'level' => 5],
            ['name' => 'OpenSSL', 'category' => 'securite', 'level' => 4],
            ['name' => 'Angular', 'category' => 'framework', 'level' => 4],
            ['name' => 'Bash', 'category' => 'langage', 'level' => 4],
            ['name' => 'C', 'category' => 'langage', 'level' => 5],
            ['name' => 'PHP', 'category' => 'langage', 'level' => 4],
            ['name' => 'PowerShell', 'category' => 'outil', 'level' => 4],
            ['name' => 'Laravel', 'category' => 'framework', 'level' => 5],
            ['name' => 'HTML / CSS', 'category' => 'framework', 'level' => 5],
            ['name' => 'Bootstrap', 'category' => 'framework', 'level' => 4],
            ['name' => 'Linux (RHEL, Ubuntu, Debian)', 'category' => 'systeme', 'level' => 5],
            ['name' => 'Windows Server', 'category' => 'systeme', 'level' => 5],
            ['name' => 'TCP/IP & Réseaux', 'category' => 'reseaux', 'level' => 5],
            ['name' => 'SSH / DNS / DHCP', 'category' => 'reseaux', 'level' => 5],
            ['name' => 'Wazuh', 'category' => 'securite', 'level' => 5],
            ['name' => 'Elastic Stack (ELK)', 'category' => 'securite', 'level' => 3],
            ['name' => 'Suricata', 'category' => 'securite', 'level' => 5],
            ['name' => 'TheHive / MISP', 'category' => 'securite', 'level' => 5],
            ['name' => 'Cortex XDR', 'category' => 'securite', 'level' => 5],
            ['name' => 'Docker', 'category' => 'devops', 'level' => 5],
            ['name' => 'Jenkins', 'category' => 'devops', 'level' => 4],
            ['name' => 'GitLab CI/CD', 'category' => 'devops', 'level' => 3],
            ['name' => 'Shuffle', 'category' => 'devops', 'level' => 5],
            ['name' => 'Grafana / Prometheus', 'category' => 'devops', 'level' => 4],
            ['name' => 'SonarQube', 'category' => 'devops', 'level' => 3],
            ['name' => 'Git', 'category' => 'outil', 'level' => 4],
            ['name' => 'Machine Learning', 'category' => 'autre', 'level' => 2],
             ['name' => 'Analyse SI(modelisation)', 'category' => 'Outil', 'level' => 5],
        ];

        foreach ($skills as $i => $skill) {
            Skill::updateOrCreate(
                ['name' => $skill['name']],
                [...$skill, 'order' => $i]
            );
        }
    }
}