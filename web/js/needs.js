
$(document).ready(function(){
	
	
	
	// Счетчик молитв
	$('.pray_counter').on('click',function(e) {
		e.preventDefault();
		var button = $(this);
		var id = button.attr('data-id');
		var count = parseInt($('.counter'+id).text());
		$.post(
		'/ajax/praycounter', 
		{id:id}, 
		function(result) {
                if(result.status == 'ok') {
					$('.counter'+id).text(count+1)
					button.addClass('disabled');
					message (result.message, true);
				}
				else if(result.status == 'error')  {
					button.addClass('disabled');
					message (result.message, true);
				}
				},'json');
		
	});
	
	
	//Валидация формы  добавления статьи
		$('#add_need').formValidation({
        
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
			'city': {
                
				validators: {
                    
					
					stringLength: {
                        message: 'Длина названия города не должна превышать 40 знаков',
						max: 40
                    }
                }
            },
			'email': {
                
				validators: {
                    
					 notEmpty: {
                        message: 'Введите email'
                    },
					regexp: {
						regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
						message: 'Введите корректный email'
                    }
                }
            },
			'text': {

                validators: {

                    notEmpty: {
                        message: 'Введите нужду'
                    },
                    stringLength: {
                        message: 'Максимальный объем - 5000 знаков',
                        max: 5000
                    }
                }
            },
            'agreement': {

                validators: {

                    notEmpty: {
                        message: 'Необходимо принять условия соглашения'
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
    }).on('success.form.fv', function(e) {
            e.preventDefault();
			var $form = $(e.target);
			var bv = $form.data('formValidation');

            $.post($form.attr('action'), $form.serialize(), function(result) {
                if(result.status == 'ok') {
					 $("img.captcha").attr("src","/captcha/default?_rnd="+Math.random());
					 bv.resetForm();
					 $form.trigger('reset');
					$('#add_form_container').slideUp(function() {$('#add_form_open').show()});
					message (result.message, true);
				}
				else if(result.status == 'error')  {
					bv.resetForm();
					message (result.message, false);
				}
				},'json');
        });
		
		
	
    
});

