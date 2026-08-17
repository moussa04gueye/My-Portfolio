<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Mail\ContactMessageReceived;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(StoreContactMessageRequest $request)
    {
        $message = ContactMessage::create([
            ...$request->validated(),
            'ip' => $request->ip(),
        ]);

        Mail::to(config('mail.admin_address', config('mail.from.address')))
            ->send(new ContactMessageReceived($message));

        return response()->json([
            'message' => 'Votre message a bien été envoyé.',
        ], 201);
    }
}