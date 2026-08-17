<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Models\Skill;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::query()->orderBy('order')->get();

        return SkillResource::collection($skills);
    }
}