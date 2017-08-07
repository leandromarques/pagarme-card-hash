$(document).ready(function() { 

    var form = $("#payment_form");

    form.submit(function(event) {

        event.preventDefault();
        var card = {};
        card.card_holder_name = $("#form #card_holder_name").val();
        card.card_expiration_date = $("#form #card_expiration_month").val() + '/' + $("#form #card_expiration_year").val();
        card.card_number = $("#form #card_number").val();
        card.card_cvv = $("#form #card_cvv").val();

        try {
            // pega os erros de validação nos campos do form e a bandeira do cartão
            var cardValidations = pagarme.validate({card: card})
        }
        catch(err) {
            swal("Opss...", "Dados do cartão inválido!", "error");
            return false;
        }

        //Mas caso esteja tudo certo, você pode seguir o fluxo
        pagarme.client.connect({ encryption_key: $("#form #encription_key").val() })
          .then(client => client.security.encrypt(card))
          .then(card_hash => swal({
                                    title: "Copie seu card hash abaixo!",
                                    text: "<textarea rows='10' class='form-control'>"+card_hash+"</textarea>",
                                    html: true,
                                    type: "success"
                                  })
          )
        return false

    });


});