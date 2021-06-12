import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { API_BASE_URL } from "@/config"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartProducts: [],
        userAccesKey: null,
        backupCartProductsData: [],
        cartLoading:false        
    },
    actions: {        
        loadCart(context) {
            context.commit('updateCartLoadingState', true);
            return axios
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
                .then(() => context.commit('updateCartLoadingState', false))
        },
        addProductToCart(context, { productId, amount }) {
            context.commit('updateCartLoadingState', true);
            return (new Promise(resolve => setTimeout(resolve, 1000)))
                .then(() => {
                    return axios
                        .post(API_BASE_URL + 'api/baskets/products',
                            {
                                productId: productId,
                                quantity: amount
                            },
                            {
                                params: {
                                    userAccessKey: context.state.userAccesKey
                                }
                            })
                        .catch(error => {
                            console.log('addProductToCart error', error)
                            context.commit('updateCartLoadingState', false);
                        })
                        .then(response => {
                            context.commit('updateCartProductsData', response.data.items);
                            context.commit('updateCartLoadingState', false);
                        })
                })
        },
        updateCartProductAmount(context,{ productId, amount }){            
            context.commit('updateCartProductAmount', { productId, amount });
            return axios
                        .put(API_BASE_URL + 'api/baskets/products',
                            {
                                productId: productId,
                                quantity: amount
                            },
                            {
                                params: {
                                    userAccessKey: context.state.userAccesKey
                                }
                            })
                        .then(() => {                            
                            context.commit('updateCartProductData', { productId, amount });
                        })           
                        .catch(error => {
                            console.log('updateCartProductAmount error', error)              
                            context.commit('recoverCartProductsData');
                        })
        }
    },
    mutations: {
        updateCartLoadingState(state, value){
            state.cartLoading = value;
        },
        updateUserAccessKey(state, accessKey) {
            state.userAccesKey = accessKey;
        },
        updateCartProductsData(state, items) {  
            state.backupCartProductsData = items;
            state.cartProducts = items;            
        },       
        recoverCartProductsData(state) {  
            state.cartProducts = state.backupCartProductsData;            
        },       
        updateCartProductAmount(state, { productId, amount }) {
            const item = state.cartProducts.find(item => item.product.id === productId);            
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
        },
        cartProducts(state){
            return state.cartProducts;
        },
        cartLoadingState(state){
            return state.cartLoading;
        }
    }
})