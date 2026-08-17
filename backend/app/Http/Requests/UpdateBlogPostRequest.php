<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'excerpt' => ['sometimes', 'required', 'string', 'max:500'],
            'content' => ['sometimes', 'required', 'string'],
            'cover_image' => ['nullable', 'image', 'max:4096'],
            'status' => ['sometimes', 'required', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
            'tag_ids' => ['nullable', 'array'],
            'tag_ids.*' => ['exists:tags,id'],
        ];
    }
}
