


$(document).ready(function(){
	
// Подписаться/отписаться от рассылки
	$('.mailing').on('click',function(e) {
		e.preventDefault();
		var action = $(this).attr('data-action');
		var cancel = $(this).attr('data-cancel');
		
		$.post(
		'/ajax/mailing', 
		{data: action}, 
		function(result) {
                if(result.status == 'ok') {
					message (result.message, true);
					$('#mailing-'+action).slideUp();
					$('#mailing-'+cancel).slideDown();
				}
				else if(result.status == 'error')  {
					message (result.message, false);
				}
				},'json');
		
		
	});	
	
	
//Валидация загрузки аватарки
		$('#avatar_form').formValidation({
        
        fields: {
            'avatar': {
                validators: {
                    
					notEmpty: {
                        message: 'Выберите файл jpg или png не более 5Mb'
                    },
					file: {
                        extension: 'jpeg,jpg,png',
                        type: 'image/jpeg,image/png',
                        maxSize: 5242880,   // 5120 * 1024
                        message: 'Файл jpg или png не более 5Mb'
                    }
                }
            }
        }
			
    }).on('success.form.fv', function(e) {
            e.preventDefault();
			var $form = $(e.target),
                fv    = $(e.target).data('formValidation');
            $form.ajaxSubmit({
                beforeSubmit: function() {
                     $('.avatar-loader').removeClass('fa-upload').addClass('fa-spinner fa-pulse');                  
                },
                url: $form.attr('action'),
                dataType: 'json',
				clearForm: true,
                success: function(response) {
                    message (response.message, true);
                    $('.avatar-loader').removeClass('fa-spinner fa-pulse').addClass('fa-upload');
					$('.avatar-img').attr('src','/img/avatar/'+response.file);
					$('.avatar-btn-text').text('Изменить');
					fv.resetForm();
					   
                },
				error: function() {
                    message ('Ошибка сервера!', false);
                    $('.avatar-loader').removeClass('fa-spinner fa-pulse').addClass('fa-upload'); 
					fv.resetForm();    
                }
            });
        });
		

	
	//Валидация формы изменения данных
		$('#profile').formValidation({
        
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
                            regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
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
			'username': {
                validators: {
                    notEmpty: {
                        message: 'Придумайте логин'
                    },
					stringLength: {
                        message: 'Длина логина не менее 6 знаков',
						min: 6
                    },
					remote: {
						message: 'Этот логин уже зарегистрирован',
						url: '/ajax/checkusername',
						type: 'POST'
                	}
					
                }
            }
			
        }
    }).on('success.field.fv', function(e, data) {
            if (data.fv.getInvalidFields().length > 0) {    // There is invalid field
                data.fv.disableSubmitButtons(true);
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
                bv.resetForm();
				if(result.status == 'ok') {
					message (result.message, true);
					bv.disableSubmitButtons(true);
				}
				else if(result.status == 'error')  {
					message (result.message, false);
				}
				},'json');
        });
		
		
		//Валидация формы изменения пароля в личном кабинете
		$('#change_pass_form').formValidation({
        
        fields: {
            
            'old_pass': {
                
				validators: {
                    stringLength: {
                        min: 6,
						message: 'Длина пароля должна быть не менее 6 символов'
                    },
					 notEmpty: {
                        message: 'Введите действующий пароль'
                    }
                }
            },
			'password': {
                
				validators: {
                    stringLength: {
                        min: 6,
						message: 'Длина пароля должна быть не менее 6 символов'
                    },
					 notEmpty: {
                        message: 'Введите новый пароль'
                    },
					different: {
						field: 'old_pass',
						message: 'Новый пароль должен отличаться от старого'
					}
                }
            },
			
			'password_confirm': {
                
				validators: {
                    identical: {
						field: 'password',
						message: 'Пароли не совпадают!'
                	},
					 notEmpty: {
                        message: 'Подтвердите пароль'
                    }
                }
            }
			
        }
    }).on('success.form.fv', function(e) {
            e.preventDefault();
			var $form = $(e.target);
			var fv = $form.data('formValidation');

            $.post($form.attr('action'), $form.serialize(), function(result) {
                fv.resetForm();
				if(result.status == 'ok') {
					 message(result.message, true);
					 $form.trigger('reset');
					 $('#add_form_container').slideUp(function() {$('#add_form_open').show()});
				}
				else if(result.status == 'error')  {
					 
					 message(result.message, false);
				}
				},'json');
        });	
		
	
    
});

