<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::query()
            ->where('status', 'published')
            ->with('tags')
            ->latest('published_at')
            ->paginate(9);

        return BlogPostResource::collection($posts);
    }

    public function show(string $slug)
    {
        $post = BlogPost::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->with('tags')
            ->firstOrFail();

        return new BlogPostResource($post);
    }
}