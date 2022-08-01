'use strict';

const { BaseBlockchainAwareService } = require("./baseServices");
const bip39 = require('bip39')
    , {XPUB_DERIVATION_TYPES: xpubDerivationTypesEnum} = require('../helpers/xpubFormatsHelper')
    , WalletDTO = require('../dtos/walletDTO')
;

const DEFAULT_WORDS_COUNT = 12;
const MNEMONIC_STRENGTH_MULTIPLIER = 16;

/**
 * WalletService
 *
 * @class WalletService
 * @extends {BaseBlockchainAwareService}
 */
class WalletService extends BaseBlockchainAwareService {

    /**
     * @param {string} blockchain
     * @param {string} network
     */
    constructor(blockchain, network) {
        super(blockchain, network)
    }

    /**
     * @returns {Promise<WalletDTO>}
     */
    async createHDWallet() {
        const strength = (DEFAULT_WORDS_COUNT / 1.5) * MNEMONIC_STRENGTH_MULTIPLIER;
        const mnemonic = bip39.generateMnemonic(strength);
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const xpubDerivationTypes = xpubDerivationTypesEnum[this.blockchain];

        let xPubList = [];
        for (let derivationType of Object.keys(xpubDerivationTypes)) {
            xPubList.push(xpubDerivationTypes[derivationType](seed, this.network));
        }

        return new WalletDTO({
            blockchain: this.blockchain,
            network: this.network,
            mnemonic: mnemonic,
            seed: seed.toString('hex'),
            xPubsList: xPubList
        });
    }
}

module.exports = WalletService;