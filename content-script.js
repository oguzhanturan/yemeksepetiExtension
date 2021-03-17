function hideButtonLoader(){
    var history = [];
    const cigkofteciArr = [];

    history = getCookie("hideHistory") ? JSON.parse(getCookie("hideHistory")): [];
    console.log(history);
    console.log("cookie  :" ,getCookie("hideHistory"));

    function arrayRemove(arr, value) { 
    
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }
    
    function setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }
    
    function getCookie(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    }

    function removeCookie(name) {   
        document.cookie = name+"= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    }

    function createFilterItem(id){
          
        var listItem = document.createElement("a");        
        listItem.setAttribute("class" , "externalShowButton");
        listItem.setAttribute("style" ,"text-transform: capitalize");
        listItem.setAttribute("id",id);
        listItem.textContent = '- (X) - ' + id.replaceAll("-", " ");

        var minesIcon = document.createElement("i");
        minesIcon.setAttribute("class" ,"fa fa-times fa-lg");
        minesIcon.setAttribute("style" ,"padding:2px");

        return listItem;
    }

    function hideUpperParents(element, levels) {
        if (levels == 1) return element.parentNode || element;
        if (levels < 1) return element;
        return hideUpperParents(element.parentNode || element, levels - 1);
    }

    var element = document.getElementsByClassName("restaurant-info");

    for (let i = 0; i < element.length; i++) {
        var restaurantName = document.getElementsByClassName("restaurantName")[i].getAttribute("href").substr(1);
        if(restaurantName.includes("cig-kofte") || restaurantName.includes("cigkofte")){
            cigkofteciArr.push(restaurantName);
        }
        var para = document.createElement("p");
        para.setAttribute("class", "externalHideButton");
        para.setAttribute("id", restaurantName),
        para.innerHTML = '<i class="fa fa-eye-slash fa-lg" aria-hidden="true"></i>&nbsp;';
        var node = document.createTextNode("Gizle");
        para.appendChild(node);
        para.style.cursor = "pointer"
        element[i].appendChild(para);
    }

    var html = `
        <div class="select-box-inline"> 
            <div class="ys-filter-info"> 
                <i class="ys-icons ys-icons ys-icons-Standard-filterIcons-super-delivery-active" data-hasqtip="0"></i>
                <i class="ys-icons ys-icons ys-icons-Standard-filterIcons-super-delivery-passive"></i>
                <span class="filterName">Gizlenmiş Restoranlar</span>
            </div>
        </div> 
        <span class="showAction"> <i class="ys-icons"></i></span>
    `;

    var htmlHideCigkofteci = `
    <div class="filter superDeliveryFilter"> 
        <div class="checkbox-inline"> <label> 
            <input type="checkbox" name="cigkoftecigizle" id="cigkoftecigizle"> 
                <i class="ys-icons ys-icons ys-icons-Standard-filterIcons-super-delivery-active" data-hasqtip="0"></i>
                <i class="ys-icons ys-icons ys-icons-Standard-filterIcons-super-delivery-passive"></i> <div class="ys-filter-info"> 
                <span class="filterName cigkoftecigizle">Çiğköftecileri Gizle</span> 
            </div> 
        </label>
    </div> </div>
    `;
    //<div id="content-1" style="display:none; padding:10px 10px; margin-right:10px!important;text-transform: capitalize;"></div>

    var menuElement = document.createElement("div");
    menuElement.setAttribute("class", "filter cuisineFilter select-box expandhidemenu");
    menuElement.innerHTML = html;
    document.getElementsByClassName('ys-left-filter')[0].appendChild(menuElement);

    var listElement = document.createElement("div");
    listElement.setAttribute("id", "content-1");
    listElement.setAttribute("class", "filter cuisineFilter select-box");
    listElement.setAttribute("style", "style='display:none; padding:10px 10px; margin-right:5px!important;'");
    document.getElementsByClassName('ys-left-filter')[0].appendChild(listElement);

    var cigkofteci = document.createElement("div");
    cigkofteci.innerHTML = htmlHideCigkofteci;
    document.getElementsByClassName('ys-left-filter')[0].appendChild(cigkofteci);


    $('.externalHideButton').click(function () {
        
        history.push(this.id);
        setCookie("hideHistory",JSON.stringify(history),3);

        let hideElement = hideUpperParents(this, 4);
        hideElement.style.display = 'none';

        let filterListItem = createFilterItem(this.id);
      
        //document.getElementById('content-1').appendChild(minesIcon);
        document.getElementById('content-1').appendChild(filterListItem);

    });
    
    $(document).on( "click", "#cigkoftecigizle", function(){
        
        $('#fluency').change(function() 
        {
          if(this.checked != true)
          {
               alert('you need to be fluent in English to apply for the job');
          }
         });   

        cigkofteciArr.forEach(function(e){
            console.log(document.getElementById(e));
            let hideElement = hideUpperParents(document.getElementById(e), 4);
            hideElement.style.display = 'none';
        });
        //let hideElement = hideUpperParents(this, 4);
        //hideElement.style.display = 'none';
    });

    $(document).on( "click", ".externalShowButton", function(){
        //href="/bolbi-kumru-ayvalik-tantuni-yenimahalle-ostim-mah-ankara"
        //bolbi-kumru-ayvalik-tantuni-yenimahalle-ostim-mah-ankara
        let id = this.id.replaceAll(" ", "-");
        history =  arrayRemove(history , id)
        console.log(id);
        setCookie("hideHistory",JSON.stringify(history),3);

        var els = document.querySelectorAll("a[href='/"+id+"']");
        console.log(els);
        els.forEach(function (e) {
            let parentElement = hideUpperParents(e, 4);
            parentElement.setAttribute("style", "display:");
        });
        document.getElementById('content-1').removeChild(this);
    } );


    $('.expandhidemenu').click(function () {
        let status = document.getElementById('content-1').style.display;
        if (status === "none") {
            document.getElementById('content-1').style.display = ""
        } else {
            document.getElementById('content-1').style.display = "none"
        }
    });    

    history.forEach(function (e) {
        document.getElementById('content-1').appendChild(createFilterItem(e));
        //console.log(document.getElementById(e));
        let element = document.querySelector('p[class="externalHideButton"][id="'+e+'"]');
        let hideElement = hideUpperParents(element, 4);
        hideElement.setAttribute("style","display: none")
        console.log(hideElement);

    });

}

$(document).ready(function () {
    hideButtonLoader();
});