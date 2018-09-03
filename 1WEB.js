//Une fonction et un prototype pour melanger la liste des pieces et ainsi les positionner dans un ordre aleatoire
function randomInt(mini, maxi){
    var nb = mini + (maxi+1-mini)*Math.random();
    return Math.floor(nb);
}
 
Array.prototype.shuffle = function(n){
    if(!n)
        n = this.length;
    if(n > 1){
        var i = randomInt(0, n-1);
        var tmp=this[i];
        this[i]=this[n-1];
        this[n-1]=tmp;
		this.shuffle(n-1);
     }
}



//Fonction qui permet de choisir une image aleatoirement
function choixImage(){
	if(nombrealea%3==0){
		var imageChoisie="url('triforce.jpg')";
	}else if(nombrealea%3==1){
		var imageChoisie="url('daftpunk.jpg')";
	}else if(nombrealea%3==2){
		var imageChoisie="url('got.jpg')";
	}
	return imageChoisie;
}

//Fonction qui permet de creer les pieces
function creaDiv(){
	var i=300;
	var j=300;
	for(var k=1;k<10;k+=1){
		var newdiv=document.createElement("div");
		newdiv.id=k;
		newdiv.value=k;
		document.getElementById("pieces").appendChild(newdiv);
		$("#"+k).css({
			"background-image":imageChoisie,
			"width":"100px",
			"height":"100px",
			"background-position":""+i+"px "+j+"px",
			"position":"absolute"
		});
		$("#"+k).draggable({
			snap:'.cell',
			snapMode:'inner',
			containment:'#jeu'
		});
		if(i==100){
			i=300;
			j=j-100;
		}else{
			i=i-100;
		}
		
		
	}
}


//Fonction qui permet de positionner les pieces suivant l'ordre de la liste
function position(){
	var compteur=0;
	var gauche=document.getElementById("pieces").offsetLeft;
	var haut=document.getElementById("pieces").offsetTop;
	for(var i=0;i<3;i+=1){
		for(var j=0;j<3;j+=1){
			$("#"+liste[compteur]).css({
				"top":""+(i*150+25+haut)+"px",
				"left":""+(j*150+25+gauche)+"px"
			})
			compteur+=1;
		}
	}		
}

//Chronometre et affichage du score
var dixieme=0;
var sec=0;
function chrono(){
	dixieme+=1
	if(dixieme>9){
		dixieme=0;
		sec+=1;
	}
	$("#tempo").text(sec+"."+dixieme+" sec");
	compteur=setTimeout('chrono()',100);
	if(arretChrono==0){
		clearTimeout(compteur);
		if(sec<15){
			$("#num1").text(sec+"."+dixieme);
			$("#num2").text("15.0");
			$("#num3").text("20.0");
		}else if(sec<20){
			$("#num2").text(sec+"."+dixieme);
			$("#num3").text("20.0");
		}else if(sec<25){
			$("#num3").text(sec+"."+dixieme);
		}
	}
}




var arretChrono=1;
var liste=[1,2,3,4,5,6,7,8,9];
liste.shuffle();
var nombrealea=Math.floor((Math.random() * 3));
var imageChoisie=choixImage();
creaDiv();
position();
chrono();



//Changement de style sur certains elements
$("#imgFinale").css({
	"background-image":imageChoisie,
	"background-repeat":"no-repeat",
	"background-position": "50% 50%"
})


var gaucheDivEnsemble=document.getElementById("ensemble").offsetLeft;
var hautDivEnsemble=document.getElementById("ensemble").offsetTop;
$("h2").css({
	"left":""+(615+gaucheDivEnsemble)+"px",
	"top":""+(85+hautDivEnsemble)+"px"
})
$("#win").css({
	"left":""+(675+gaucheDivEnsemble)+"px",
	"top":""+(675+hautDivEnsemble)+"px"
})

//Mise d'une fonction dans les zones de drop pour tester la victoire ou non de l'utilisateur
var puzzle=[];
puzzle.length=9;
$(".cell").droppable({
	drop: function(ev, ui) {
		var valueDrop = $(this).attr('value')
		var div = $(ui.draggable);
		var idDiv = div.attr('id');

		puzzle[valueDrop-1]=idDiv;

		var compteur=0;
		for(var i=1;i<10;i+=1){
			if(puzzle[i-1]==i){
				compteur+=1;
			}	
		}
		if(compteur==9){
			$("#win").show(250).delay(1000).hide(250);
			arretChrono=0;
			
		}
	}
});




