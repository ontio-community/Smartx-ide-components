
const address = sessionStorage.getItem('smartx_address') || ''
const privateKey = sessionStorage.getItem('smartx_privateKey') || ''
const state = {
    network: 'TEST_NET',
    nodeUrl: 'polaris1.ont.io',
    wallet: {
        address,
        privateKey,
        balance: {
            ong: 0,
            ont: 0
        }
    }
}

const mutations = {
    ['CHANGE_CONFIG_NETWORK'](state, {network, url}) {
        state.network = network;
        if (network === 'TEST_NET') {
            state.nodeUrl = 'polaris1.ont.io'
        } else if (network === 'MAIN_NET') {
            state.nodeUrl = 'dappnode1.ont.io'
        }
        if(url) {
            state.nodeUrl = url
        }
    },
    ['UPDATE_CONFIG_BALANCE'](state, {balance}) {
        state.wallet.balance = balance
    },
    ['UPDATE_CONFIG_ADDRESS'](state, {address}){
        state.wallet.address = address
        sessionStorage.setItem('smartx_address', address)
    },
    ['UPDATE_CONFIG_PRIKEY'](state, { privateKey }) {
        state.wallet.privateKey = privateKey
        sessionStorage.setItem('smartx_privateKey', privateKey)        
    }
}

const actions = {
    changeNetWork({commit, dispatch}, {network, url}) {
        commit('CHANGE_CONFIG_NETWORK', {network, url})
        dispatch('updateConfigBalance')
    },
    updateConfigBalance({commit, dispatch}) {
        if(!state.wallet.address) {
            alert('Please choose a wallet file.')
            return;
        }
        let node =  'https://' + state.nodeUrl + ':10334'
        if(state.network === 'PRIVATE_NET') {
            node = 'http' +  state.nodeUrl + ':20334'
        }
        const address = state.wallet.address;
        const url = node + '/api/v1/balance/' + address
        $.ajax({
            type: 'GET',
            url: url,
            dataType: "json",
            success: function (response) {
                //console.log(response)
                let ont = response.Result.ont
                let ong = response.Result.ong / 1000000000

                const balance = {
                    ont,
                    ong
                }
                commit('UPDATE_CONFIG_BALANCE', {balance})
            },
            error: function (data, textStatus, errorThrown) {
                console.log(data)
                alert('Network error. ' + data.statusText)
                return data
            },
            complete: function (XMLHttpRequest, textStatus) {
            }
        })
    }
}

export default {
    state,
    mutations,
    actions
}