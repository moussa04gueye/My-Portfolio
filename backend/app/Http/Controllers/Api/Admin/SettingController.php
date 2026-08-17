<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        return Setting::query()->pluck('value', 'key');
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'settings' => ['required', 'array'],
        ]);

        foreach ($data['settings'] as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return Setting::query()->pluck('value', 'key');
    }
}