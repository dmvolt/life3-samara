/**
 * Created by Евгений on 03.12.2016.
 */
function clearForm(form) {
    form.find('.copy').remove();
    form.find('input, textarea').each(function () {
        $(this).val('').removeAttr('checked');

    });
    form.data('formValidation').resetForm();
}
$(document).ready(function(){

    $('.datepicker-forvard').datetimepicker({
        locale: 'ru',
        format: 'L',
        minDate: moment(),
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
// Добавление доп ФИО
    $("#reg_nsk").on('click', '.add_person', function(e){
        e.preventDefault(); //отменяем переход по ссылке

        var $element = $(".tpl").clone();

        $element.removeClass('tpl')
            .removeClass('hidden')
            .addClass('copy')
            .appendTo('#fio_group');

        $element.find('input').prop('disabled', false);

        $('#reg_nsk').formValidation('addField', $element.find('input'));
    });

// Удаление доп ФИО
    $("#reg_nsk").on('click', '.del_person', function(e){
        e.preventDefault(); //отменяем переход по ссылке

        var $element = $(this).closest('.form-group');
        $('#full_calc_form').formValidation('removeField', $element.find('input'));
        $element.remove();
    });


    $(".clear_form").on('click', function(e){
        e.preventDefault(); //отменяем переход по ссылке

        var $form = $(this).closest('form');
        clearForm($form);
    });

//Валидация формы
    $('#reg_nsk').formValidation({

        fields: {
            'name[]': {

                validators: {

                    notEmpty: {
                        message: 'Введите Фамилию Имя Отчество'
                    },
                    stringLength: {
                        message: 'Длина ФИО не должна превышать 60 знаков',
                        max: 60
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
            'phone': {

                validators: {

                    notEmpty: {
                        message: 'Введите контактный телефон'
                    },
                    phone: {
                        country: 'RU',
                        message: 'Введите номер в любом формате'
                    }
                }
            },
            'email': {

                validators: {

                    regexp: {
                        regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message: 'Введите корректный email'
                    }
                }
            },
            'needstay': {

                validators: {

                    notEmpty: {
                        message: 'Нуждаетесь в размещении?'
                    }
                }
            },
            'dateFrom': {

                validators: {

                    notEmpty: {
                        message: 'Введите дату прибытия'
                    },
                    date: {
                        format: 'DD.MM.YYYY',
                        separator:'.',
                        message: 'Дата в формате ДД.ММ.ГГГГ'
                    }
                }
            },
            'dateTo': {

                validators: {

                    notEmpty: {
                        message: 'Введите дату отъезда'
                    },
                    date: {
                        format: 'DD.MM.YYYY',
                        separator:'.',
                        message: 'Дата в формате ДД.ММ.ГГГГ'
                    }
                }
            },
            'text': {

                validators: {

                    stringLength: {
                        message: 'Максимальный объем - 5000 знаков',
                        max: 5000
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
                clearForm($form);
                message (result.message, true);
            }
            else if(result.status == 'error')  {
                bv.resetForm();
                message (result.message, false);
            }
        },'json');
    });

    $('input[name = "dateFrom"]').on('dp.change dp.show', function(e) {
        $('#reg_nsk').formValidation('revalidateField', 'dateFrom');
    });
    $('input[name = "dateTo"]').on('dp.change dp.show', function(e) {
        $('#reg_nsk').formValidation('revalidateField', 'dateTo');
    });


});


