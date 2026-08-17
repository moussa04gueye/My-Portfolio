<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'summary' => $this->summary,
            'description' => $this->description,
            'stack' => $this->stack ?? [],
            'repo_url' => $this->repo_url,
            'demo_url' => $this->demo_url,
            'cover_image' => $this->cover_image ? Storage::disk('public')->url($this->cover_image) : null,
            'is_featured' => $this->is_featured,
            'status' => $this->status,
            'skills' => SkillResource::collection($this->whenLoaded('skills')),
            'images' => ProjectImageResource::collection($this->whenLoaded('images')),
            'created_at' => $this->created_at,
        ];
    }
}
