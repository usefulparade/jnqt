var spreadsheetURL = "https://docs.google.com/spreadsheets/d/13e_i5KqbVlkiy8TYflBQTi_KZAYlboq-NiTY7sLbxNY/edit?usp=sharing";

function setup(){
    init();
}

function init (){
    Tabletop.init( { key: spreadsheetURL,
                   callback: function(data, tabletop) { 
                       
                    //    console.log(dataGlobal);
                    // console.log(data);
                    populateContent(data);
                    //    archive = loadJSON(data);
                   },
                   simpleSheet: true } )

}


function populateContent(sheet){
    console.log(sheet);

    var allYears = sheet.map(function (item){
        return item.Year;
    });
    var uniqueYears = allYears.filter(function(item, index){
        return allYears.indexOf(item) >= index;
    });

    for (i=0;i<uniqueYears.length;i++){
        if (i%2==0){
            yearBlock = createDiv().addClass('pull-right');
            dateBlock = createDiv().addClass('date-block');
            dateHeader = createElement('h1', uniqueYears[i]);
            contentBlock = createDiv('').addClass('archive-content').attribute('id', uniqueYears[i]);
            dateHeader.parent(dateBlock);
            dateBlock.parent(yearBlock);
            contentBlock.parent(yearBlock);

            transitionBlock = createDiv().addClass('transition-r-to-l');

            yearBlock.parent(document.getElementById('archive'));
            transitionBlock.parent(document.getElementById('archive'));
        } else {
            yearBlock = createDiv().addClass('pull-left');
            dateBlock = createDiv().addClass('date-block');
            dateHeader = createElement('h1', uniqueYears[i]);
            contentBlock = createDiv('').addClass('archive-content').attribute('id', uniqueYears[i]);
            dateHeader.parent(dateBlock);
            dateBlock.parent(yearBlock);
            contentBlock.parent(yearBlock);

            transitionBlock = createDiv().addClass('transition-l-to-r');

            yearBlock.parent(document.getElementById('archive'));
            transitionBlock.parent(document.getElementById('archive'));
        }

    }

    if (uniqueYears.length%2!=0){
        endCard = createDiv().addClass('pull-left').attribute('id', 'endCard');
    } else {
        endCard = createDiv().addClass('pull-right').attribute('id', 'endCard');
    }
    usefulParade = createA('https://www.usefulparade.com', 'a Useful Parade site');
    usefulParade.parent(endCard);
    endCard.parent(document.getElementById('archive'));

    for (i=0;i<sheet.length;i++){
            var newTable = createElement('tr');
            var columns = [];
            columns[0] = createElement('th', sheet[i].Date);
            columns[1] = createElement('th', sheet[i].Description);
            var colA;
            if (sheet[i].LinkURL != ""){
                colA = createA(sheet[i].LinkURL, sheet[i].LinkText, "_blank");
            } else {
                colA = createP('');
            }
            columns[2] = createElement('th');
            colA.parent(columns[2]);

            for (j=0;j<columns.length;j++){
                columns[j].parent(newTable);
            }

            newTable.parent(document.getElementById(sheet[i].Year));
            // newP = createP(sheet[i].Date + " — " + sheet[i].Description);
            // newP.parent(document.getElementById(sheet[i].Year));
    }
}

