$(function () {
    var heapSortable = $('.heap .books').sortable({
        remove: function( event, ui ) {
            console.log('out heap');
        },
        receive: function( event, ui ) {
            var book = ui.item;
            $.ajax({
                type: "POST",
                url: $(this).data('save'),
                data: {
                    bookId : book.data('id')
                },
                error: function(response){
                    showError(response.responseJSON[0].error);
                },
                success: function(result, status){
                    ;
                }
            });
            ui.item.css({
                'position': 'inherit',
                'left': '0px',
                'top': '0px'
            });
            console.log('in heap');
        },
        beforeStop: function(event, ui) {
            console.log('heapSortable start to stop');
            var shelf = $(ui.placeholder).parent();
            var book = ui.item;
            var checkResult = canReceive(shelf, book);
            if(!checkResult.can){
                $(this).sortable("cancel");
                showError(checkResult.reason);
            }
        },
        connectWith: ['.transfer']
    });
    function calculateOffset(items, real){
        var real = real || false;
        var width = 0;
        items.each(function(){
            if(real){
                width += $(this).data('depth');
            }else{
                width += $(this).outerWidth();
            }
        });
        return width;
    }
    var shelfSortable = $('.shelf').sortable({
        remove: function( event, ui ) {
            console.log('out shelf');
        },
        receive: function( event, ui ) {
            ui.item.css({
                'position': 'absolute',
                'top': 'auto',
                'bottom': '0px'
            });
            ui.item.parent().children().each(function(){
                $(this).css({
                    'left': calculateOffset($(this).prevAll())+'px'
                });
            });
            console.log('in shelf');
        },
        change: function( event, ui ) {
            console.log('change shelf');
            ui.item.parent().children().each(function(){
                $(this).css({
                    'left': calculateOffset($(this).prevAll())+'px'
                });
            });
        },
        update: function( event, ui ) {
            console.log('update shelf');
            var shelf = ui.item.parent();
            var book = ui.item;
            $.ajax({
                type: "POST",
                url: shelf.data('save'),
                data: {
                    bookId : book.data('id')
                },
                error: function(response){
                    showError(response.responseJSON[0].error);
                },
                success: function(result, status){
                    ;
                }
            });
            ui.item.parent().children().each(function(){
                $(this).css({
                    'left': calculateOffset($(this).prevAll())+'px'
                });
            });
        },
        beforeStop: function(event, ui) {
            console.log('shelfSortable start to stop');
        },
        connectWith: ['.transfer']
    });
    //rotate book
    $('.heap').on('click', '.heaps_book', function(){
        $(this).css({
            'width': $(this).css('height'),
            'height': $(this).css('width')
        });
        $(this).toggleClass('vertical');
    });

    function canReceive(shelf, book){
        if(!book.hasClass('vertical')){
            return {
                can: false,
                reason: 'vertical'
            };
        }
        if(shelf.data('width') - calculateOffset(shelf.children(':not(.ui-sortable-placeholder)'), true) < book.data('depth')){
            return {
                can: false,
                reason: 'width'
            };
        }
        if(shelf.data('depth') < book.data('width')){
            return {
                can: false,
                reason: 'depth'
            };
        }
        if(shelf.data('height') < book.data('height')){
            return {
                can: false,
                reason: 'height'
            };
        }
        return {
            can: true
        };
    }

    function showError(text){
        var modal = $('.modal');
        var title = modal.find('.modal-title');
        var message = modal.find('.modal-body .message');
        var errors = {
            'vertical': 'Книга должна находиться в вертикальной ориентации. Кликните по ней, чтобы повернуть.',
            'width': 'На полке недостаточно свободного места',
            'depth': 'Книга не может быть длиннее, чем глубина полки. Очень жаль, что в 2D это не отобразить.',
            'height': 'Книга слишком высокая. Поместите ее на другую полку',
            'ajax': 'Ошибка выполнения ajax-запроса',
        };
        message.text(errors[text] !== undefined ? errors[text] : text);
        title.text('Ошибка');
        modal.on('hidden.bs.modal', function (e) {
            message.text('');
            title.text('');
        }).modal();
    }
    function getRandomInt(min, max) {
        return min === max ? min : (Math.floor(Math.random() * (max - min)) + min);
    }
    function putDownBook(){
        var shelves = $('.shelf:has(.book)');
        var shelve = shelves.eq(getRandomInt(0, shelves.length));
        var book = shelve.children().eq(getRandomInt(0, shelve.children().length));
        console.log(book);
    }
    putDownBook();
    //$('[data-possible="draggable"]').draggable();
})