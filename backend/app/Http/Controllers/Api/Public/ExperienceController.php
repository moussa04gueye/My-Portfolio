<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::query()
            ->orderBy('order')
            ->orderByDesc('start_date')
            ->get();

        return ExperienceResource::collection($experiences);
    }
}