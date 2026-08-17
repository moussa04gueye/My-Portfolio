<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectImageResource;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectImageController extends Controller
{
    public function store(Request $request, Project $project)
    {
        $request->validate([
            'images' => ['required', 'array'],
            'images.*' => ['image', 'max:4096'],
        ]);

        $created = collect($request->file('images'))->map(function ($file, $index) use ($project) {
            $path = $file->store('projects/gallery', 'public');

            return $project->images()->create([
                'path' => $path,
                'order' => $index,
            ]);
        });

        return ProjectImageResource::collection($created);
    }

    public function destroy(ProjectImage $image)
    {
        Storage::disk('public')->delete($image->path);
        $image->delete();

        return response()->json(['message' => 'Image supprimée.']);
    }
}