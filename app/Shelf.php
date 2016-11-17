<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shelf extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $table = 'shelves';

    public function books()
    {
        return $this->hasMany('App\Book');
    }

    public function rack()
    {
        return $this->belongsTo('App\Rack');
    }
}
