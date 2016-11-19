$(function () {
    var heapSortable = $('.heap .books').sortable({
        remove: function( event, ui ) {
            console.log('out heap');
        },
        receive: function( event, ui ) {
            var book = ui.item;
            saveBookOnHeap(book);
            addHeapsBookStyle(book);
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

    var shelfSortable = $('.shelf').sortable({
        remove: function( event, ui ) {
            console.log('out shelf');
        },
        receive: function( event, ui ) {
            var shelf = ui.item.parent();
            addShelfsBookStyle(ui.item);
            reArrangeBooksOnShelf(shelf);
            console.log('in shelf');
        },
        change: function( event, ui ) {
            console.log('change shelf');
            var shelf = ui.item.parent();
            reArrangeBooksOnShelf(shelf);
        },
        update: function( event, ui ) {
            console.log('update shelf');
            var shelf = ui.item.parent();
            var book = ui.item;
            saveBookOnShelf(book, shelf);
            reArrangeBooksOnShelf(shelf);
        },
        beforeStop: function(event, ui) {
            console.log('shelfSortable start to stop');
        },
        connectWith: ['.transfer']
    });

    var intervalId;

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

    function reArrangeBooksOnShelf(shelf){
        shelf.children().each(function(){
            $(this).css({
                'left': calculateOffset($(this).prevAll())+'px'
            });
        });
    }

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
            'drop': 'Книга упала с полки. Попробуй теперь найди ее в этой куче.'
        };
        message.text(errors[text] !== undefined ? errors[text] : text);
        title.text('Ошибка');
        modal.on('hidden.bs.modal', function (e) {
            message.text('');
            title.text('');
        }).modal();
    }

    function saveBookOnShelf(book, shelf){
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
    }

    function saveBookOnHeap(book){
        var heap = $('.heap .books');
        $.ajax({
            type: "POST",
            url: heap.data('save'),
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
    }

    function getRandomInt(min, max) {
        return min === max ? min : (Math.floor(Math.random() * (max - min)) + min);
    }

    function dropBook(){
        var heap = $('.heap .books');
        var shelves = $('.shelf:has(.book)');
        var shelf = shelves.eq(getRandomInt(0, shelves.length));
        var book = shelf.children().eq(getRandomInt(0, shelf.children().length));
        heap.append(book);
        saveBookOnHeap(book);
        addHeapsBookStyle(book);
        reArrangeBooksOnShelf(shelf);
    }

    function addHeapsBookStyle(element){
        element.css({
            'position': 'inherit',
            'left': '0px',
            'top': '0px'
        });
    }

    function addShelfsBookStyle(element){
        element.css({
            'position': 'absolute',
            'top': 'auto',
            'bottom': '0px'
        });
    }

    function dropBookManually(){
        $('[role="putDownBook"]').click(function (e) {
            e.preventDefault();
            dropBook();
        });
    }

    function enableAutoDropping(){
        intervalId = setInterval(function(){
            dropBook();
            showError('drop');
        }, getRandomInt(5, 10)*1000)
    }

    function disableAutoDropping(){
        clearInterval(intervalId);
    }

    function autoDroppingSwitcher(){
        $('[data-name="droppingSwitcher"]').click(function(e){
            e.preventDefault();
            if(!$(this).hasClass('dropOn')){
                enableAutoDropping();
                $(this).addClass('dropOn').text($(this).data('textOn'));
            }else{
                disableAutoDropping();
                $(this).removeClass('dropOn').text($(this).data('textOff'));
            }
        });
    }

    dropBookManually();
    autoDroppingSwitcher();

    //$('[data-possible="draggable"]').draggable();
})