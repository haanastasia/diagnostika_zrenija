$('.services-slider').owlCarousel({
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    lazyLoad: true,
    autoHeight: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})

$(document).ready(function () {

    $('.form-subscription').submit(function (event) {
        event.preventDefault();

        if ($(this).find('*[name="email"]').val().length === 0) {
            $(this).find('.form__error').text('Пожалуйста, введите email');
            return;
        }

        var retries = 3; // Количество попыток
        var delay = 1000; // Задержка между попытками (в миллисекундах)

        function submitForm(form) {
            var formData = form.serialize();

            $.ajax({
                type: 'GET',
                url: 'thanks.html',
                data: formData,
                dataType: 'text',
                success: function (response) {
                    form.find('.form__error').text('');
                    form.find('.form__button').text(response);
                    form.find('.form__button').addClass('button-disabled');
                    form.find('.form__button').prop('disabled', true);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (retries > 0) {
                        setTimeout(submitForm(form), delay);
                        retries--;
                    } else {
                        form.find('.form__error').text('Ошибка! Пожалуйста, повторите позже!');
                    }
                }
            });
        }

        submitForm($(this)); // Начинаем отправку формы
    });
});
