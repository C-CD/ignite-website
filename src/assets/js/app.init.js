var initFwCheckout = function (usr, data, meta = null) {
    var response = null;

    return new Promise( function (resolve, reject) {
      const fwModal = FlutterwaveCheckout({
          // public_key: 'FLWPUBK_TEST-4f3ea2e6ca5f9ec98fa29686de92786e-X',
          public_key: 'FLWPUBK-44473b3533fa0550acd7ae72861b74f2-X',
          tx_ref: data.reference,
          amount: data.amount,
          currency: "NGN",
          payment_options: 'card, banktransfer, ussd',
          // meta: meta,
          customer: {
              email: usr.email,
              phonenumber: usr.phone,
              name: 'Ignite Player Voting'
          },
          callback: function(data) {
              console.log(data);
              response = data;

              if ((['successful', 'completed']).includes(data.status)) {
                resolve(response);
                fwModal.close();
              }
          },
          onclose: function() {
            if(!response) reject(response);
          },
          customizations: {
              title: 'Ignite Megastars Votings',
              description: "Player Voting.",
              // logo: me().photo
          }
      });
    });
}
