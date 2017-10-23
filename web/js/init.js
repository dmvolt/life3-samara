function message(text, mode) {
	var icon = (mode) ? 'check' : 'times';
	var color = (mode) ? 'success' : 'error';
	var message  = '<div class="alert alert-dismissible message '+color+'"><button type="button" class="close" data-dismiss="alert"><span>&times;</span></button><i class="fa fa-'+icon+'-circle"></i> '+text+'</div>';
		$("body").append(message);		
		setTimeout(function(){
			$('.message').slideDown(400);
			setTimeout(function(){
				$('.message').slideUp(400).remove();
			}, 8000);
		}, 100);
           	
}


$(document).ready(function(){
	
	// Показать/скрыть форму добавления
	$('#add_form_open').on('click',function(e) {
		e.preventDefault();
		$(this).hide();
		$('#add_form_container').slideDown();
	});
	$('#add_form_close').on('click',function(e) {
		$(this).closest('form').data('formValidation').resetForm();
		$('#add_form_container').slideUp(function() {$('#add_form_open').show()});
	});
	
	// Показать/скрыть форму обратной связи
	$('.feedback_link').on('click',function(e) {
		e.preventDefault();
		if($(this).hasClass('open')){
			$(this).removeClass('open').html('Обратная связь <i class="fa fa-envelope"></i>');
			$('#feedback').animate({right: "-365px"}, 300);
		}
		else {
			$(this).addClass('open').html('Закрыть <i class="fa fa-close"></i>');
			$('#feedback').animate({right: "0px"}, 300);	
		}
		
	});
	
	
		
	//всплывающие подсказки
	$('[data-toggle="tooltip"]').tooltip();
	$('body').tooltip({
		selector: '.new-tooltip'
	});	
	//обновление капчи
	$(".captcha_refresh").on('click', function(){ 
		var captcha = $("input[name='captcha']");
		$(this).closest('form').formValidation('resetField', captcha);
		captcha.val('');
		$("img.captcha").attr("src","/captcha/default?_rnd="+Math.random());
		return false;
	});	
	
	// Показать/скрыть пароль
	$('.show-pass').on('click',function(e) {
		if($(this).hasClass('fa-eye')) {
			$(this).removeClass('fa-eye').addClass('fa-eye-slash');
			$('#reg_password, #reg_password_confirm').attr('type','text');
		}
		else {
			$(this).removeClass('fa-eye-slash').addClass('fa-eye');
			$('#reg_password, #reg_password_confirm').attr('type','password');
		}
		
	});
	
	// очистка форм
	$('button:reset').on('click',function(e) {
	e.preventDefault();
	$(this).closest('form').find(':input','option:selected')
     .not(':button, :submit, :reset, :hidden')
     .val('')
     .removeAttr('checked')
     .removeAttr('selected');
	});
	
	// slimbox
	$('.big_img').slimbox(
	{resizeDuration: 500}, 
	function(el) {return [el.href, '<a href="' + el.href + '" target="_blank">Сохранить изображение</a>']; });
	
	//datetimepicker
	$('.datepicker').datetimepicker({
			locale: 'ru',
			format: 'L',
			maxDate: moment(),
			icons: {
			time: 'fa fa-clock-o',
			date: 'fa fa-calendar',
			up: 'fa fa-chevron-up',
			down: 'fa fa-chevron-down',
			previous: 'fa fa-chevron-left',
			next: 'fa fa-chevron-right',
			clear: 'fa fa-trash'
		}
	});
	// Показать форму регистрации
	$('.reg_link').on('click',function(e) {
		e.preventDefault();
		$('#reg').slideDown(500);
		$('#cabinet_enter').slideUp(500);
		$('#reminder').slideUp(500);
		
		$('#cabinet_enter_container').animate({width:'500px',height:'240px'},500);
	});
	
	// Показать форму авторизации
	$('.auth_link').on('click',function(e) {
		e.preventDefault();
		
		$('#cabinet_enter').slideDown(500);
		$('#reg').slideUp(500);
		$('#reminder').slideUp(500);
		$('#cabinet_enter_container').animate({width:'250px',height:'220px'},500);
	});
	
	// Показать форму восстановления пароля
	$('.reminder_link').on('click',function(e) {
		e.preventDefault();
		
		$('#reminder').slideDown(500);
		$('#cabinet_enter').slideUp(500);
		$('#reg').slideUp(500);
		$('#cabinet_enter_container').animate({width:'250px',height:'260px'},500);
	});
	
	// Паралакс
	//$.stellar();
	
	// Скролл к якорю
	 $('a.scrollmenu').click(function() {
        var point = $(this).attr('href').split('#')[1];
        var target = $('a[name='+point+']');
		$.scrollTo(target, 800, {axis:'y', offset:-50});
        return false;
    });
	
	//Валидация формы обратной связи
		$('#feedback_form').formValidation({
        
        fields: {
            'name': {
                
				validators: {
                    
					 notEmpty: {
                        message: 'Введите ваше имя'
                    },
					stringLength: {
                        message: 'Длина имени не должна превышать 40 знаков',
						max: 40
                    }
                }
            },
			'feedback': {
                
				validators: {
                    
					 notEmpty: {
                        message: 'Введите сообщение'
                    },
					stringLength: {
                        message: 'Длина сообщения не должна превышать 1000 знаков',
						max: 1000
                    }
                }
            },
			 
            'email': {
                
				validators: {
                   
					 regexp: {
                            regexp: /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}([.]([a-zA-Z0-9]){2,63})+$/i,
                            message: 'Введите корректный email'
                        },
                    notEmpty: {
                        message: 'Введите email'
                    }
                }
            }
			
			
        }
    }).on('success.form.fv', function(e) {
            e.preventDefault();
			var $form = $(e.target);
			var bv = $form.data('formValidation');

            $.post($form.attr('action'), $form.serialize(), function(result) {
                if(result.status == 'ok') {
					 bv.resetForm();
					 $form.trigger('reset');
					$('.feedback_link').removeClass('open').html('Обратная связь <i class="fa fa-envelope"></i>');
					$('#feedback').animate({right: "-365px"}, 300); 
					
					
					message (result.message, true);
					 
					 	 
				}
				else if(result.status == 'error')  {
					
				}
				},'json');
        });
	
	
	
		
	//Валидация формы регистрации
		$('#reg_form').formValidation({
        
        fields: {
            'name': {
                
				validators: {
                    
					 notEmpty: {
                        message: 'Введите ваше имя'
                    },
					stringLength: {
                        message: 'Длина имени не должна превышать 40 знаков',
						max: 40
                    }
                }
            },
            'email': {
                threshold: 8,
				validators: {
                    emailAddress: {
                        message: 'Введите корректный email'
                    },
					 regexp: {
                            regexp: /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}([.]([a-zA-Z0-9]){2,63})+$/i,
                            message: 'Введите корректный email'
                        },
                    notEmpty: {
                        message: 'Введите email'
                    },
					remote: {
						message: 'Этот email уже зарегистрирован',
						url: '/ajax/checkemail',
						type: 'POST'
                	}
                }
            },
			'password': {
                validators: {
                    notEmpty: {
                        message: 'Придумайте пароль'
                    },
					stringLength: {
                        message: 'Длина пароля не менее 6 знаков',
						min: 6
                    }
					
                }
            },
			'password_confirm': {
                validators: {
                    notEmpty: {
                        message: 'Подтвердите пароль'
                    },
					identical: {
                    field: 'password',
                    message: 'Пароли не совпадают!'
                }
					
                }
            },
			'agreement': {
                validators: {
                    notEmpty: {
                        message: 'Необходимо принять соглашение'
                    },
				}
            },
			
        }
    }).on('err.validator.fv', function(e, data) {
            if (data.field === 'email') {
                // The email field is not valid
                data.element
                    .data('fv.messages')
                    // Hide all the messages
                    .find('.help-block[data-fv-for="' + data.field + '"]').hide()
                    // Show only message associated with current validator
                    .filter('[data-fv-validator="' + data.validator + '"]').show();
            }
        }).on('success.form.fv', function(e) {
            e.preventDefault();
			var $form = $(e.target);
			var bv = $form.data('formValidation');

            $.post($form.attr('action'), $form.serialize(), function(result) {
                if(result.status == 'ok') {
					 bv.resetForm();
					 $form.trigger('reset');
					$('.lk_link').removeClass('open'); 
					$('#cabinet_enter').show();
					$('#reg').hide();
					$('#cabinet_enter_container').css({width:'250px',height:'220px'});
					
					message (result.message, true);
					 
					 	 
				}
				else if(result.status == 'error')  {
					
				}
				},'json');
        });
		
		
//Валидация формы авторизации в личном кабинете
	$('#auth_form').formValidation({
        
        fields: {
            
            'login': {
                
				validators: {
                    notEmpty: {
                        message: 'Введите логин или email'
                    }
                }
            },
			'password': {
                
				validators: {
                    notEmpty: {
                        message: 'Введите пароль'
                    }
                }
            }
			
        }
    }).on('success.form.fv', function(e) {
            e.preventDefault();
			var $form = $(e.target);
			var bv = $form.data('formValidation');

            $.post($form.attr('action'), $form.serialize(), function(result) {
                if(result.status == 'ok') {
					document.location.href='/';
				}
				else {
					message(result.message, false);
					bv.resetForm();	
				}
				},'json');
        });


//Валидация формы восстановления пароля
	$('#reminder_form').formValidation({
        
        fields: {
            'email': {
               
				validators: {
                    emailAddress: {
                        message: 'Введите корректный email'
                    },
					 regexp: {
                            regexp: /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}([.]([a-zA-Z0-9]){2,63})+$/i,
                            message: 'Введите корректный email'
                        },
                    notEmpty: {
                        message: 'Введите email'
                    }
                }
            },
			'captcha': {
                threshold: 4,
				validators: {
                    
					 notEmpty: {
                        message: 'Введите код с картинки'
                    },
					stringLength: {
                        message: 'Длина кода - 4 символа',
						min: 4,
						max: 4
                    },
					remote: {
						message: 'Неверный код',
						url: '/ajax/checkcaptcha',
						type: 'POST'
                	}
                }
            }
			
        }
    }).on('err.validator.fv', function(e, data) {
            if (data.field === 'email') {
                // The email field is not valid
                data.element
                    .data('fv.messages')
                    // Hide all the messages
                    .find('.help-block[data-fv-for="' + data.field + '"]').hide()
                    // Show only message associated with current validator
                    .filter('[data-fv-validator="' + data.validator + '"]').show();
            }
        }).on('success.form.fv', function(e) {
            e.preventDefault();
			var $form = $(e.target);
			var bv = $form.data('formValidation');

            $.post($form.attr('action'), $form.serialize(), function(result) {
                if(result.status == 'ok') {
					$("img.captcha").attr("src","/captcha/default?_rnd="+Math.random());
					bv.resetForm();
					$form.trigger('reset');
					$('.lk_link').removeClass('open'); 
					$('#cabinet_enter').show();
					$('#reminder').hide();
					$('#cabinet_enter_container').css({width:'250px',height:'220px'});
					message (result.message, true);
				}
				else {
					$("img.captcha").attr("src","/captcha/default?_rnd="+Math.random());
					$("input[name='captcha']").val('');
					message(result.message, false);
					bv.resetForm();	
				}
				},'json');
        });
	

	
    
});

