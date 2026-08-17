<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cv;
use Illuminate\Http\Request;

class CvController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:pdf', 'max:8192'],
            'label' => ['nullable', 'string', 'max:255'],
        ]);

        Cv::query()->where('is_active', true)->update(['is_active' => false]);

        $path = $request->file('file')->store('Cv-janvier-2026.pdf', 'public');

        $cv = Cv::create([
            'file_path' => $path,
            'label' => $request->input('label', 'CV'),
            'is_active' => true,
            'uploaded_at' => now(),
        ]);

        return response()->json($cv, 201);
    }
}