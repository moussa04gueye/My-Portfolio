<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Seeder;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => "Création d'un site web pour l'entreprise SAS",
                'summary' => "Dans ce projet j'ai pu réaliser un site pour un partenaire afin de renforcer sa visibilité dans le monde entier.",
                'description' => "Dans ce projet j'ai pu réaliser un site pour un partenaire afin de renforcer sa visibilité dans le monde entier.",
                'stack' => ['HTML / CSS', 'Bootstrap', 'SSH / DNS / DHCP'],
                'skills' => ['HTML / CSS', 'Bootstrap', 'SSH / DNS / DHCP'],
                'is_featured' => true,
                'order' => 0,
                'image_asset' => 'sas-website.jpg', 
            ],
            [
                'title' => 'Serveur de Messagerie',
                'summary' => "Réalisation d'un projet de mise en place d'un serveur de messagerie Postfix amélioré sous Linux (Ubuntu)",
                'description' => "Réalisation d'un projet de mise en place d'un serveur de messagerie Postfix amélioré sous Linux (Ubuntu).",
                'stack' => ['Bash', 'Linux (RHEL, Ubuntu, Debian)', 'TCP/IP & Réseaux','ssh / dns / dhcp'],
                'skills' => ['Bash', 'Linux (RHEL, Ubuntu, Debian)', 'TCP/IP & Réseaux'],
                'is_featured' => true,
                'order' => 1,
                'image_asset' => 'mail-server.jpg',
                'link' => 'https://smartindustry.sn',
            ],
            [
                'title' => 'Authentification Centralisée dans un pipeline CI/CD',
                'summary' => 'Ce projet permet de remédier aux erreurs commises dans les environnements de Dev à cause des mots de passe, tout en veillant à la sécurité des codes.',
                'description' => 'Ce projet permet de remédier aux erreurs commises dans les environnements de Dev à cause des mots de passe, tout en veillant à la sécurité des codes.',
                'stack' => ['Bash', 'Linux (RHEL, Ubuntu, Debian)', 'Windows Server', 'Keycloak', 'Docker', 'Jenkins', 'GitLab CI/CD'],
                'skills' => ['Bash', 'Linux (RHEL, Ubuntu, Debian)', 'Windows Server', 'Keycloak', 'Docker', 'Jenkins', 'GitLab CI/CD'],
                'is_featured' => true,
                'order' => 2,
                'image_asset' => 'cicd-auth.jpg',
            ],
            [
                'title' => 'Chiffrement des données dans une BD relationnelle SQLServer',
                'summary' => 'TDE, Chiffrement au niveau des colonnes et en transit',
                'description' => 'Le chiffrement est une barrière essentielle contre la fuite des données , Il peut être appliqué au repos , en transit ou au niveau des colonnes. Il renforce la sécurité globale  des BD.',
                'stack' => ['SQLServer', 'Cryptographie', 'OpenSSL'],
                'skills' => ['SQLServer', 'Cryptographie', 'OpenSSL'],
                'is_featured' => true,
                'order' => 3,
                'image_asset' => 'sqlserver-encryption.jpg',
            ],
            [
                'title' => 'Détection et réponse aux incidents dans un SOC',
                'summary' => 'Ce projet consiste à mettre en place un SOC pour détecter et répondre aux incidents de sécurité.',
                'description' => 'Ce projet fait en entreprise  consiste à mettre en place un SOC pour détecter et répondre aux incidents de sécurité en utilisant des outils tels que Wazuh, Elastic Stack (ELK), Cortex XDR, MISP, TheHive, Suricata, Yara, Sysmon, Auditd et VirusTotal.',
                'stack' => ['Wazuh', 'Elastic Stack (ELK)', 'Cortex XDR', 'MISP', 'TheHive', 'Suricata', 'Yara', 'Sysmon', 'Auditd', 'VirusTotal'],
                'skills' => ['Wazuh', 'Elastic Stack (ELK)', 'Cortex XDR', 'MISP', 'TheHive', 'Suricata', 'Yara', 'Sysmon', 'Auditd', 'VirusTotal'],
                'is_featured' => true,
                'order' => 4,
                'image_asset' => 'soc-incidents.jpg',
            ],
            [
                'title' => 'Developpement d\'une application web pour la visibilite de vente de meubles',
                'summary' => 'Ce projet consiste à développer une application web pour améliorer la visibilité des ventes de meubles.',
                'description' => 'Ce projet fait en entreprise  consiste à développer une application web pour améliorer la visibilité des ventes de meubles en utilisant des technologies modernes.',
                'stack' => ['html', 'css', 'javascript', 'bootstrap'],
                'skills' => ['html', 'css', 'javascript', 'boostrap'],
                'is_featured' => true,
                'order' => 5,
                'image_asset' => 'furniture-ecommerce.jpg',
                 'link' => 'https://fancy-macaron-90eecd.netlify.app',
            ]
        ];

        foreach ($projects as $data) {
            $skillNames = $data['skills'];
            $imageAsset = $data['image_asset'] ?? null;
            unset($data['skills'], $data['image_asset']);

            // Upload de l'image bundlée dans le dépôt vers Cloudinary (stockage permanent).
            // Le fichier source vient du repo Git (jamais perdu) ; seul l'appel d'upload
            // est refait à chaque seed, ce qui est sans risque et peu coûteux.
            if ($imageAsset) {
                $assetPath = database_path("seeders/assets/{$imageAsset}");
                if (file_exists($assetPath) && config('filesystems.disks.cloudinary')) {
                    try {
                        $data['cover_image'] = Storage::disk('cloudinary')->putFileAs(
                            'projects/covers',
                            new File($assetPath),
                            Str::slug($data['title'])
                        );
                    } catch (\Throwable $e) {
                        // Cloudinary pas encore configuré ou erreur réseau : on continue sans image.
                    }
                }
            }

            $project = Project::updateOrCreate(
                ['slug' => Str::slug($data['title'])],
                [...$data, 'status' => 'published']
            );

            $skillIds = Skill::whereIn('name', $skillNames)->pluck('id');
            $project->skills()->sync($skillIds);
        }
    }
}