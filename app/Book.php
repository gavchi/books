<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function shelf()
    {
        return $this->belongsTo('App\Shelf');
    }
}
