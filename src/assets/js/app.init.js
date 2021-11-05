var initFwCheckout = function (usr, data) {
    var response = null;

    return new Promise( function (resolve, reject) {
      FlutterwaveCheckout({
          public_key: 'FLWPUBK_TEST-4eeafe86eb3ca7e8f3fbd486ea3c4650-X',
          tx_ref: data.reference,
          amount: data.amount,
          currency: "NGN",
          payment_options: 'card, transfer, ussd',
          customer: {
              email: usr.email,
              phonenumber: usr.phone,
              name: 'Ignite Voting User'
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
