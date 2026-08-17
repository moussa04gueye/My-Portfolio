<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Project;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'projects_count' => Project::count(),
            'projects_published' => Project::where('status', 'published')->count(),
            'blog_posts_count' => BlogPost::count(),
            'unread_messages_count' => ContactMessage::whereNull('read_at')->count(),
        ]);
    }
}