/**
 * Created by Евгений on 13.12.2016.
 */
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

$(document).ready(function () {

    $('.datepicker').datetimepicker({
        locale: 'ru',
        format: 'L',
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


    $('.add-pastor').on('click', function () {
        $(this).addClass('disabled');
        $('#pastor').find('input').each(function () {
            $(this).prop('disabled', false);
        });
        $('#pastor').slideDown();
        return false;
    });
    $('.del-pastor').on('click', function () {
        $('.add-pastor').removeClass('disabled');
        $('#pastor').find('input').each(function () {
            $(this).val('');
            $(this).prop('disabled', true);
        });
        $('#pastor').slideUp();
        return false;
    });

    $('#church').on('click','.add-church', function () {
        var tpl = $('.church_tpl').find('.row').clone();

        tpl.addClass('copy').find('input').each(function () {
            $(this).prop('disabled', false);
            $('#report').formValidation('addField', $(this));
        });
        tpl.find('.datepicker').each(function () {
            $(this).datetimepicker({
                locale: 'ru',
                format: 'L',
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
        });
        $('#church').append(tpl);
        return false;
    });
    $('#church').on('click','.del-church', function () {

        $(this).closest('.copy').find('input').each(function () {
            $('#report').formValidation('removeField', $(this));
        });
        $(this).closest('.copy').remove();
        return false;
    });


    $('#books').on('click','.add-books', function () {
        var tpl = $('.books_tpl').find('.row').clone();

        tpl.addClass('copy').find('input').each(function () {
            $(this).prop('disabled', false);
            $('#report').formValidation('addField', $(this));
        });
        $('#books').append(tpl);
        return false;
    });
    $('#books').on('click','.del-books', function () {

        $(this).closest('.copy').find('input').each(function () {
            $('#report').formValidation('removeField', $(this));
        });
        $(this).closest('.copy').remove();
        return false;
    });

    $('#city').on('change', function () {

        $('#cityname').val($(this).find('option:selected').text());
        return false;
    });



    $('#report').formValidation({

        framework: 'bootstrap',

        fields: {
            'name': {
                validators: {
                    notEmpty: {
                        message: 'Введите Фамилию Имя Отчество'
                    }
                }
            },
            'phone': {
                validators: {
                    notEmpty: {
                        message: 'Введите телефон'
                    },
                    phone: {
                        country: 'RU',
                        message: 'Формат номера +7XXXXXXXXXX'
                    }
                }
            },
            'email': {
                validators: {
                    notEmpty: {
                        message: 'Введите email'
                    },
                    regexp: {
                        regexp: /^([.]?([a-zA-Z]|[0-9]|[-]|[_]){1})+[@](([a-zA-Z0-9])|([-])){2,63}([.]([a-zA-Z0-9]|[-]){2,63})*([.]([a-zA-Z0-9]){2,63}){1}$/i,
                        message: 'Введите правильный email'
                    }
                }
            },
            'name2': {
                validators: {
                    notEmpty: {
                        message: 'Введите Фамилию Имя Отчество'
                    }
                }
            },
            'phone2': {
                validators: {
                    notEmpty: {
                        message: 'Введите телефон'
                    },
                    phone: {
                        country: 'RU',
                        message: 'Формат номера +7XXXXXXXXXX'
                    }
                }
            },
            'email2': {
                validators: {

                    regexp: {
                        regexp: /^([.]?([a-zA-Z]|[0-9]|[-]|[_]){1})+[@](([a-zA-Z0-9])|([-])){2,63}([.]([a-zA-Z0-9]|[-]){2,63})*([.]([a-zA-Z0-9]){2,63}){1}$/i,
                        message: 'Введите правильный email'
                    }
                }
            },
            'city': {
                validators: {
                    notEmpty: {
                        message: 'Выберите город'
                    }
                }
            },
            'contacts': {
                validators: {
                    notEmpty: {
                        message: 'Введите адрес и время проведения служений'
                    }
                }
            },
            'status': {
                validators: {
                    notEmpty: {
                        message: 'Выберите юридический статус'
                    }
                }
            },
            'age': {
                validators: {
                    notEmpty: {
                        message: 'Введите возраст церкви'
                    },
                    digits: {
                        message: 'Вводите только цифры'
                    }
                }
            },
            'people_qty': {
                validators: {
                    notEmpty: {
                        message: 'Введите количество присутствующих на воскресном служении'
                    },
                    digits: {
                        message: 'Вводите только цифры'
                    }
                }
            },
            'saved_qty': {
                validators: {
                    notEmpty: {
                        message: 'Введите количество рожденых свыше'
                    },
                    digits: {
                        message: 'Вводите только цифры'
                    }
                }
            },
            'serv_qty': {
                validators: {
                    notEmpty: {
                        message: 'Введите количество служений в церкви'
                    },
                    digits: {
                        message: 'Вводите только цифры'
                    }
                }
            },
            'paid_qty': {
                validators: {
                    notEmpty: {
                        message: 'Введите количество служителей на оплате'
                    },
                    digits: {
                        message: 'Вводите только цифры'
                    }
                }
            },
            'obitel_qty': {
                validators: {
                    notEmpty: {
                        message: 'Введите количество проживающих в обители'
                    },
                    digits: {
                        message: 'Вводите только цифры'
                    }
                }
            },
            'person_target': {
                validators: {
                    notEmpty: {
                        message: 'Заполните это поле, пожалуйста'
                    }
                }
            },
            'church_target': {
                validators: {
                    notEmpty: {
                        message: 'Заполните это поле, пожалуйста'
                    }
                }
            },
            'region_target': {
                validators: {
                    notEmpty: {
                        message: 'Заполните это поле, пожалуйста'
                    }
                }
            },
            'book[]': {

                validators: {

                    notEmpty: {
                        message: 'Введите название и автора книги'
                    }

                }
            },
            'church[]': {

                validators: {

                    notEmpty: {
                        message: 'Введите город'
                    }

                }
            },
            'church_date[]': {

                validators: {

                    notEmpty: {
                        message: 'Введите дату посещения'
                    },
                    date: {
                        format: 'DD.MM.YYYY',
                        separator:'.',
                        message: 'Дата в формате ДД.ММ.ГГГГ'
                    }
                }
            },
        }
    }).on('success.form.fv', function (e) {

        e.preventDefault();

        var $form = $(e.target),
        fv = $form.data('formValidation');

        $.ajax({
            url: $form.attr('action'),
            type: 'POST',
            data: $form.serialize(),
            dataType: 'json',
            success: function (result) {

                if (result.status == 'ok') {

                    $form.fadeOut('slow');
                    $('#link').fadeIn('slow').find('a').attr('href',result.link);
                    message(result.message, true);
                }
                else {
                    fv.disableSubmitButtons(false);
                    message(result.message, false);
                }

            }
        });
    });

    $('#church').on('dp.change dp.show', 'input[name = "church_date[]"]', function(e) {
        $('#report').formValidation('revalidateField', $(this));
    });



});
