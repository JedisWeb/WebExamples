var dots = document.getElementsByClassName('dots')[0];
setInterval(function (){
	dots.classList.remove('animate');
	setTimeout(function (){
		dots.classList.add = ('animate');
	},200);
},3750);