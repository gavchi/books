<?php

namespace App\Http\Controllers;

use App\Book;
use App\Rack;
use Illuminate\Http\Request;

use App\Http\Requests;

class IndexController extends Controller
{
    public function getIndex(){
        $Racks = Rack::with('shelves.books')->get();
        $BooksFromHeap = Book::whereDoesntHave('shelf')->orderBy('height')->get();
        $dimMtpl = config('app.dimensions.multiplier');
        return view('index', compact('Racks', 'BooksFromHeap', 'dimMtpl'));
    }
}
