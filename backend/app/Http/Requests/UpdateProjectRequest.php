<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'summary' => ['sometimes', 'required', 'string', 'max:500'],
            'description' => ['sometimes', 'required', 'string'],
            'stack' => ['nullable', 'array'],
            'stack.*' => ['string'],
            'repo_url' => ['nullable', 'url'],
            'demo_url' => ['nullable', 'url'],
            'cover_image' => ['nullable', 'image', 'max:4096'],
            'is_featured' => ['boolean'],
            'order' => ['integer'],
            'status' => ['sometimes', 'required', 'in:draft,published'],
            'skill_ids' => ['nullable', 'array'],
            'skill_ids.*' => ['exists:skills,id'],
        ];
    }
}