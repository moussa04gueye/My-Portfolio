<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Cv;
use Illuminate\Support\Facades\Storage;

class CvController extends Controller
{
    public function download()
    {
        $cv = Cv::query()->where('is_active', true)->latest('uploaded_at')->firstOrFail();

        return Storage::disk('public')->download($cv->file_path, 'Cv-janvier-2026.pdf' . $cv->file_name);
    }
}