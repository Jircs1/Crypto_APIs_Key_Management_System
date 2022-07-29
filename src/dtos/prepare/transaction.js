'use strict'

const BaseDTO = require("../baseDTO")

class Transaction extends BaseDTO {
    /**
     * @param {Object} data
     * @throws Error
     */
    constructor(data) {
        super(data)
        console.log('\n item', data)
        // this.data = this._prepareData(data);
    }

    /**
     * @param {Object} data
     * @return {Object}
     * @throws Error
     * @private
     */
    _prepareData(data) {
        throw new Error('Implement _prepareData method for service ' + this.constructor.name);
    }

    /**
     * @return {Object}
     */
    getData() {
        return this.data;
    }
}

module.exports = Transaction;