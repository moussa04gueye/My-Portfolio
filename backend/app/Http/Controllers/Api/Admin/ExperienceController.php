<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return ExperienceResource::collection(Experience::orderBy('order')->orderByDesc('start_date')->get());
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        return new ExperienceResource(Experience::create($data));
    }

    public function update(Request $request, Experience $experience)
    {
        $data = $this->validated($request, true);
        $experience->update($data);

        return new ExperienceResource($experience);
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return response()->json(['message' => 'Expérience supprimée.']);
    }

    private function validated(Request $request, bool $partial = false): array
    {
        $req = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'title' => [$req, 'string', 'max:255'],
            'company' => [$req, 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'start_date' => [$req, 'date'],
            'end_date' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
            'type' => [$req, 'in:stage,emploi,projet'],
            'order' => ['integer'],
        ]);
    }
}