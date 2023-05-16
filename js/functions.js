$(function(){

	/* scroll de pesquisa carro por valor */
	
	var currentValue = 0;
	var isDrag = false;
	var preco_maximo = 300000;
	var preco_atual = 0;

	$('.pointer-barra').mousedown(function(){
		isDrag = true;
	})

	$(document).mouseup(function(){
		isDrag = false;
		enableTextSelection();
	})

	$('.barra-preco').mousemove(function(e){
		if(isDrag){
			var elBase = $(this);
			var mouseX = e.pageX - elBase.offset().left;
			disableTextSelection();
			if(mouseX < 0){
				mouseX = 0;
			}	
			if(mouseX >= elBase.width()){
				mouseX = elBase.width();	
			}
			var currentValue = (mouseX / elBase.width()) * 100;
			$('.barra-preco-fill').css('width',currentValue + '%');
			$('.pointer-barra').css('left',(mouseX-10)+'px');
			preco_atual = (currentValue / 100) * preco_maximo
			preco_atual = formatarPreco(preco_atual);
			$('.preco_pesquisa').html('R$ '+preco_atual);
		}
	})

	function formatarPreco(preco_atual){
		preco_atual = preco_atual.toFixed(2);
		preco_arr = preco_atual.split('.');

		var novo_preco = formatarTotal(preco_arr);

		return novo_preco;
	}

	function formatarTotal(preco_arr){
		if(preco_arr[0] < 1000){
			return preco_arr[0] + ',' +preco_arr[1];
		}
		else if (preco_arr[0] < 10000){
			return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+
			','+preco_arr[1];
		}
		else if(preco_arr[0] < 100000) {
			return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+
			','+preco_arr[1];
		}
		else{
			return preco_arr[0][0]+preco_arr[0][1]+preco_arr[0][2]+'.'+preco_arr[0].substr(3,preco_arr[0].length)+
			','+preco_arr[1];	
		}

	}

	function disableTextSelection(){
		$('body').css("-webkit-user-select","none");
		$('body').css("-moz-user-select","none");
		$('body').css("-ms-user-select","none");
		$('body').css("-o-user-select","none");
		$('body').css("user-select","none");
	}

	function enableTextSelection(){
		$('body').css("-webkit-user-select","auto");
		$('body').css("-moz-user-select","auto");
		$('body').css("-ms-user-select","auto");
		$('body').css("-o-user-select","auto");
		$('body').css("user-select","auto");
	}

	/*
	slide da página individual do carro
	*/

	var imgShow = 3;
	//var miniIndex = imgShow - 1;
	var maxIndex = Math.ceil($('.mini-img-wrapper').length/3) - 1;
	var currentIndex = 0;

	initSlider();
	navigateSlider();
	clickSlider();
	function initSlider(){
		var amt = $('.mini-img-wrapper').length * 33.3;
		var elScroll = $('.nav-galeria-wrapper');
		var elSingle = $('.mini-img-wrapper');
		elScroll.css('width', amt+'%');
		elSingle.css('width', 33.3*(100/amt)+'%');
	}

	function navigateSlider(){
		$('.arrow-right-nav').click(function(){
			if(currentIndex < maxIndex){
				currentIndex++;
				var elOff = $('.mini-img-wrapper').eq(currentIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left;
				$('.nav-galeria').animate({'scrollLeft':elOff+'px'});
			}else {
				console.log('Fim');
			}
		});
		$('.arrow-left-nav').click(function(){
			if(currentIndex > 0){
				currentIndex--;
				var elOff = $('.mini-img-wrapper').eq(currentIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left;
				$('.nav-galeria').animate({'scrollLeft':elOff+'px'});
			}else {
				console.log('Fim');
			}
		})
	}


	function clickSlider(){
		$('.mini-img-wrapper').click(function(){
			$('.mini-img-wrapper').css('background-color','transparent');
			$(this).css('background-color','rgb(210,210,210)'); 
			var img = $(this).children().css('background-image');
			$('.foto-destaque').css('background-image',img);


		})

		$('.mini-img-wrapper').eq(0).click();
	}


	/* clicar a ir para a div de contato com base no atributo goto */

	var directory = '/ewaldbit/vendas_car'
	$('[goto=contato]').click(function(){
		location.href = directory+'index.html?contato';
		return false; 
	})

	checkUrl();

	function checkUrl(){
		var url = location.href.split('/');
		var curPage = url[url.length-1].split('?');

		if (curPage[1] != undefined && curPage[1] == 'contato') {
			$('header nav a').css('color','black');
			$('footer nav a').css('color','white');
			$('[goto=contato]').css('color','#EB2D2D');
			$('html,body').animate({'scrollTop':$('#contato').offset().top});
		}
	}

	/*
		Navegação nos depoimentos da index.html
	*/

	var amtDepoimento = $('.depoimento-single blockquote').length;
	var curIndex = 0;
	iniciarDepoimentos();
	navegarDepoimentos();

	function iniciarDepoimentos(){
		$('.depoimento-single blockquote').hide();
		$('.depoimento-single blockquote').eq(0).show();
		$('.nome-depoimento').hide();
		$('.nome-depoimento').eq(0).show();
	}



	function navegarDepoimentos(){
		$('[next]').click(function(){
			curIndex++;
			if(curIndex >= amtDepoimento)
				curIndex = 0;
			$('.depoimento-single blockquote').hide();
			$('.depoimento-single blockquote').eq(curIndex).show();
			$('.nome-depoimento').hide();
			$('.nome-depoimento').eq(curIndex).show();
		})
		$('[prev]').click(function(){
			curIndex--;
			if(curIndex < 0)
				curIndex = amtDepoimento-1;
			$('.depoimento-single blockquote').hide();
			$('.depoimento-single blockquote').eq(curIndex).show();
			$('.nome-depoimento').hide();
			$('.nome-depoimento').eq(curIndex).show();	
		})
	}
})