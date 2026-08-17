<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\EducationResource;
use App\Models\Education;

class EducationController extends Controller
{
    public function index()
    {
        $education = Education::query()
            ->orderBy('order')
            ->orderByDesc('start_date')
            ->get();

        return EducationResource::collection($education);
    }
}