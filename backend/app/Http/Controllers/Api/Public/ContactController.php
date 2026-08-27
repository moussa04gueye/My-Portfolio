<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function store(StoreContactMessageRequest $request)
    {
        $message = ContactMessage::create([
            ...$request->validated(),
            'ip' => $request->ip(),
        ]);

        return response()->json([
            'message' => 'Votre message a bien été envoyé.',
        ], 201);
    }
}