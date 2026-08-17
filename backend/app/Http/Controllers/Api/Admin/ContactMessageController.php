<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;

class ContactMessageController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::query()->latest()->paginate(15);

        return ContactMessageResource::collection($messages);
    }

    public function show(ContactMessage $contactMessage)
    {
        if (! $contactMessage->read_at) {
            $contactMessage->update(['read_at' => now()]);
        }

        return new ContactMessageResource($contactMessage);
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();

        return response()->json(['message' => 'Message supprimé.']);
    }
}