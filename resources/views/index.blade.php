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
        <h1>Библиотека</h1>
    </div>
</div>
<div classs="row">
    <div class="col-md-5 col-md-offset-1 library">
        <div class="racks">
        @foreach($Racks as $Rack)
            <div class="rack-block pull-left" style="width: {{$Rack->shelves->first()->width * $dimMtpl}}px;">
                <h3 class="pull-left">{{$Rack->title}}</h3>
                <h5 class="pull-left">глубина {{$Rack->shelves->first()->depth}}</h5>
                <div class="rack" style="width: {{$Rack->shelves->first()->width * $dimMtpl}}px;">
                    @foreach($Rack->shelves as $Shelf)
                        <div class="shelf transfer" style="height: {{$Shelf->height * $dimMtpl}}px;"
                             data-height="{{$Shelf->height}}" data-width="{{$Shelf->width}}" data-depth="{{$Shelf->depth}}"></div>
                    @endforeach
                </div>
            </div>
        @endforeach
        </div>
    </div>
    <div class="col-md-5 heap">
        <h2>Куча</h2>
        <div class="books transfer">
            @foreach($BooksFromHeap as $Book)
                <div class="btn book heaps_book spin{{rand(1,5)}}"
                     style="width: {{$Book->height * $dimMtpl}}px; height: {{$Book->depth * $dimMtpl}}px" title="{{$Book->title}}"
                     data-height="{{$Book->height}}" data-width="{{$Book->width}}" data-depth="{{$Book->depth}}"></div>
            @endforeach
        </div>
    </div>
</div>
{{--Modals--}}
<div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Заголовок</h4>
            </div>
            <div class="modal-body">
                <p class="message"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script src="/js/jquery-2.2.4.min.js"></script>
<script src="/js/jquery-ui.min.js"></script>
<script src="/bootstrap/js/bootstrap.min.js"></script>
<script src="/js/custom.js"></script>
</body>
</html>