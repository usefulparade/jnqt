// var spreadsheetURL = "https://docs.google.com/spreadsheets/d/13e_i5KqbVlkiy8TYflBQTi_KZAYlboq-NiTY7sLbxNY/edit?usp=sharing";
var spreadsheetURL = "/archive.csv";
var archive, archiveArray;

function preload(){
    archive = loadTable("/archive.csv", "csv", "header");
}

function setup(){
    // init();  // NOT ANYMORE
    archiveArray = archive.getObject();
    console.log(archiveArray);
    populateContent(archiveArray);
}



function init (){ // This was the old way of getting data from google sheets :( RIP
    Tabletop.init( { key: spreadsheetURL,
                   callback: function(data, tabletop) { 
                       
                    //    console.log(dataGlobal);
                    // console.log(data);
                    populateContent(data);
                    //    archive = loadJSON(data);
                   },
                   simpleSheet: true } );

}


function populateContent(sheet){
    var archiveBlock = document.getElementById('archive');


    var allYears = [];

    for (var j=0;j<Object.keys(sheet).length;j++){
        allYears[j] = sheet[j].Year;
    }

    var uniqueYears = allYears.filter(function(item, index){
        return allYears.indexOf(item) >= index;
    });

    console.log(allYears);

    firstBlock = createDiv().addClass('pull-right');
    firstTransition = createDiv().addClass('transition-r-to-l');
    firstBlock.parent(archiveBlock);
    firstTransition.parent(archiveBlock);

    titleBlock = createDiv().addClass('pull-left main-title');
    titleH1 = createElement('h1', 'JNQT');
    titleH2 = createElement('h2', "an incomplete archive of Jesse Quebbeman-Turley's recordings and performances");
    titleH1.parent(titleBlock);
    titleH2.parent(titleBlock);
    titleBlock.parent(archiveBlock);

    secondTransition = createDiv().addClass('transition-l-to-r');
    secondTransition.parent(archiveBlock);

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

    for (i=0;i<Object.keys(sheet).length;i++){
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
    }

    var column = document.getElementById("column");
    column.classList.add("column-unfurl");
}

