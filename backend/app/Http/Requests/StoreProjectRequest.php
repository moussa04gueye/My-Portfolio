<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // déjà filtré par le middleware admin sur la route
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'max:500'],
            'description' => ['required', 'string'],
            'stack' => ['nullable', 'array'],
            'stack.*' => ['string'],
            'repo_url' => ['nullable', 'url'],
            'demo_url' => ['nullable', 'url'],
            'cover_image' => ['nullable', 'image', 'max:4096'],
            'is_featured' => ['boolean'],
            'order' => ['integer'],
            'status' => ['required', 'in:draft,published'],
            'skill_ids' => ['nullable', 'array'],
            'skill_ids.*' => ['exists:skills,id'],
        ];
    }
}
