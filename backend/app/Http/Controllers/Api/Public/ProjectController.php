<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::query()
            ->where('status', 'published')
            ->with(['skills', 'images'])
            ->when($request->boolean('featured'), fn ($q) => $q->where('is_featured', true))
            ->orderBy('order')
            ->latest()
            ->get();

        return ProjectResource::collection($projects);
    }

    public function show(string $slug)
    {
        $project = Project::query()
            ->where('slug', $slug)
            ->where('status', 'published')
            ->with(['skills', 'images'])
            ->firstOrFail();

        return new ProjectResource($project);
    }
}