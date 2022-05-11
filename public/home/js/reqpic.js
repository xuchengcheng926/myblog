
window.onload = function() {
    const changeData = (pageNum) => {
        datalist = null
        $.ajax({
            url: "/home/pic",
            data: {page: pageNum},
            type: "GET",
            dataType: "json",
            success: function(data) {
                // data = jQuery.parseJSON(data);  //dataType指明了返回数据为json类型，故不需要再反序列化
                if (data.error == 0 ) {
                    datalist = data.data;
                    // console.log(datalist)

                    for (var i = 0; i < imgs.length; i++){
                        imgs[i].src = datalist[i].image_url
                        imgs[i].alt = datalist[i].title
                        
                        titles[i].textContent = datalist[i].title
                        titles[i].href = datalist[i].work_url
                        
                        // des_texts[i].textContent =  datalist[i].describtion
                        des_texts[i].innerHTML = datalist[i].describtion

                        des_tags[i].textContent =  datalist[i].tags
                    }
                }
            },
            async: true
        })
    }
    const changeBackUrl = function() {
        var backpic = document.getElementsByClassName('backpic')[0]
       
        $.ajax({
            url: "/home/pic",
            data: {page: 1},
            type: "GET",
            dataType: "json",
            success: function(data) {
                if (data.error == 0 ) {
                    var picurl = data.data[0].image_url;
                    // console.log(picurl)
                    backpic.style.backgroundImage = `url(${picurl})`
                }
            },
            async: true
        })
    }
    changeBackUrl()
    
    
    var innerdiv = ''
    var tem = 
    `<div class="articale-card">
        <h3><a href="" target="view_window" class="conts-titlename"></a></h3>
        <h5><div class="conts-text-tags"> </h5>
        <div class="fakeimg"><img class="img-responsive" alt="140x140" src="" /></div>
        <p><div class="conts-text-descs"> </div> </p>         
    </div> `
    for (var i=0; i<5; i++) {
        innerdiv += tem
    }
    var cards = document.getElementById("articale-cards")
    cards.innerHTML = innerdiv
    // console.log(cards)
    
    // var num = Math.ceil(Math.random()*400);
    var num = 1
    var btone = document.getElementById('btone')
    var bttwo = document.getElementById('bttwo')
    var btthree = document.getElementById('btthree')
    var btfour = document.getElementById('btfour')
    var btchange = document.getElementById('btchange')
    var btchangetext = document.getElementById('btchange_text')
    var imgs = document.getElementsByClassName('img-responsive')
    var titles = document.getElementsByClassName('conts-titlename')
    var des_texts = document.getElementsByClassName('conts-text-descs')
    var des_tags = document.getElementsByClassName('conts-text-tags')

    changeData(num)
    
    btchange.onclick = function(){
        var pagnum = parseInt(btchangetext.value)
        // console.log(pagnum<400, btchangetext.value)
        if(btchangetext.value && pagnum <400 && pagnum > 0){
            num = pagnum
            // console.log(num, btchangetext.value)
            changeData(num)
            btchangetext.value = ''
            document.documentElement.scrollTop=0
        }
        
    }

    btthree.onclick = btone.onclick = function() {
        if (num == 1){
            alert('这是首页，没法往前了')
            return
        }
        num = num-1
        changeData(num)
        document.documentElement.scrollTop=0
    }
    btfour.onclick = bttwo.onclick = function() {
        num = num+1
        changeData(num)
        document.documentElement.scrollTop=0
    }
 
}
