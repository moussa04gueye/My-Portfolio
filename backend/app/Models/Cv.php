<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cv extends Model
{
    protected $fillable = ['file_path', 'label', 'is_active', 'uploaded_at'];

    protected $casts = [
        'is_active' => 'boolean',
        'uploaded_at' => 'datetime',
    ];
}
