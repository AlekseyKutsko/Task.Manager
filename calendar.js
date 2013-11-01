var monthName = ['января', 'февраля', 'марта', 'апреля', 'мая',
    'июня', 'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'],
    monthName2 = ['январь', 'февраль', 'март', 'апрель', 'май',
    'июнь', 'июль', 'август', 'сентябрь',
    'октябрь', 'ноябрь', 'декабрь'],
    kvartalName = ['I', 'II', 'III', 'IV'],
    monthHTML = document.getElementById('month'),//Месяц в лев.меню
    yearHTML = document.getElementById('year'),//год в лев.меню
    kvartalHTML = document.getElementById('kvartal'),//квартал в лев.меню
    cellMonth;//месяц в шапке календаря

if(window.localStorage){
    storage = window.localStorage;//локальное хранилище
}else{
    alert('No');
}

function createCalendar(id, year, month) {
    var weekDay = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        date = new Date(year, month),
        dayCount = (new Date(year, month + 1, 0)).getDate(),
        dayNum = 1 - (date.getDay() == 0 ? 7 : date.getDay()),
        nowDay = now.getDate(),
        parent = document.getElementById(id);
    parent.innerHTML = '';
    var table = document.createElement('table'),
        tbody = document.createElement('tbody');

    // первая строка шапки календаря
    var tr = document.createElement('tr');
    tr.className = 'borderBottom';
    // листать влево
    var button = document.createElement("button");
    button.className = 'btn left';
    button.setAttribute('onclick', 'createCalendar("calendar", ' + year + ', ' + (month - 1) + ')');
    //для IE7
    if(button.onclick != "createCalendar('calendar', ' + year + ', ' + (month - 1) + ')"){
        button.onclick = function(){
        createCalendar("calendar", year, (month - 1));
        }
    }
    var elem = document.createElement("th");
    elem.appendChild(button);
    tr.appendChild(elem);

    // месяц год
    var cel = nowDay + ' ' + monthName[date.getMonth()] + ' ' + date.getFullYear() + ' г';
    elem = document.createElement('th');
    elem.colSpan = 5;
    elem.appendChild(document.createTextNode(cel));
    tr.appendChild(elem);

    // листать вправо
    button = document.createElement("button");
    button.className = 'btn right';
    button.setAttribute('onclick', 'createCalendar("calendar", ' + year + ', ' + (month + 1) + ')');
    //для IE7
    if(button.onclick != "createCalendar('calendar', ' + year + ', ' + (month + 1) + ')"){
        button.onclick = function(){
            createCalendar("calendar", year, (month + 1));
        }
    }
    var elem = document.createElement("th");
    elem.appendChild(button);
    tr.appendChild(elem);
    tbody.appendChild(tr);

    // вторая строка шапки и тело календаря
    for (var row = 0; dayNum < dayCount; row++) { // создавать строки, если в них есть хоть один день.
      var tr = document.createElement('tr');
      tbody.appendChild(tr);

      for (var col = 0; col < 7; col++) {  // заполняем строку днями
        if (row == 0) {     
		  // заполнение шапки календаря
		  var cell = weekDay[col],
              elem = document.createElement('th');
              elem.className = 'nowDate';
          if(col > 4){
              elem.className = 'weekDays';
          }
        } else {
		  // заполнение тела календаря
          dayNum++;
          var elem = document.createElement('td');
          //Отмена выделения
          elem.onmousedown = function(){return false};
          elem.onselectstart = function(){return false};
          elem.className = 'out';
          if ((dayNum > 0) && (dayNum <= dayCount)) {
            elem.className = 'day';
            cell = dayNum;
          }
            cell = (new Date(year, month, dayNum)).getDate();
        }
        // заполняем ячейку календаря
        elem.appendChild(document.createTextNode(cell));
        tr.appendChild(elem);

        //Отображение текущей даты. cellYear, cellMonth - глобальные переменные
          cellYear = +cel.slice(-6, -2);
          if(elem.tagName == 'TD'){
              if(elem.className == 'day'){
                  switch(nowDay.toString().length){
                      case 1 : {
                          cellMonth = cel.slice(2,5);
                          break;
                      }
                      case 2: {
                          cellMonth = cel.slice(3,6);
                          break;
                      }
                  }
              }
          }

          if(now.getFullYear() == cellYear){
              if(monthName2[now.getMonth()].slice(0,3) == cellMonth)
                  if(nowDay == dayNum){
                      elem.className = 'nowDate';
                  }
              }
          }

    }

    table.appendChild(tbody);
    parent.appendChild(table);

    changeDate(year, month, monthName2);

    actualDate(now.getFullYear(), monthName[now.getMonth()], nowDay);

 }
     //Левое меню

function workLeftMenu(year, month){
     var date = new Date(year, month),
         leftMenu = document.getElementById('leftMenu'),
         monthLi = leftMenu.getElementsByTagName('li')[0],
         kvartalLi = leftMenu.getElementsByTagName('li')[1],
         yearLi = leftMenu.getElementsByTagName('li')[2];

    //выбор месяца, года, квартала

     monthLi.onclick = function(){

         if(!document.getElementById('curMonth')){
             var ul = document.createElement('ul');
             ul.setAttribute('id', 'curMonth');
             this.appendChild(ul);
             ul.className = 'activeMenu';

             for(var i = 0; i < monthName2.length; i++)(function(i){
                 var currMonth = document.createElement('li'),
                     textMonth = document.createTextNode(monthName2[i]);
                 currMonth.appendChild(textMonth);
                 ul.appendChild(currMonth);

                 currMonth.onclick = function(event){
                    var evt = event || window.event,
                        textCont = yearHTML.textContent || yearHTML.innerText; //IE8(innerText)
                    evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
                        createCalendar('calendar', +textCont, i);
                        changeDate(+textCont, i, monthName2);
                        this.parentNode.parentNode.removeChild(ul);
                 };
             })(i);
         }
    };

    kvartalLi.onclick = function(){
        if(!document.getElementById('curKvartal')){
            var ul = document.createElement('ul');
            ul.setAttribute('id', 'curKvartal');
            this.appendChild(ul);
            ul.className = 'activeMenu';

            for(var i = 0; i < 4; i++)(function(i){
                var currKvartal = document.createElement('li'),
                    textKvartal = document.createTextNode(kvartalName[i]);
                currKvartal.appendChild(textKvartal);
                ul.appendChild(currKvartal);

                currKvartal.onclick = function(event){
                    var evt = event || window.event,
                        textCont = yearHTML.textContent || yearHTML.innerText; //IE8(innerText)
                    evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
                    switch(i){
                        case 0: {
                            createCalendar('calendar', +textCont, i);
                            changeDate(+textCont, i, monthName2);
                            break;
                        }
                        case 1: {
                            createCalendar('calendar', +textCont, i + 2);
                            changeDate(+textCont, i + 2, monthName2);
                            break;
                        }
                        case 2: {
                            createCalendar('calendar', +textCont, i + 4);
                            changeDate(+textCont, i + 4, monthName2);
                            break;
                        }
                        case 3: {
                            createCalendar('calendar', +textCont, i + 6);
                            changeDate(+textCont, i + 6, monthName2);
                            break;
                        }
                    }
                    this.parentNode.parentNode.removeChild(ul);
                };
            })(i);
        }
    };

    yearLi.onclick = function(){
        if(!document.getElementById('curYear')){
            var txt = document.createElement('input');
            txt.setAttribute('id', 'curYear');
            txt.setAttribute('placeholder', 'введите год');
            this.appendChild(txt);
            txt.className = 'activeMenu';
            var currYear = document.getElementById('curYear');
            txt.focus();

            currYear.onkeypress = function(event){
                var evt = event || window.event,
                    chr = getChar(evt),
                    monthName = monthHTML.textContent || monthHTML.innerText; //IE8(innerText)

                if (evt.ctrlKey || evt.altKey || evt.metaKey) return;

                if(evt.keyCode == 13){
                    for(var i = 0; i <= monthName2.length; i++){
                        if(monthName == monthName2[i]){
                            createCalendar('calendar', +currYear.value, i);
                            changeDate(+currYear.value, i, monthName2);
                            txt.parentNode.removeChild(txt);
                        }
                    }
                }

                if (chr == null) return;

                if (chr < '0' || chr > '9') {
                    return false;
                }
            };
        }
    }

}

//смена месяца, года, квартала в левом меню

function changeDate(year, month, monthArray){
    var date = new Date(year, month);
    monthHTML.innerHTML = monthArray[date.getMonth()];
    yearHTML.innerHTML = date.getFullYear();
    if(date.getMonth() < 3){
        kvartalHTML.innerHTML = 'I';
    } else if(date.getMonth() > 2 && date.getMonth() < 6){
        kvartalHTML.innerHTML = 'II';
    } else if(date.getMonth() > 5 && date.getMonth() < 9){
        kvartalHTML.innerHTML = 'III';
    } else if(date.getMonth() > 8 && date.getMonth() < 12){
        kvartalHTML.innerHTML = 'IV';
    }
}

//закрытие меню месяца, года, квартала

function closeMenu(id, event){
    if(document.getElementById(id)){
        var elem = document.getElementById(id),
            parent = elem.parentNode,
            evt = event || window.event,
            target = evt.target || evt.srcElement;
        if(target != parent){
            elem.parentNode.removeChild(elem);
        }
    }
}


// event.type должен быть keypress
function getChar(event) {
    if (event.which == null) {  // IE
        if (event.keyCode < 32) return null; // спец. символ
        return String.fromCharCode(event.keyCode)
    }

    if (event.which != 0 && event.charCode != 0) { // все кроме IE
        if (event.which < 32) return null; // спец. символ
        return String.fromCharCode(event.which); // остальные
    }

    return null; // спец. символ
}

//Текущая дата в шапке

function actualDate(year, month, day){
    var actualDateSpan = document.getElementById('actualData');
        actualDateSpan.innerHTML = day + ' ' + month + ' ' + year + ' г';
}

//Работа вкладок правой колонки

function workTabs(){
    var taskBox = document.getElementById('task');
    taskBox.onclick = function(event){
        var evt = event || window.event,
            target = evt.target || evt.srcElement;
        if(target.tagName == 'A'){
            removeClass($('.zIndex'),'zIndex');
            removeClass($('.active'),'active');
            var href = target.getAttribute('href');
            addClass(document.getElementById(href),'active');
            addClass(target.parentNode,'zIndex');
            return false;
        }
    }
}

//Popap

function popap(){
    var div = document.createElement('div'),
        btnClose = document.getElementById('close'),
        btnOpen = document.getElementById('calendar'),
        btnCreate = document.getElementById('createBtn'),
        textArea = $('div#popap form input[type="text"]'),
        pop = document.getElementById('popap');
    btnOpen.ondblclick = function(event){
        var evt = event || window.event,
            target = evt.target || evt.srcElement;
        if(target.tagName == 'TD'){
            var textCont = target.textContent || target.innerText; //IE8(innerText)
            addClass(div,'popap');
            pop.style.display = 'block';
            textArea.value = 'Введите Вашу задачу';
            textArea.style.color = 'silver';
            document.documentElement.appendChild(div);
            document.onmousewheel = document.onwheel = function() {
                return false;
            };

            btnCreate.onclick = function(){
                for(var i = 0; i < monthName2.length; i++){
                    if(monthName2[i].slice(0,3) == cellMonth){
                        alert(+textCont + ' ' + monthName[i] + ' ' + cellYear);
                        pop.style.display = 'none';
                        removeClass(div, 'popap');
                        document.documentElement.removeChild(div);
                    }
                }
            };

            btnClose.onclick = function(){
                pop.style.display = 'none';
                removeClass(div, 'popap');
                document.documentElement.removeChild(div);
                document.onmousewheel = document.onwheel = null;
            };

            textArea.onfocus = function(){
                if(this.value == 'Введите Вашу задачу'){
                    this.style.color = 'black';
                    this.value = '';
                }
            };

        }
    };
}

document.onclick = function(event){
    closeMenu('curMonth', event);
    closeMenu('curKvartal', event);
    closeMenu('curYear', event)
};

var now = new Date;

//Обращение к элементу по селектору

function $(selector){
    return document.querySelector(selector);
}

//Часы

function clock() {
    var el = document.getElementById("clock");
    var now = new Date();
    el.innerHTML = now.toLocaleTimeString();
    setTimeout(clock,1000);
}

//Функции для работы с классами

function addClass(elem, cls) {
    var el = (elem.className) ? elem.className.split(' ') : [];
    for(var i = 0,len = el.length; i < len; i++){
        if(el[i] == cls){continue};
    };

    el.push(cls);
    elem.className = el.join(' ');
}

function removeClass(el, cls) {
    var c = el.className.split(' ');
    for (var i=0; i<c.length; i++) {
        if (c[i] == cls) c.splice(i--, 1);
    }

    el.className = c.join(' ');
}

function hasClass(el, cls) {
    for (var c = el.className.split(' '),i=c.length-1; i>=0; i--) {
        if (c[i] == cls) return true;
    }
    return false;
}