<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CitaPedidaClienteMailable extends Mailable
{
    use Queueable, SerializesModels;

    public $subject = "Cita pedida en Tienda de Informática Inventada";

    public $user;
    public $service;
    public $employee;
    public $day;
    public $hour;
    public $email;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $service, $employee, $day, $hour, $email)
    {
        $this->user = $user;
        $this->service = $service;
        $this->employee = $employee;
        $this->day = $day;
        $this->hour = $hour;
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
            view: 'emails.cita-pedida-cliente',
            with: [
                'user' => $this->user,
                'service' => $this->service,
                'employee' => $this->employee,
                'day' => $this->day,
                'hour' => $this->hour,
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
