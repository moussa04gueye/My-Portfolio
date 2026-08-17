<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\EducationResource;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index()
    {
        return EducationResource::collection(Education::orderBy('order')->orderByDesc('start_date')->get());
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        return new EducationResource(Education::create($data));
    }

    public function update(Request $request, Education $education)
    {
        $data = $this->validated($request, true);
        $education->update($data);

        return new EducationResource($education);
    }

    public function destroy(Education $education)
    {
        $education->delete();

        return response()->json(['message' => 'Formation supprimée.']);
    }

    private function validated(Request $request, bool $partial = false): array
    {
        $req = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'school' => [$req, 'string', 'max:255'],
            'degree' => [$req, 'string', 'max:255'],
            'field' => ['nullable', 'string', 'max:255'],
            'start_date' => [$req, 'date'],
            'end_date' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
            'order' => ['integer'],
        ]);
    }
}