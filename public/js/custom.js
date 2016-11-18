$(function () {
    var heapSortable = $('.heap .books').sortable({
        remove: function( event, ui ) {
            console.log('out heap');
        },
        receive: function( event, ui ) {
            ui.item.css({
                'position': 'inherit',
                'left': '0px',
                'top': '0px'
            });
            console.log('in heap');
        },
        beforeStop: function(event, ui) {
            console.log('heapSortable start to stop');
            var checkResult = canReceive($(ui.placeholder).parent(), ui.item);
            if(!checkResult.can){
                console.log(checkResult.reason);
                $(this).sortable("cancel");
            }
        },
        connectWith: ['.transfer']
    });
    function calculateOffset(items, real){
        real = real || false;
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
    //$('[data-possible="draggable"]').draggable();
})