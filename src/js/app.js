// mouse stalker
const mouseStalker = () => {
    const $cursor = $('#c-mouseStalker_cursor');
    const $delay = $('#c-mouseStalker_delay');
    const paramsArray = {
        cursor: {
            width: $cursor.outerWidth(),
            coorX: 0,
            coorY: 0,
            delay: 0.001,
        },
        delay: {
            width: $delay.outerWidth(),
            coorX: 0,
            coorY: 0,
            delay: 10,
        },
    };
    const activeClass = 'active';
    let clipRadius = 40 / 2;
    let clipScale = 1;
    let clipPathCoor = `ellipse(${clipRadius * clipScale}px ${clipRadius * clipScale}px at 50% 50%)`;
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

                clipPathCoor = `ellipse(${clipRadius * clipScale}px ${clipRadius * clipScale}px at ${paramsArray.delay.coorX}px ${paramsArray.delay.coorY}px)`;
                // delay
                TweenMax.set(
                    $delay,
                    {
                        css: {
                            clipPath: clipPathCoor,
                        }
                    }
                );

                // cursor
                TweenMax.set(
                    $cursor,
                    {
                        css: {
                            left: paramsArray.cursor.coorX - (paramsArray.cursor.width / 2),
                            top: paramsArray.cursor.coorY - (paramsArray.cursor.width / 2),
                        }
                    }
                );
            }
        }
    );

    // mouse hover
    $('#address').on({
        mouseenter: function () {
            $cursor.addClass(activeClass);
            $delay.addClass(activeClass);
            clipScale = 2;
        },
        mouseleave: function () {
            $cursor.removeClass(activeClass);
            $delay.removeClass(activeClass);
            clipScale = 1;
        },
    });

    // get mouse coordinate
    $(document).on('mousemove', function (e) {
        paramsArray.cursor.coorX = e.pageX;
        paramsArray.cursor.coorY = e.pageY;
    });
};

window.addEventListener('load', () => {
    mouseStalker();
});
