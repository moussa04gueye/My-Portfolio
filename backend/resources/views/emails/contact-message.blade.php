@component('mail::message')
# Nouveau message depuis le portfolio

**Nom :** {{ $contactMessage->name }}
**Email :** {{ $contactMessage->email }}
@if($contactMessage->subject)
**Sujet :** {{ $contactMessage->subject }}
@endif

**Message :**

{{ $contactMessage->message }}

Reçu le {{ $contactMessage->created_at->format('d/m/Y à H:i') }}.
@endcomponent