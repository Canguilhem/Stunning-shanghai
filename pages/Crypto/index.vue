<template>
  <div class="page">
    <h3>Easily keep track of all your crypto transactions:</h3>
    <b-row class="my-1 mt-5">
      <b-col sm="3">
        <label for="input-volume">Quantity of crypto bought:</label>
      </b-col>
      <b-col sm="3" class="ml-3">
        <b-form-input id="input-volume" placeholder="I bought XXX" v-model.number="quantity"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-symbol">Acronym/symbol of token:</label>
      </b-col>
      <b-col sm="3" class="ml-3">
        <b-form-input id="input-symbol" placeholder="of YYY crypto" v-model="asset"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-price">Total price:</label>
      </b-col>
      <b-col sm="2" class="ml-3">
        <b-form-input id="input-price" placeholder="of YYY crypto" v-model.number="price"></b-form-input>
      </b-col>
    </b-row>
    <br />
    <div>
      <p v-if="asset && quantity && price">Bought {{quantity}} of {{asset}} for {{price}}$</p>
      <b-btn id="add-transact" class="text-right" variant="outline-primary" @click="addAsset">Add a new transaction</b-btn>
    </div>
    
    <b-col id="records" sm="8">
      <h5>My Past transactions</h5>
      <!-- <b-table :items="assets" :fields="fields" 
        dark bordered borderless hover
        :tbody-tr-class="rowClass"></b-table> -->
        {{assets}}
    </b-col>
    <br />
    <b-btn class="mt-4" @click="fetchData">fetch Data</b-btn>
    <h4>Data from coinmarketcap price in $</h4>
    <div class="pairs--container">
      <div v-for="(pair, index) in coinsData" :key="index" :v-if="index< 10">
        {{pair.name}} : {{roundPrice(pair.quote.USD.price)}}
      </div>
    </div>
    

  </div>
</template>

<script>
import * as moment from 'moment';
import axios from "axios";
export default {
  layout: "crypto",
  data() {
    return {
      asset: "",
      quantity: "",
      price: "",
      assets: [],
      coinsData: [],
      // fields: ["Symbol", "Quantity", "Price", "Real time Value"]
      // fields: [
      //   {key: "symbol", label: "Symbol", sortable: false},
      //   {key: "quantity", label: "Quantity", sortable: true},
      //   {key: "price", label: "Stack value then", sortable: true, headerAbbr: "Then"},
      //   {key: "value", label: "Stack value now", sortable: true, headerAbbr: "Now"},
      // ]
    };
  },
  methods: {
    async fetchData() {
      try {

        console.log( "do you copy", process.env.API_CMC);
        let {data} = await axios({
          url: "https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
          method: 'get',
          headers: {
            'X-CMC_PRO_API_KEY': 'e43d170c-a7b2-4370-9fd0-c251f91cdce9',
          }
        })
        console.log(data);
        // data.forEach(e => {
        //   // res.push({
        //   //   symbol: e.symbol,
        //   //   price: e.price_usd,
        //   //   last_updated: moment.unix(e.last_updated).format("MM/DD/YYYY")
        //   // });
        //   this.assets.forEach(a=>{
        //     if(a.symbol == e.symbol){
        //       a.value = Math.round(a.quantity * e.price_usd *100)/100
        //     }
        //   })
        // });
        this.coinsData = data.data
        console.log(this.coinsData)
      } catch (error) {
        console.log(error);
      }
    },
    roundPrice(value){
      return Math.round(value*100)/100;
    },
    addAsset() {
      this.assets.push({
        symbol: this.asset,
        quantity: this.quantity,
        price: this.price
      });
      this.asset = ''
      this.quantity = ''
      this.price = ''
    },
    rowClass(item, type){
      let clas = ''
      if(!item || type != 'row' || !item.value) return;
      item.value > item.price ? clas = 'table-success': clas = 'table-danger'
      return clas;
    }
  }
};
</script>

<style scoped>
#add-transact{
  margin: auto;
  display: block;
}
#records{
  color: aliceblue;
}

thead > tr {
  color: var(--main-color4)
}
pre {
  color: var(--main-color2);
}

.pairs--container{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 15px;
}
</style>