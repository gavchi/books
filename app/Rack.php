<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rack extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function shelves()
    {
        return $this->hasMany('App\Shelf');
    }
}
