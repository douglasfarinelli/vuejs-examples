Vue.component('cc-address', {

    template: '<div class="cc-address"><div class="row"> <div class="col-md-3 col-xs-12"> <div class="form-group"> <label for="id_zipcode">CEP:</label> <input id="id_zipcode" type="text" class="form-control" :name="prefix + \'zipcode\' + suffix" v-on:keyup.prevent="find" v-model="zipcode" ref="zipcode"/> </div></div></div><p class="text-danger" style="display: none;" v-show="notfound"><strong>Endereço não localizado</strong>. Por gentileza entre manualmente.</p><div class="row"> <div class="col-md-5 col-xs-9"> <div class="form-group"> <label for="id_address">Logradouro:</label> <input id="id_address" type="text" class="form-control" :name="prefix + \'address\' + suffix" v-model="address.address" ref="address" :readonly="valid"/> </div></div><div class="col-md-3 col-xs-3"> <div class="form-group"> <label for="id_number">Número:</label> <input id="id_number" type="text" class="form-control" :name="prefix + \'number\' + suffix" ref="number"/> </div></div><div class="col-md-4 col-xs-12"> <div class="form-group"> <label for="id_complementary">Complemento:</label> <input id="id_complementary" type="text" class="form-control" :name="prefix + \'complementary\' + suffix"/> </div></div></div><div class="row"> <div class="col-md-5 col-xs-6"> <div class="form-group"> <label for="id_neighborhood">Bairro:</label> <input id="id_neighborhood" type="text" class="form-control" :name="prefix + \'neighborhood\' + suffix" v-model="address.neighborhood" :readonly="valid"/> </div></div><div class="col-md-5 col-xs-6"> <div class="form-group"> <label for="id_city">Cidade:</label> <input id="id_city" type="text" class="form-control" :name="prefix + \'city\' + suffix" v-model="address.city" :readonly="valid"/> </div></div><div class="col-md-2 col-xs-12"> <div class="form-group"> <label for="id_state">Estado:</label> <input id="id_state" type="text" class="form-control" :name="prefix + \'state\' + suffix" v-model="address.state" :readonly="valid"/> </div></div></div></div>',

    props: {
        'prefix': {'default': ''},
        'suffix': {'default': ''},
    },

    data: function ()
    {
        return {
            address: {},
            zipcode: '',
            valid: false,
            notfound: false,
        };
    },

    mounted: function()
    {

        jQuery(this.$refs.zipcode).mask('00000-000');

    },

    methods: {

        find: function()
        {

            var self = this;

            self.address = {};
            self.valid = false;
            self.notfound = false;

            if (/^[0-9]{5}-[0-9]{3}$/.test(self.zipcode))
            {

                jQuery.getJSON('http://api.postmon.com.br/v1/cep/' + self.zipcode, function(response){

                    self.address = {
                        address: response.logradouro,
                        city: response.cidade,
                        neighborhood: response.bairro,
                        state: response.estado_info.nome
                    };

                    self.valid = true;
                    jQuery(self.$refs.number).focus();

                }).fail(function(){

                    self.notfound = true;
                    jQuery(self.$refs.address).focus();

                });

            };

        },
    }
});