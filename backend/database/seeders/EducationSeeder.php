<?php

namespace Database\Seeders;

use App\Models\Education;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    public function run(): void
    {
        Education::updateOrCreate(
            ['school' => 'UCAD', 'degree' => 'Licence 3 Mathématiques, Cryptographie et Sécurité'],
            [
                'field' => 'Transmission des Données et Sécurité de l\'Information (TDSI)',
                'start_date' => '2023-10-01',
                'end_date' => null,
                'order' => 0,
                'description' => 'Filière d\'excellence axée sur la sécurité informatique avancée, la cryptographie, l\'architecture réseau et l\'automatisation des systèmes.',
            ]
        );
    }
}
