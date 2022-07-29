'use strict';

const NetworksConfigsEnum = require('../../enumerations/networks');
const {BaseCryptoAPIsLibAwareService} = require("../../services/baseServices");

class BasePrepareTransaction extends BaseCryptoAPIsLibAwareService {
    /**
     * @param {Object} cryptoApis
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(cryptoApis, blockchain, network) {
        super(cryptoApis, blockchain, network)

        if (!NetworksConfigsEnum.NETWORKS_CONFIGS.hasOwnProperty(this.blockchain)
            || !Object.keys(NetworksConfigsEnum.NETWORKS_CONFIGS[this.blockchain].hasOwnProperty(this.network))) {
            throw new Error('Unknown configuration for ' + this.blockchain + ':' + this.network);
        }

        this.featuresInstance = new this.cryptoApis.FeaturesApi();
    }

    /**
     * @param {Object} transactionData
     * @private
     *
     * @return {Promise<*>}
     */
    prepare({transactionData}) {
        throw new Error('Implement sign method for service ' + this.constructor.name);
    };
}

module.exports = BasePrepareTransaction;