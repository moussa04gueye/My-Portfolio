<?php

use App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Api\Public as PublicApi;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;


// -------- Public --------
Route::get('/projects', [PublicApi\ProjectController::class, 'index']);
Route::get('/projects/{slug}', [PublicApi\ProjectController::class, 'show']);
Route::get('/blog', [PublicApi\BlogController::class, 'index']);
Route::get('/blog/{slug}', [PublicApi\BlogController::class, 'show']);
Route::get('/experiences', [PublicApi\ExperienceController::class, 'index']);
Route::get('/education', [PublicApi\EducationController::class, 'index']);
Route::get('/skills', [PublicApi\SkillController::class, 'index']);
Route::get('/settings', [PublicApi\SettingController::class, 'index']);
Route::get('/cv/download', [PublicApi\CvController::class, 'download']);
Route::post('/contact', [PublicApi\ContactController::class, 'store'])
    ->middleware('throttle:5,1');

// -------- Auth admin --------
Route::post('/admin/login', [Admin\AuthController::class, 'login'])
    ->middleware('throttle:5,1');

// -------- Admin protégé --------
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/me', [Admin\AuthController::class, 'me']);
    Route::post('/logout', [Admin\AuthController::class, 'logout']);
    Route::get('/dashboard', [Admin\DashboardController::class, 'index']);

    Route::apiResource('projects', Admin\ProjectController::class);
    Route::post('projects/{project}/images', [Admin\ProjectImageController::class, 'store']);
    Route::delete('project-images/{image}', [Admin\ProjectImageController::class, 'destroy']);

    Route::apiResource('skills', Admin\SkillController::class)->except(['show']);
    Route::apiResource('experiences', Admin\ExperienceController::class)->except(['show']);
    Route::apiResource('education', Admin\EducationController::class)->except(['show']);
    Route::apiResource('blog', Admin\BlogController::class);
    Route::apiResource('tags', Admin\TagController::class)->only(['index', 'store', 'destroy']);

    Route::get('contact-messages', [Admin\ContactMessageController::class, 'index']);
    Route::get('contact-messages/{contactMessage}', [Admin\ContactMessageController::class, 'show']);
    Route::delete('contact-messages/{contactMessage}', [Admin\ContactMessageController::class, 'destroy']);

    Route::post('cv', [Admin\CvController::class, 'store']);
    Route::get('settings', [Admin\SettingController::class, 'index']);
    Route::put('settings', [Admin\SettingController::class, 'update']);
    
});