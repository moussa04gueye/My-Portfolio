<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('tags')->latest()->get();

        return BlogPostResource::collection($posts);
    }

    public function store(StoreBlogPostRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('blog/covers', 'public');
        }

        $post = BlogPost::create($data);

        if (! empty($data['tag_ids'])) {
            $post->tags()->sync($data['tag_ids']);
        }

        return new BlogPostResource($post->load('tags'));
    }

    public function show(BlogPost $blog)
    {
        return new BlogPostResource($blog->load('tags'));
    }

    public function update(UpdateBlogPostRequest $request, BlogPost $blog)
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            if ($blog->cover_image) {
                Storage::disk('public')->delete($blog->cover_image);
            }
            $data['cover_image'] = $request->file('cover_image')->store('blog/covers', 'public');
        }

        $blog->update($data);

        if (array_key_exists('tag_ids', $data)) {
            $blog->tags()->sync($data['tag_ids'] ?? []);
        }

        return new BlogPostResource($blog->fresh('tags'));
    }

    public function destroy(BlogPost $blog)
    {
        if ($blog->cover_image) {
            Storage::disk('public')->delete($blog->cover_image);
        }
        $blog->delete();

        return response()->json(['message' => 'Article supprimé.']);
    }
}