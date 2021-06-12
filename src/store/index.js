import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { API_BASE_URL } from "@/config"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [],
        userAccesKey: null,
        cartProductsData: []
    },
    actions: {
        loadCart(context) {
            axios
                .get(API_BASE_URL + 'api/baskets', {
                    params: {
                        userAccessKey: context.state.userAccesKey
                    }
                })
                .then(response => {
                    if (!context.state.userAccesKey) {
                        localStorage.setItem('UserAccessKey', response.data.user.accessKey);
                        context.commit('updateUserAccessKey', response.data.user.accessKey);
                    }                    
                    context.commit('updateCartProductsData', response.data.items);
                    //context.commit('syncCartProducts');
                })                 
        }
    },
    mutations: {
        //syncCartProducts(state){
            // state.cartProducts = state.cartProductsData.map(item =>  {
            //     return {
            //         productId: item.product.id,
            //         amount: item.quantity
            //     }
            // })
        //},
        updateUserAccessKey(state, accessKey) {
            state.userAccesKey = accessKey;
        },
        updateCartProductsData(state, items) {            
            state.cartProducts = items;            
        },

        addProductToCart(state, { productId, amount }) {
            const item = state.cartProducts.find(item => item.productId === productId);

            if (item) {
                item.amount += amount
            } else {
                state.cartProducts.push({ productId, amount })
            }
        },
        updateCartProductAmount(state, { itemId, amount }) {
            const item = state.cartProducts.find(item => item.id === itemId);            
            if (item) {
                item.quantity = amount;
            }
        },
        deleteCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
        }
    },
    getters: {        
        cartTotalPrice(state) {        
            return state.cartProducts.reduce((acc, item) => (item.price * item.quantity) + acc, 0)
        }
    }
})