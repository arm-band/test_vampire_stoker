// mouse stalker
const mouseStalker = () => {
    const $cursor = $('#c-mouseStalker_cursor');
    const $delay = $('#c-mouseStalker_delay');
    const paramsArray = {
        cursor: {
            width: $cursor.outerWidth(),
            coorX: 0,
            coorY: 0,
            delay: 0.001
        },
        delay: {
            width: $delay.outerWidth(),
            coorX: 0,
            coorY: 0,
            delay: 10
        },
    };
    // カーソルの遅延アニメーション
    // ほんの少しだけ遅延させる (0.001秒)
    TweenMax.to(
        {},
        paramsArray.cursor.delay,
        {
            repeat: -1,
            onRepeat: function() {
                paramsArray.delay.coorX += (paramsArray.cursor.coorX - paramsArray.delay.coorX) / paramsArray.delay.delay;
                paramsArray.delay.coorY += (paramsArray.cursor.coorY - paramsArray.delay.coorY) / paramsArray.delay.delay;

                // delay
                TweenMax.set(
                    $delay,
                    {
                        css: {
                            left: paramsArray.delay.coorX - (paramsArray.delay.width / 2),
                            top: paramsArray.delay.coorY - (paramsArray.delay.width / 2)
                        }
                    }
                );

                // cursor
                TweenMax.set(
                    $cursor,
                    {
                        css: {
                            left: paramsArray.cursor.coorX - (paramsArray.cursor.width / 2),
                            top: paramsArray.cursor.coorY - (paramsArray.cursor.width / 2)
                        }
                    }
                );
            }
        }
    );

    // get mouse coordinate
    $(document).on('mousemove', function (e) {
        paramsArray.cursor.coorX = e.pageX;
        paramsArray.cursor.coorY = e.pageY;
    });

    // mouse hover
    const activeClass = 'active';
    $('#address').on({
        mouseenter: function () {
            $cursor.addClass(activeClass);
            $delay.addClass(activeClass);
        },
        mouseleave: function () {
            $cursor.removeClass(activeClass);
            $delay.removeClass(activeClass);
        },
    });
};

window.addEventListener('load', () => {
    mouseStalker();
});
