<?php

use Illuminate\Database\Seeder;
use App\Book;

class Books extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $books = config('books.list');
        $booksSizes = config('books.sizes');
        $booksData = [];
        for($i=1; $i<=count($books); $i++){
            $randSize = $booksSizes[rand(1, count($booksSizes))-1];
            $now = \Carbon\Carbon::now()->toDateTimeString();
            $booksData[] = [
                'title' => $books[$i-1],
                'width' => $randSize['width'],
                'height' => $randSize['height'],
                'depth' => rand(10, 80),
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }
        Book::insert($booksData);
    }
}
