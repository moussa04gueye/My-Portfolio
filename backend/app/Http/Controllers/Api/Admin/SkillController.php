<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return SkillResource::collection(Skill::orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string'],
            'icon' => ['nullable', 'string'],
            'level' => ['required', 'integer', 'min:1', 'max:5'],
            'order' => ['integer'],
        ]);

        return new SkillResource(Skill::create($data));
    }

    public function update(Request $request, Skill $skill)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'category' => ['sometimes', 'required', 'string'],
            'icon' => ['nullable', 'string'],
            'level' => ['sometimes', 'required', 'integer', 'min:1', 'max:5'],
            'order' => ['integer'],
        ]);

        $skill->update($data);

        return new SkillResource($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return response()->json(['message' => 'Compétence supprimée.']);
    }
}