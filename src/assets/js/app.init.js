var initFwCheckout = function (usr, data) {
    var response = null;

    return new Promise( function (resolve, reject) {
      FlutterwaveCheckout({
        // public_key: 'FLWPUBK-39a42c2e75f6ad587b73b7c7e51717e6-X',
          public_key: 'FLWPUBK-39a42c2e75f6ad587b73b7c7e51717e6-X',
          tx_ref: data.reference,
          amount: data.amount,
          currency: "NGN",
          payment_options: 'card, transfer, ussd',
          customer: {
              email: usr.email,
              phonenumber: usr.phone,
              name: 'Ignite Player Voting'
          },
          callback: function(data) {
              console.log(data);
              // if (data.status == 'successful') {}
              response = data;
          },
          onclose: function() {
            if(response){
              resolve(response);
            }else{
              reject(response);
            }
          },
          customizations: {
              title: 'Ignite Megastars',
              description: "Player Voting.",
              // logo: me().photo
          }
      });
    });
}
