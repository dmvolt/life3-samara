
$(document).ready(function(){
	
	// Показать/скрыть форму добавления статьи
	$('#add_article_open').on('click',function(e) {
		e.preventDefault();
		$(this).hide();
		$('#add_article_container').slideDown();
	});
	$('#add_article_close').on('click',function(e) {
		$('#add_article').data('formValidation').resetForm();
		$('#add_article_container').slideUp(function() {$('#add_article_open').show()});
	});
	
	//Валидация формы  добавления статьи
		$('#add_article').formValidation({
        
        fields: {
            'author': {
                
				validators: {
                    
					 notEmpty: {
                        message: 'Введите автора статьи'
                    },
					stringLength: {
                        message: 'Длина имени не должна превышать 40 знаков',
						max: 40
                    }
                }
            },
			'title': {
                
				validators: {
                    
					 notEmpty: {
                        message: 'Введите ваше имя'
                    },
					stringLength: {
                        message: 'Длина названия не должна превышать 100 знаков',
						max: 100
                    }
                }
            },
			'text': {
                
				validators: {
                    
					 notEmpty: {
                        message: 'Введите текст статьи'
                    },
					stringLength: {
                        message: 'Объем статьи - от 500 до 20 000 знаков',
						min: 500,
						max: 20000
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
					$('#add_article_container').slideUp(function() {$('#add_article_open').show()});
					message (result.message, true);
				}
				else if(result.status == 'error')  {
					bv.resetForm();
					message (result.message, false);
				}
				},'json');
        });
		
		
	
    
});

