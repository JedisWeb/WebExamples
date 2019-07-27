var main = document.getElementsByClassName("main")[0];
var start = document.getElementsByClassName("start")[0];
var colors = ['red', 'yellow', 'pink', 'blue'];
var timer, speed = 5,
	num = 0,
	flag = true;

function cDiv() {
	var oDiv = document.createElement("div");
	oDiv.setAttribute('class', 'row');
	var index = Math.floor(Math.random() * 4);
	for (var j = 0; j < 4; j++) {
		var iDiv = document.createElement("div");
		oDiv.appendChild(iDiv);
	}
	if (main.childNodes.length == 0) {
		main.appendChild(oDiv);
	} else {
		main.insertBefore(oDiv, main.childNodes[0]);
	}
	var clickDiv = main.childNodes[0].childNodes[index];
	clickDiv.setAttribute('class', 'i');
	clickDiv.style.backgroundColor = colors[index];
}

function move() {
	clearInterval(timer);
	timer = setInterval(function() {
		var step = parseInt(main.offsetTop) + speed;
		main.style.top = step + 'px';
		if (parseInt(main.offsetTop) >= 0) {
			cDiv();
			main.style.top = '-150px';
			var len = main.childNodes.length;
			if (len >= 6) {
				//Game Over
				for (var i = 0; i < 4; i++) {
					if (main.childNodes[len - 1].childNodes[i].classList.contains('i')) {
						clearInterval(timer);
						alert('得分：' + num);
						flag = false;
						// restart();
					}
				}
				main.removeChild(main.childNodes[len - 1]);
			}
		}
	}, 20);
	bindEvent();
}

function bindEvent() {
	main.addEventListener('click', function(e) {
		if (flag) {
			var tar = e.target;
			if (tar.className == "i") {
				tar.style.backgroundColor = '#fff';
				tar.classList.remove('i');
				num++;
			} else {
				clearInterval(timer);
				alert('得分：' + num);
				flag = false;
				// restart();
			}
			if (num % 10 == 0) {
				speed++;
			}
		}
	});
}

/* function restart(){
	for(var i = 0; i < main.childNodes.length; i ++){
		main.removeChild()
	}
	start.style.display = 'block';
} */

function clickStart() {
	start.addEventListener('click', function() {
		start.style.display = 'none';
		move();
	});

}
start.onclick = clickStart();
