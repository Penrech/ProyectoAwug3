
const SimpleListTemplate = {props: [], 
                          data: function() {
                                  return {
                                    shoppingItems: [
                                      {name: 'Manzanas', price: '8'},
                                        {name: 'Naranjas', price: '4'},
                                        {name: 'Fresas', price: '6'},
                                        {name: 'Aguacate', price: '6'},
                                        {name: 'Brocoli', price: '3'},
                                        {name: 'Calabaza', price: '8'},
                                      {name: 'Lechuga', price: '4'}
                                    ]
                                  }
                                },
                      template:`
    <ul>
  <li v-for="item in shoppingItems">
    {{ item.name }} - {{ item.price }}
  </li>
</ul>

`
                     };
