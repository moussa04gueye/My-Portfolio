<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'summary', 'description', 'stack',
        'repo_url', 'demo_url', 'cover_image', 'is_featured', 'order', 'status',
    ];

    protected $casts = [
        'stack' => 'array',
        'is_featured' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (Project $project) {
            if (empty($project->slug)) {
                $project->slug = static::uniqueSlug($project->title);
            }
        });
    }

    public static function uniqueSlug(string $title): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $i = 1;
        while (static::where('slug', $slug)->exists()) {
            $slug = "{$original}-{$i}";
            $i++;
        }
        return $slug;
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->orderBy('order');
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class);
    }
}
