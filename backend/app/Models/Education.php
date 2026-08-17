<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = 'education';

    protected $fillable = [
        'school', 'degree', 'field', 'start_date', 'end_date', 'description', 'order',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];
}