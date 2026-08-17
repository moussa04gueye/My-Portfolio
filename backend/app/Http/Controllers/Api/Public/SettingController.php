<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        return Setting::query()->pluck('value', 'key');
    }
}