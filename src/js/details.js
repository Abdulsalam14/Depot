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
        else{
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





        function processCards() {

            $('.card').mouseenter(function () {
                $(this).find('.card-hover-2').css('bottom', '0%');

            })

            $('.card').mouseleave(function () {
                $(this).find('.card-hover-2').css('bottom', '-12%');
            })



            $('.quick').click(function (event) {
                var cardId = $(this).data('card-id');
                sku = cardId
                quickFill(sku)
                $('.overlay').show();
                $('.for-quick').fadeIn(300);
                count = 1
                event.stopPropagation();
            });

            $('#quickx').click(function () {
                $('.overlay').hide();
                $('.for-quick').fadeOut(300);
                $('.for-quick').remove();
                element = "";
                i = 0;

            });

            $('.overlay').click(function () {
                $(this).hide();
                $('.for-quick').fadeOut(300);
                $('.for-quick').remove();
                element = "";
                i = 0
                count = 1;
            });

            $(".add-to-cart").click(function (e) {
                let id = $(this).data('card-id');
                let element = arr.find(a => a.sku == id);
                let basketitem = {
                    item: element,
                    itemcount: 1
                }

                let itemindex = basketitems.findIndex(item => item.item.sku == basketitem.item.sku);
                if (itemindex !== -1) {
                    basketitems[itemindex].itemcount += basketitem.itemcount;
                }
                else {
                    basketitems.push(basketitem);
                }
                updatebasket();
                fillMainCart();
                e.stopPropagation();
            })


            $(".card").click(function () {
                let id = $(this).data('card-id');
                localStorage.setItem('selecteditem', id)
                location.href = "detail.html";
            })

        }

        let sku = 0;


        let i = 0;

        let count = 1;


        let count2 = 1

        function processSelected(element2) {
            $('#count-right-dt').click(function () {

                if (count2 <= 500) count2++;
                $('.detail-item-txt-count .counter span').html(count2)

            });
            $('#count-left-dt').click(function () {

                if (count2 > 1) count2--;
                $('.detail-item-txt-count .counter span').html(count2)

            });

            $('#addbtn-dt').click(function () {
                let basketitem = {
                    item: element2,
                    itemcount: count2
                }
                let itemindex = basketitems.findIndex(item => item.item.sku == basketitem.item.sku);
                if (itemindex !== -1) {
                    basketitems[itemindex].itemcount += basketitem.itemcount;
                }
                else {
                    basketitems.push(basketitem);
                }
                updatebasket();
                fillMainCart();
                count2 = 1;
                $('.detail-item-txt-count .counter span').html(count2)
            });
        }


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
                $('.overlay').hide();
                $('.for-quick').fadeOut();
                $('.for-quick').remove();
                count = 1;

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
                console.log(count)
                $('.qtxt-count .counter span').html(count)

            });
            $('#count-left').click(function () {

                if (count > 1) count--;
                $('.qtxt-count .counter span').html(count)

            });

            $('.addbtn').click(function () {
                let basketitem = {
                    item: element,
                    itemcount: count
                }
                let itemindex = basketitems.findIndex(item => item.item.sku == basketitem.item.sku);
                if (itemindex !== -1) {
                    basketitems[itemindex].itemcount += basketitem.itemcount;
                }
                else {
                    basketitems.push(basketitem);
                }
                updatebasket();
                fillMainCart();
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
                    <div class="card" data-card-id="${element.sku}">
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
                        <span class="add-to-cart" data-card-id="${element.sku}">Add To Cart</span>
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
            for (let i = 0; i < response.items.length; i++) {
                const element = response.items[i];
                arr.push(element);
            }
            let id = localStorage.getItem('selecteditem');
            let selected = arr.find(e => e.sku == id);

            let categories = ""
            let tags = "";
            console.log(selected)
            for (let i = 0; i < selected.categories.length; i++) {
                categories += selected.categories[i];
                if (i < selected.categories.length - 1) categories += ","

            }

            for (let i = 0; i < selected.tags.length; i++) {

                tags += selected.tags[i];
                if (i < selected.tags.length - 1) tags += ","

            }

            let oldprice;
            if (selected.sale != '0') {
                let a = Number(selected.sale) / 100;
                oldprice = Math.ceil(Number(selected.price) / (1 - a));
            }
            else {
                oldprice = ""
            }

            let newarr = [];
            arr.forEach(a => {
                a.material.includes(selected.material[0])
                if (newarr.length < 4 && a != selected) newarr.push(a)
            })
            content = `
            
            <div class="item-detail">
                <h2><ahref="index.html">Home</a>/<a href="sidebar.html">With-Sidebar</a>/<a>${categories}</a>/<a>${selected.title}</a></h2>
                <div class="item-full">
                    <div class="images">
                        <div class="other-images">
                            <div class="other-images-item">
                                <img src="${selected.images[1]}" alt="">
                            </div>
                            <div class="other-images-item">
                                <img src="${selected.images[2]}"  alt="">
                            </div>
                            <div class="other-images-item">
                                <img src="${selected.images[3]}"  alt="">
                            </div>
                            <div style="margin-bottom: 0;" class="other-images-item">
                                <img src="${selected.images[4]}"  alt="">
                            </div>
                        </div>
                        <div class="main-image">
                            <img src="${selected.images[0]}"  alt="">
                        </div>
                    </div>
                    <div class="info-detail-item">
                        <div class="detail-item-txt">
                            <div class="detail-item-txt-top">
                                <h3>${selected.title}</h3>
                                <h5><span class='for-line'>${oldprice}</span>$${selected.price}</h5>
                            </div>
                            <div class="detail-item-txt-mid">
                                <div class="for-stars">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt itaque perferendis
                                    perspiciatis quos voluptatem nostrum totam dolor, qui aspernatur ex non magnam quae
                                    id odio
                                    laudantium odit ab autem sint.</p>
                            </div>
                            <div class="detail-item-txt-count">
                                <div class="count">
                                    <span>Quantity</span>
                                    <div class="counter">
                                        <i id='count-left-dt' class="fa-solid fa-chevron-left"></i>
                                        <span>${count2}</span>
                                        <i id='count-right-dt' class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div>
                                <div id='addbtn-dt' class="addbtn">
                                    <button>ADD TO CART</button>
                                </div>
                            </div>
                            <div class="detail-item-txt-bot">
                                <i class="fa-regular fa-heart"></i>
                                <p>ADD TO WISHLIST</p>
                            </div>
                            <div class="detail-item-about">
                                <div class="table">
                                    <p>SKU:</p><p id="sku">${selected.sku}</p>
                                </div>
                                <div class="table">
                                    <p>Categories:</p><p id="categories">${categories}</p>
                                </div>
                                <div class="table">
                                    <p>Tags:</p><p id="tags">${tags}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tabs">
                <div class="active" data-index="1">Description</div>
                <div data-index="2">Additional Information</div>
                <div data-index="3">rewiews<span class="review-count">(0)</span></div>
            </div>
        </div>

        <div class="content-back">
            <div class="content">
                <div class="description show" data-index="1">
                    <h2>Description</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non accusamus voluptatum a velit
                        deserunt aliquid ab consequuntur repellat ea eaque corporis dolore quaerat temporibus
                        consectetur, similique magni minus placeat architecto.
                        Reprehenderit ex minima nisi eum ducimus iusto impedit quo omnis aperiam tempora neque eos ipsa
                        veniam rerum, cupiditate explicabo dolor? Repudiandae id eius necessitatibus corrupti aperiam?
                        Vitae libero animi dicta!</p>
                </div>
                <div class="additional" data-index="2">
                    <h2>Additional Information</h2>
                    <div >
                        <div class="table">
                            <p>Wegiht</p><p>2kg</p>
                        </div>
                        <div class="table">
                            <p>Dimensions</p><p>10x10x15</p>
                        </div>
                        <div class="table">
                            <p >Color</p><p id="color">${selected.color}</p>
                        </div>
                        <div class="table">
                            <p >Material</p><p id="material">${selected.material}</p>
                        </div>
                    </div>
                </div>
                <div data-index="3">
                    Empty
                </div>
            </div>
        </div>
        <div style="margin-top: 100px;">
            <h2></h2>
        </div>
        <div class="cards" >
            <h4>Related Products</h4>
            <div class="aa">
                <div class="card-items">
                </div>
            </div>
        </div>
            
            `

            $('.bott').html(content)
            fill(newarr)
            process();
            processCards()
            processCarts()
            processSelected(selected);
        })

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