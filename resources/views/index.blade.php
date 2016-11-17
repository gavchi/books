<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Books</title>
    <!-- Bootstrap -->
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="/css/jquery-ui.min.css">

    <link rel="stylesheet" href="/css/custom.css">
    <!--[if lt IE 9]>
    <script src="/js/html5shiv.min.js"></script>
    <script src="/js/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div classs="row">
    <div class="col-md-2 col-md-offset-5">
        <h1>Library</h1>
    </div>
</div>
<div classs="row">
    <div class="col-md-5 col-md-offset-1 library">
        <h2>Racks</h2>
        <div class="racks">
        @foreach($Racks as $Rack)
            <div class="rack-block pull-left" style="width: {{$Rack->shelves->first()->width * $dimMtpl}}px;">
                <h3 class="pull-left">{{$Rack->title}}</h3>
                <div class="rack" style="width: {{$Rack->shelves->first()->width * $dimMtpl}}px;">
                    @foreach($Rack->shelves as $Shelf)
                        <div class="shelf transfer" style="height: {{$Shelf->height * $dimMtpl}}px;"></div>
                    @endforeach
                </div>
            </div>
        @endforeach
        </div>
    </div>
    <div class="col-md-5 heap">
        <h2>Heap</h2>
        <div class="books transfer">
            @foreach($BooksFromHeap as $Book)
                <div class="btn book heaps_book" style="width: {{$Book->height * $dimMtpl}}px; height: {{$Book->depth * $dimMtpl}}px" title="{{$Book->title}}"></div>
            @endforeach
        </div>
    </div>
</div>

<script src="/js/jquery-2.2.4.min.js"></script>
<script src="/js/jquery-ui.min.js"></script>
<script src="/bootstrap/js/bootstrap.min.js"></script>
<script src="/js/custom.js"></script>
</body>
</html>