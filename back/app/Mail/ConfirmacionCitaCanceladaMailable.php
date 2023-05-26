<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConfirmacionCitaCanceladaMailable extends Mailable
{
    use Queueable, SerializesModels;

    public $subject = "Tu cita ha sido cancelada correctamente";

    public $user;
    public $date;
    public $email;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $date, $email)
    {
        $this->user = $user;
        $this->date = $date;
        $this->email = $email;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.confirmacion-cita-cancelada',
            with: [
                'user' => $this->user,
                'date' => $this->date,
                'email' => $this->email
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
