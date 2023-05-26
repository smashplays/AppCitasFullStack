<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Day extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'employee_id',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }


    public function hours()
    {
        return $this->hasMany(Hour::class);
    }
}
