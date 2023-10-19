
function changeSlide(clickedNumber) {

    $('.line').css('width', '20px');
    if (clickedNumber == 1) {
        $('.i2, .i3').hide();
        $('.i1').show();

    } else if (clickedNumber == 2) {
        $('.i1, .i3').hide();
        $('.i2').show();
    } else {
        $('.i1, .i2').hide();
        $('.i3').show();
    }
    $('.number[data-id="' + clickedNumber + '"] .line').css('width', '70px');


}

$(document).ready(function () {



    let currentSlide = 1;
    $('.i2, .i3').hide();
    $('.number').click(function () {
        currentSlide = $(this).data('id');
        changeSlide(currentSlide);

    });

    function autoChange() {
        currentSlide++;
        if (currentSlide > 3) {
            currentSlide = 1;
        }
        changeSlide(currentSlide);
    }

    let autoChangeTimer = setInterval(autoChange, 4000);
});

$(document).ready(function () {



    var isHovered = false;





    let hoverTimeout;

    let hoverTimeout2;

    $('nav > ul > li').mouseenter(function () {
        var currentLi = $(this);
        var innerUl = currentLi.find(".inner-ul");
        currentLi.siblings('li').find(".inner-ul").hide();

        clearTimeout(hoverTimeout);

        hoverTimeout2 = setTimeout(function () {
            innerUl.slideDown();

        }, 50);
    });

    $('nav > ul > li').mouseleave(function () {
        var currentLi = $(this);

        var innerUl = currentLi.find(".inner-ul");
        hoverTimeout = setTimeout(function () {
            innerUl.slideUp();
        }, 200);

        clearTimeout(hoverTimeout2);
    });


    $(document).ready(function () {
        $('#menubtn').click(function () {
            $('.right-menu').addClass('active');
        });

        $('#xbtn').click(function () {
            $('.right-menu').removeClass('active');
        });


    });


    let quickelement;


    $('.inner-li').mouseenter(function () {


        $(this).find(".tam").css('margin-left', '10px')

        $(this).find("i").css('margin-right', '5px')
        $(this).find(".tam").css('margin-left', '0px')
    });

    $('.inner-li').mouseleave(function () {
        $(this).find(".tam").css('margin-left', '-13px')
        $(this).find("i").css('margin-right', '0px')
    });


    let arr = [];


    $('.filter-hover').hide()


    let hoverTimeout4;

    let hoverTimeout5;


    $('.for-filter ').mouseenter(function () {

        clearTimeout(hoverTimeout5);

        hoverTimeout4 = setTimeout(function () {

            $('.filter-hover').fadeIn(300)

        }, 100);
    });

    $('.for-filter').mouseleave(function () {
        hoverTimeout5 = setTimeout(function () {
            $('.filter-hover').fadeOut(300)
        }, 400);

        clearTimeout(hoverTimeout4);
    });



    function processCards() {

        $('.card').mouseenter(function () {
            $(this).find('.card-hover-2').css('bottom', '0%');

        })

        $('.card').mouseleave(function () {
            $(this).find('.card-hover-2').css('bottom', '-12%');
        })



        $('.quick').click(function () {
            var cardId = $(this).data('card-id');
            console.log(cardId)
            sku = cardId
            quickFill(sku)
            $('.overlay').show();
            $('.for-quick').fadeIn(300);

        });

        $('#quickx').click(function () {
            console.log("SDA")
            $('.overlay').hide();
            $('.for-quick').fadeOut(300);
            $('.for-quick').remove();
            element="";
            i=0;

        });

        $('.overlay').click(function () {
            $(this).hide();
            $('.for-quick').fadeOut(300);
            $('.for-quick').remove();
            element="";
            i=0
        });


    }

    let sku = 0;


    let i = 0;

    let count = 1;

    function quickFill(sku) {

        let content = "";
        element = arr.find(a => a.sku == sku);

        let sale = element.sale == '0' ? " " : "-" + element.sale + "%"
        let isnew = element.isnew ? "NEW" : "";
        let oldprice;
        if (element.sale != '0') {
            let a = Number(element.sale) / 100;
            oldprice = '$' + Math.ceil(Number(element.price) / (1 - a));
        }
        else {
            oldprice = ""
        }
        content += `
        <section class="for-quick">
                    <div class="hov">
                        <div class="for-qimg">
                            <i id="left" class="fa-solid fa-arrow-left"></i>
                            <img src=${element.images[i]} alt="">
                            <i id="right" class="fa-solid fa-arrow-right"></i>
                        </div>
                        <div class="for-qtxt">
                            <div class="qtxt-top">
                                <h3>${element.title}</h3>
                                <h5><span class='for-line'>${oldprice}</span>$${element.price}</h5>
                            </div>
                            <div class="qtxt-mid">
                                <div class="for-stars">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt itaque perferendis
                                    perspiciatis quos voluptatem nostrum totam dolor, qui aspernatur ex non magnam quae id odio
                                    laudantium odit ab autem sint.</p>
                            </div>
                            <div class="qtxt-count">
                                <div class="count">
                                    <span>Quantity</span>
                                    <div class="counter">
                                        <i id='count-left' class="fa-solid fa-chevron-left"></i>
                                        <span>${count}</span>
                                        <i id='count-right' class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div>
                                <div class="addbtn">
                                    <button>ADD TO CART</button>
                                </div>
                            </div>
                            <div class="qtxt-bot">
                                <i class="fa-regular fa-heart"></i>
                                <p>ADD TO WISHLIST</p>
                            </div>
                            <!-- <h1>ASDASDASDSDASD ASDSAD</h1> -->
                        </div>
                        <h6 id="quickx">X</h6>
                    </div>
        
        `
        $('.aa').children().append(content);

        $('#quickx').click(function () {
            console.log("SDA")
            $('.overlay').hide();
            $('.for-quick').fadeOut();
            $('.for-quick').remove();

        });

        $('#right').click(function () {

            if (i < 4) i++;
            else i = 0;
            $('.for-qimg img').attr('src', `${element.images[i]}`);

        });
        $('#left').click(function () {

            if (i > 0) i--;
            else i = 4;
            $('.for-qimg img').attr('src', `${element.images[i]}`);

        });

        $('#count-right').click(function () {

            if (count <= 500) count++;
            $('.counter span').html(count)

        });
        $('#count-left').click(function () {

            if (count > 1) count--;
            $('.counter span').html(count)

        });



    }
    function fill(arr) {
        let content = "";
        arr.forEach(element => {
            let sale = element.sale == '0' ? " " : "-" + element.sale + "%"
            let isnew = element.isnew ? "NEW" : "";
            let oldprice;
            if (element.sale != '0') {
                let a = Number(element.sale) / 100;
                oldprice = Math.ceil(Number(element.price) / (1 - a));
            }
            else {
                oldprice = ""
            }
            content += `
                    <div class="card" >
                    <div class="card-img">
                        <img src="${element.images[0]}" alt="">
                        <div class="card-hover-2">
                            <p class="quick" data-card-id="${element.sku}">Quick Look</p>
                          <div class="for-heart">
                              <i class="fa-regular fa-heart"></i>
                          </div>
                     </div>
                  </div>
                  <p class="card-title">${element.title}</p>
                    <div class="card-text">
                        <span class="add-to-cart">Add To Cart</span>
                        <span class="prices">
                            <span class="old-price">${oldprice}</span>
                            <span class="price">$${element.price}</span>
                        </span>
                    </div>
                    <div class="card-hover1">
                        <p class="for-new">${isnew}</p>
                        <p class="for-sale">${sale}</p>
                        </div>
                    </div>
                        `
        });
        $('.category-items').css('opacity', 0);
        setTimeout(function () {
            $('.card-items').html(content)
            $('.category-items').css('opacity', 1);
            processCards()
        }, 500);
    }

    $.get("db.json", function (response, status) {
        console.log(response.items['item1'])
        for (let i = 0; i < 8; i++) {
            const element = response.items[`item${i + 1}`];
            arr.push(element);
        }


        $('.category-titles h5').click(function () {
            $('.category-titles h5').removeClass('category-active')
            $(this).addClass('category-active');
            let newarr = [];
            if ($(this).html() == "All") {
                fill(arr);
                return;
            }
            for (let i = 0; i < 8; i++) {
                let index = $.inArray($(this).html(), arr[i].categories);
                if (index != -1) {
                    newarr.push(arr[i])
                }
                fill(newarr);
            }
        });

        $('.sort-by p').click(function () {
            $('.sort-by p').removeClass('filter-active')
            $(this).addClass('filter-active');
            let newarr = [...arr];
            if ($(this).html() == "Default" || $(this).html() == "Popularity") {
                fill(arr);
                return;
            }
            else if ($(this).html() == "NewNess") {
                newarr.sort(function (a, b) {
                    return (a.isnew === b.isnew) ? 0 : a.isnew ? -1 : 1;
                });
            }
            else if ($(this).html() == "Price: Low to High") {
                newarr.sort(function (a, b) {
                    return a.price - b.price;
                });
            }
            else if ($(this).html() == "Price: High to Low") {
                newarr.sort(function (a, b) {
                    return b.price - a.price;
                });
            }
            else if ($(this).html() == "Average Rating") {
                newarr.sort(function (a, b) {
                    return a.starcount - b.starcount;
                });
            }
            fill(newarr);
        });
        $('.Price-Range p').click(function () {
            $('.Price-Range p').removeClass('filter-active')
            $(this).addClass('filter-active');
            let newarr = [];
            let st = 0;
            let fn = 0;
            console.log($(this).html())

            console.log($(this).html().endsWith('20'))
            if ($(this).html() == "All") {
                fill(arr);
                return;
            }
            else if ($(this).html().endsWith('10')) {
                st = 0;
                fn = 10;
            }
            else if ($(this).html().endsWith('20')) {
                st = 10;
                fn = 20;
            }
            else if ($(this).html().endsWith('30')) {
                st = 20
                fn = 30;
            }
            else if ($(this).html().endsWith('40')) {
                st = 30;
                fn = 40;
            }
            else if ($(this).html().endsWith('+')) {
                newarr = arr.filter(function (i) {
                    return i.price > 40
                });
                fill(newarr);
                return;
            }
            newarr = arr.filter(function (i) {
                return i.price >= st && i.price <= fn;
            });
            newarr.sort(function (a, b) {
                return a.price - b.price;
            });
            fill(newarr);
        });


        fill(arr);

    })

})
