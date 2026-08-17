<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        return TagResource::collection(Tag::orderBy('name')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:tags,name'],
        ]);

        return new TagResource(Tag::create($data));
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return response()->json(['message' => 'Tag supprimé.']);
    }
}