<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectInquiry extends Model
{
    protected $fillable = [
        'reference',
        'name',
        'email',
        'company',
        'preferred_contact',
        'budget_range',
        'timeline',
        'brief',
        'status',
        'assigned_to',
        'contacted_at'
    ];

    protected $casts = [
        'contacted_at' => 'datetime'
    ];

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'inquiry_services', 'inquiry_id', 'service_id');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(InquiryNote::class, 'inquiry_id');
    }
}
