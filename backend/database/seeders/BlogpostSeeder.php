<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => '10 commandes de base Linux',
                'excerpt' => "Les 10 commandes essentielles à connaître pour bien démarrer avec l'administration Linux.",
                'content' => <<<'TXT'
Quand on débute l'administration système sous Linux, quelques commandes reviennent constamment. En voici 10 à maîtriser en priorité.

1. ls — Liste le contenu d'un répertoire. Avec les options -l (format détaillé) et -a (fichiers cachés inclus), c'est la commande la plus utilisée au quotidien.

2. cd — Permet de se déplacer entre les répertoires. cd .. remonte d'un niveau, cd ~ ramène au répertoire personnel.

3. pwd — Affiche le chemin complet du répertoire courant, utile pour se repérer rapidement dans l'arborescence.

4. cat — Affiche le contenu d'un fichier directement dans le terminal. Pratique pour consulter rapidement un fichier de configuration ou un log.

5. grep — Recherche du texte dans un ou plusieurs fichiers. Combiné à d'autres commandes via un pipe (|), c'est un outil incontournable pour filtrer des logs ou des sorties de commandes.

6. chmod — Modifie les permissions d'un fichier ou d'un répertoire (lecture, écriture, exécution). Essentiel pour la sécurisation des accès.

7. chown — Change le propriétaire (et le groupe) d'un fichier ou d'un répertoire, souvent utilisé en complément de chmod.

8. ps — Affiche les processus en cours d'exécution. Avec aux, on obtient une vue complète de tous les processus du système.

9. systemctl — Gère les services système (démarrage, arrêt, statut, activation au boot). Indispensable sur les distributions utilisant systemd (Ubuntu, RHEL, Debian récents).

10. df — Affiche l'espace disque utilisé et disponible sur les différents systèmes de fichiers montés. L'option -h rend la sortie plus lisible (Go, Mo).

Maîtriser ces dix commandes couvre déjà une grande partie des besoins quotidiens en administration système, et constitue une base solide avant d'aller plus loin (scripting Bash, gestion des utilisateurs, automatisation).
TXT,
                'tags' => ['Linux', 'Administration', 'DevOps', 'Outils', 'Astuces'],
                'published_at' => now()->toDateString(),
            ],
        ];

        foreach ($posts as $data) {
            $tagNames = $data['tags'] ?? [];
            $imageAsset = $data['image_asset'] ?? null;
            unset($data['tags'], $data['image_asset']);

            if ($imageAsset) {
                $assetPath = database_path("seeders/assets/{$imageAsset}");
                if (file_exists($assetPath) && config('filesystems.disks.cloudinary')) {
                    try {
                        $data['cover_image'] = Storage::disk('cloudinary')->putFileAs(
                            'blog/covers',
                            new File($assetPath),
                            Str::slug($data['title'])
                        );
                    } catch (\Throwable $e) {
                        // Cloudinary pas encore configuré ou erreur réseau : on continue sans image.
                    }
                }
            }

            $post = BlogPost::updateOrCreate(
                ['slug' => Str::slug($data['title'])],
                [...$data, 'status' => 'published']
            );

            $tagIds = collect($tagNames)->map(
                fn ($name) => Tag::firstOrCreate(['name' => $name], ['slug' => Str::slug($name)])->id
            );
            $post->tags()->sync($tagIds);
        }
    }
}