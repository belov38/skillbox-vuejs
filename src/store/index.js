import Vue from 'vue'
import Vuex from 'vuex'
import products from '@/data/products'
import axios from "axios";
import {API_BASE_URL} from "@/config"

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        cartProducts: [
            {productId:1, amount:2}
        ],
        userAccesKey: null,
        cartProductsData: []
    },
    actions:{
        loadCart(context){ 
            axios
                .get(API_BASE_URL + 'api/baskets',{
                    userAccessKey:context.userAccesKey
                })
                .then(response => {
                    if(!context.userAccesKey){
                        localStorage.setItem('UserAccessKey',response.data.user.accessKey);
                        context.commit('updateUserAccessKey', response.data.user.accessKey);                        
                    }
                    context.commit('updateCartProductsData', response.data.items);
                })
        }
    },
    mutations:{
        updateUserAccessKey(state, accessKey){
            state.userAccesKey = accessKey;
        },
        updateCartProductsData(state, items){
            state.cartProducts = items;
        },

        addProductToCart(state, {productId, amount}){
            const item = state.cartProducts.find(item => item.productId === productId);

            if (item){
                item.amount += amount
            } else {
                state.cartProducts.push({productId,amount})
            }
        },
        updateCartProductAmount(state,  {productId, amount}){
            const item = state.cartProducts.find(item => item.productId === productId);

            if (item){
                item.amount = amount;
            }
        },
        deleteCartProduct(state, productId){            
            state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
        }
    },
    getters: {
        cartDetailsProducts(state){
            return state.cartProducts.map(item => {
                return {
                    ...item,
                    product: products.find(p => p.id === item.productId)
                }
            });
        },
        cartTotalPrice(state, getters){
            return getters.cartDetailsProducts.reduce((acc, item) => (item.product.price * item.amount) + acc,0)
        }
    }
})