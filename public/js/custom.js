$(function () {
    $('.heap .books').sortable({
        remove: function( event, ui ) {
            console.log('out heap');
        },
        receive: function( event, ui ) {
            ui.item.css({
                'position': 'relative',
                'left': '0px',
                'top': '0px',
            });
            console.log('in heap');
        },
        connectWith: ['.transfer']
    });
    function calculateOffset(items){
        var width = 0;
        items.each(function(){
            width += $(this).outerWidth();
        });
        return width;
    }
    $('.shelf').sortable({
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
        connectWith: ['.transfer']
    });
    $('.heap').on('click', '.heaps_book', function(){
        $(this).css({
            'width': $(this).css('height'),
            'height': $(this).css('width')
        })
    });
    //$('[data-possible="draggable"]').draggable();
})