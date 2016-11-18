<?php

namespace App\Http\Controllers;

use App\Book;
use App\Rack;
use App\Shelf;
use Illuminate\Http\Request;

use App\Http\Requests;

class IndexController extends Controller
{
    public function getIndex(){
        $Racks = Rack::with('shelves.books')->get();
        $BooksFromHeap = Book::whereDoesntHave('shelf')->orderBy('width')->get();
        $dimMtpl = config('app.dimensions.multiplier');
        return view('index', compact('Racks', 'BooksFromHeap', 'dimMtpl'));
    }

    public function postBookToShelf(Request $request, $shelfId){
        $bookId = $request->get('bookId');
        if($bookId){
            $Book = Book::findOrFail($bookId);
            $Shelf = Shelf::findOrFail($shelfId);
            $Book->shelf()->associate($Shelf);
            $Book->save();
            return response()->json([
                'status' => true
            ]);
        }else{
            return response()->json([
                'status' => false
            ]);
        }
    }

    public function postBookToHeap(Request $request){
        $bookId = $request->get('bookId');
        if($bookId){
            $Book = Book::findOrFail($bookId);
            $Book->shelf()->dissociate();
            $Book->save();
            return response()->json([
                'status' => true
            ]);
        }else{
            return response()->json([
                'status' => false
            ]);
        }
    }
}
