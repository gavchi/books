<?php

use Illuminate\Database\Seeder;
use App\Rack;
use App\Shelf;

class Racks extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Rack form example
        //http://www.ikea.com/ru/ru/catalog/products/10323349/
        //Shelf's height are random
        for($i=1; $i<=3; $i++){
            $Rack = Rack::create([
                'title' => 'Стеллаж №'.$i
            ]);
            $countShelves = rand(6, 12);
            $Shelves = [];
            $shelfSize = [210, 300];
            for($j=1; $j<=$countShelves; $j++){
                $Shelves[] = new Shelf([
                    'width' => 400,
                    'height' => $shelfSize[rand(0, count($shelfSize)-1)],
                    'depth' => 150,
                ]);
            }
            $Rack->shelves()->saveMany($Shelves);
        }
    }
}
