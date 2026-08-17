<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::query()
            ->with(['skills', 'images'])
            ->orderBy('order')
            ->latest()
            ->get();

        return ProjectResource::collection($projects);
    }

    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('projects/covers', 'public');
        }

        $project = Project::create($data);

        if (! empty($data['skill_ids'])) {
            $project->skills()->sync($data['skill_ids']);
        }

        return new ProjectResource($project->load(['skills', 'images']));
    }

    public function show(Project $project)
    {
        return new ProjectResource($project->load(['skills', 'images']));
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            if ($project->cover_image) {
                Storage::disk('public')->delete($project->cover_image);
            }
            $data['cover_image'] = $request->file('cover_image')->store('projects/covers', 'public');
        }

        $project->update($data);

        if (array_key_exists('skill_ids', $data)) {
            $project->skills()->sync($data['skill_ids'] ?? []);
        }

        return new ProjectResource($project->fresh(['skills', 'images']));
    }

    public function destroy(Project $project)
    {
        if ($project->cover_image) {
            Storage::disk('public')->delete($project->cover_image);
        }
        $project->delete();

        return response()->json(['message' => 'Projet supprimé.']);
    }
}