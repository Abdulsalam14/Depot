function common() {


    let basketitems = [];
    let arr = [];
    function refreshbasket(sku) {
        let elementIndex = basketitems.findIndex(a => a.item.sku === sku);

        if (elementIndex !== -1) {
            console.log("rrr")
            basketitems.splice(elementIndex, 1);
            updatebasket();
            fillMainCart();
        }
        else {
            console.log('sssd')
        }
    }

    function updatebasket() {
        localStorage.setItem("basket", JSON.stringify(basketitems));
        basketitems = JSON.parse(localStorage.getItem('basket'));
    }


    function fillMainCart() {
        let total = 0;
        let content = "";
        basketitems.forEach(i => {
            total += i.item.price * i.itemcount;
            content += `
        <div class="maincart-li">
            <div class="for-li-img">
            <img src="${i.item.images[0]}" alt="">
            </div>
            <div class="lili">
                <div class="li-text">
                <h3>${i.item.title}</h3>
                <p data-card-id="${i.item.sku}" class="li-x">X</p>
                </div>
                <div class="for-price">
                    <span class="item-count">${i.itemcount}x</span>
                    <span class="price pr-nd">$${i.item.price}</span>
                </div>
            </div>
        </div>`
        })
        $(".totall").html(`(<span><span>$</span>${total}</span>)`)
        $(".full-cart-total .price").html(`$${total}`);
        $(".full-cart .maincart-ul").html(content);
    }




    function processCarts() {
        $(".li-x").click(function () {
            let id = $(this).data('card-id');
            refreshbasket(id)
        })
    }


    $(document).ready(function () {
        // $(".st").css('height', '100vh');
        $(".ssa").css('left', '35%')
        $(".th").css('left', '48%')


        let hovertimeout11;
        let hoverTimeout22;
        $(".widget-cart").mouseenter(function () {
            clearTimeout(hoverTimeout22);
            hovertimeout11 = setTimeout(function () {
                basketitems = JSON.parse(localStorage.getItem('basket'));
                if (basketitems.length == 0) {
                    $(".full-cart").hide();
                    $(".for-empty").show();
                }
                else {
                    $(".for-empty").hide();
                    fillMainCart();
                    $(".full-cart").show();
                    processCarts();
                }
            }, 100)
        });


        $(".widget-cart").mouseleave(function () {
            hoverTimeout22 = setTimeout(function () {
                $(".full-cart").hide();
                $(".for-empty").hide();
            }, 100)
            clearTimeout(hovertimeout11)
        });

    });



    $(document).ready(function () {
        $('#menubtn').click(function () {
            $('.right-menu').addClass('active');
        });

        $('#xbtn').click(function () {
            $('.right-menu').removeClass('active');
        });


    });

    function calculateTotal() {
        if (localStorage.getItem('basket') === null) {
            localStorage.setItem('basket', JSON.stringify(basketitems))
        }
        else {
            basketitems = JSON.parse(localStorage.getItem('basket'));
        }
        let total = Number(0);
        if (basketitems.length > 0) {
            basketitems.forEach(i => {
                total += i.item.price * i.itemcount;
            })
        }
        $(".totall").html(`(<span><span>$</span>${total}</span>)`)
    }

    $(document).ready(function () {
        calculateTotal();
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






        $('.inner-li').mouseenter(function () {


            $(this).find(".tam").css('margin-left', '10px')

            $(this).find("i").css('margin-right', '5px')
            $(this).find(".tam").css('margin-left', '0px')
        });

        $('.inner-li').mouseleave(function () {
            $(this).find(".tam").css('margin-left', '-13px')
            $(this).find("i").css('margin-right', '0px')
        });


        // $(".shopping-cart").hide();



        function processCartitems() {
            $(".remove-product").click(function () {
                let id = $(this).parent().data('cart-id');
                let element = basketitems.find(i => i.item.sku == id);
                if (element) {
                    basketitems.splice(basketitems.indexOf(element), 1);
                }
                updatebasket();
                fillMainCart();
                fillcart();
            })


            $(".count-left-cart").click(function () {
                let id = $(this).parent().data('cart-id');
                let element = basketitems.find(i => i.item.sku == id);
                if (element) {
                    let index = basketitems.indexOf(element);
                    if (element.itemcount > 1) {
                        element.itemcount -= 1;
                        basketitems[index] = element;
                    }
                    else {
                        basketitems.splice(index, 1)
                    }
                }
                updatebasket();
                fillMainCart();
                fillcart();
            })

            $(".count-right-cart").click(function () {
                console.log("ASD")
                let id = $(this).parent().data('cart-id');
                let element = basketitems.find(i => i.item.sku == id && i.itemcount < 500);
                if (element) {
                    let index = basketitems.indexOf(element);
                    element.itemcount += 1;
                    basketitems[index] = element;
                }
                updatebasket();
                fillMainCart();
                fillcart();
            })

            let fortotal=false;
            $(".for-radio input").click(function (e) {
                $(".for-radio input").prop('checked', false)
                $(this).prop('checked', true);
                index = $(this).data('index');
                if (index == 2) {
                    let total = parseFloat($("#totals-total").text().replace('$', ''));
                    $("#totals-total").html(`$${total+=10}`);
                    fortotal=true;
                }
                else{
                    if(fortotal){
                        let total = parseFloat($("#totals-total").text().replace('$', ''));
                        $("#totals-total").html(`$${total-=10}`);
                        fortotal=false;
                    }
                }
            })
        }



        let sku = 0;


        let i = 0;

        let count = 1;


        let count2 = 1


        function fillcart() {
            if (basketitems.length == 0) {
                $(".shopping-cart").hide();
                $(".for-cart-empty").show();
            }
            else {
                total = 0;
                content = "";
                basketitems.forEach(i => {
                    total += i.item.price * i.itemcount;
                    content += `
                    <div class="shop-cart-item" data-cart-id="${i.item.sku}">
                                <span class="remove-product">X</span>
                                <div class="cartitem-img">
                                    <img src=${i.item.images[0]} alt="">
                                </div>
                                <h3 class="cartitem-title">${i.item.title}</h3>
                                <span class="cartitem-price">${i.item.price}</span>
                                <div class="count">
                                    <span>Quantity</span>
                                    <div class="counter" data-cart-id="${i.item.sku}">
                                        <i class="fa-solid fa-chevron-left count-left-cart"></i>
                                        <span>${i.itemcount}</span>
                                        <i class="fa-solid fa-chevron-right count-right-cart"></i>
                                    </div>
                                </div>
                                <span class="cartitem-totalprice">$${i.item.price * i.itemcount}</span>
                            </div>
                    `
                })
                $("#subtotal").html(`$${total}`);
                $("#totals-total").html(`$${total}`);
                $(".shop-cart-items").html(content);
                $(".shopping-cart").show();

                processCartitems()

            }
        }


        fillcart();


    })

}




function process() {

    let tabs = document.querySelectorAll(".tabs div")
    let contents = document.querySelectorAll(".content div")


    for (let tab of tabs) {
        tab.addEventListener("click", function () {
            let activeElement = document.querySelector(".active")
            activeElement.classList.remove("active")
            this.classList.add("active")

            let index = this.getAttribute("data-index")

            for (let content of contents) {
                if (index == content.getAttribute("data-index")) {
                    content.classList.add("show")
                } else {
                    content.classList.remove("show")
                }
            }

        })
    }

}



common()