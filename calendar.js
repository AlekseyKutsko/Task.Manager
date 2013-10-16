var monthName = ['января', 'февраля', 'марта', 'апреля', 'мая',
    'июня', 'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'],
    monthName2 = ['январь', 'февраль', 'март', 'апрель', 'май',
    'июнь', 'июль', 'август', 'сентябрь',
    'октябрь', 'ноябрь', 'декабрь'],
    kvartalName = ['I', 'II', 'III', 'IV'],
    monthHTML = document.getElementById('month'),
    yearHTML = document.getElementById('year'),
    kvartalHTML = document.getElementById('kvartal');

function createCalendar(id, year, month) {
    var weekDay = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        date = new Date(year, month),
        dayCount = (new Date(year, month + 1, 0)).getDate(),
        dayNum = 1 - (date.getDay() == 0 ? 7 : date.getDay()),
        nowDay = now.getDate(),
        parent = document.getElementById(id);
    parent.innerHTML = '';
    var table = document.createElement('table');

    // первая строка шапки календаря
    var tr = document.createElement('tr');
    tr.className = 'borderBottom';
    // листать влево
    var button = document.createElement("button");
    button.className = 'btn left';
    button.setAttribute('onclick', 'createCalendar("calendar", ' + year + ', ' + (month - 1) + ')');
    var elem = document.createElement("th");
    elem.appendChild(button);
    tr.appendChild(elem);

    // месяц год
    var cell = nowDay + ' ' + monthName[date.getMonth()] + ' ' + date.getFullYear() + ' г';
    elem = document.createElement('th');
    elem.setAttribute('colspan', '5');
    elem.appendChild(document.createTextNode(cell));    
    tr.appendChild(elem);

    // листать вправо
    button = document.createElement("button");
    button.className = 'btn right';
    button.setAttribute('onclick', 'createCalendar("calendar", ' + year + ', ' + (month + 1) + ')');
    var elem = document.createElement("th");
    elem.appendChild(button);
    tr.appendChild(elem);
    table.appendChild(tr);

    // вторая строка шапки и тело календаря
    for (var row = 0; dayNum < dayCount; row++) { // создавать строки, если в них есть хоть один день.
      var tr = document.createElement('tr');
      table.appendChild(tr);
      
      for (var col = 0; col < 7; col++) {  // заполняем строку днями
        if (row == 0) {     
		  // заполнение шапки календаря
          elem = document.createElement('th');
          cell = weekDay[col];
          if(col > 4){
              elem.className = 'weekDays';
          }
        } else {
		  // заполнение тела календаря
          dayNum++;
          elem = document.createElement('td');
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
      }
      
    }
    parent.appendChild(table);

    changeDate(year, month, monthName2);

 }
     //вставка месяца, квартала, года в левое меню

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
                    var evt = event || window.event;
                    evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
                    createCalendar('calendar', +yearHTML.textContent, i);
                    changeDate(+yearHTML.textContent, i, monthName2);
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
                    var evt = event || window.event;
                    evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
                    switch(i){
                        case 0: {
                            createCalendar('calendar', +yearHTML.textContent, i);
                            changeDate(+yearHTML.textContent, i, monthName2);
                            break;
                        }
                        case 1: {
                            createCalendar('calendar', +yearHTML.textContent, i + 2);
                            changeDate(+yearHTML.textContent, i + 2, monthName2);
                            break;
                        }
                        case 2: {
                            createCalendar('calendar', +yearHTML.textContent, i + 4);
                            changeDate(+yearHTML.textContent, i + 4, monthName2);
                            break;
                        }
                        case 3: {
                            createCalendar('calendar', +yearHTML.textContent, i + 6);
                            changeDate(+yearHTML.textContent, i + 6, monthName2);
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

            currYear.onkeydown = function(event){
                var monthName = monthHTML.textContent;
                if((event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 48 && event.keyCode <= 57)){
                console.log(event.keyCode);
                }
                if(event.keyCode == 13){
                    for(var i = 0; i <= monthName2.length; i++){
                        if(monthName == monthName2[i]){
                            createCalendar('calendar', +currYear.value, i);
                            changeDate(+currYear.value, i, monthName2);
                            txt.parentNode.removeChild(txt);
                        }
                    }
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

document.onclick = function(event){
    closeMenu('curMonth', event);
    closeMenu('curKvartal', event);
    closeMenu('curYear', event)
};

var now = new Date;
