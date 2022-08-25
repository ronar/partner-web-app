/**
 * Class Address
 * Address utility functions
 * @prop {address} object Address in BE format
 *
 */

function Address(address) {
    if (!address) {
        address = { id: null };
    }
    this._address = address;
    this.thoroughfare = address['firstStreet'];
    this.locality = address['city'];
    // this.marketingArea = address['marketingArea'];
    this.subLocality = address['borough'];
    this.postalCode = address['postCode'];
    this.subThoroughfare = address['homeNumber'];
    this.country = address['country'];
    this.buildingNumber = address['buildingNumber'];
    this.longitude = address['longitude'];
    this.latitude = address['latitude'];
}

Address.prototype = {
    get id () {
        return this._address.id;
    },

    shortAddress () {
        let addressString = '';

        addressString = [this.subThoroughfare, this.buildingNumber, this.thoroughfare].filter(val => val).join(' ');

        return addressString;
    },

    boroughWithoutPostCode () {
        return [this.subLocality, this.locality].filter(val => val).join(' ');
    },

    boroughAndPostCode () {
        let computedString = '';

        computedString = [this.subLocality, this.locality, this.postalCode].filter(val => val).join(' ');

        return computedString;
    },

    addressDescription (postalCodeOnly) {
        return postalCodeOnly ? this.postalCode : [this.subLocality, this.locality, this.postalCode].filter(v => v).join(', ');
    },

    fullAddress (withPostalCode = true) {
        // return this.getAddrElements().join(', ');
        if (this.thoroughfare) {
            return [this.thoroughfare, withPostalCode ? this.boroughAndPostCode() : this.boroughWithoutPostCode()].filter(val => /\w+/.test(val)).join(', ');
        } else {
            return [withPostalCode ? this.boroughAndPostCode() : this.boroughWithoutPostCode()].filter(val => /\w+/.test(val)).join(', ');
            // addrElements.push(this.boroughAndPostCode());
        }
        // return [this.thoroughfare ? this.thoroughfare : withPostalCode ? this.boroughAndPostCode() : this.boroughWithoutPostCode()].filter(val => /\w+/.test(val));
    },

    getAddrElements () {
        var addrElements = [];

        // this.
        // `${user.locationInfo[type].homeNumber || ''} ${user.locationInfo[type].firstStreet}`
        // return [this.shortAddress(), this.boroughAndPostCode()];
        if (this.thoroughfare) {
            addrElements.push(this.thoroughfare, this.addressDescription(true));
        } else {
            addrElements.push(this.boroughAndPostCode());
        }

        return addrElements.filter(val => /\w+/.test(val));
    }
};

export default Address;
