const fetch = require('node-fetch')

const URIs = [
    'https://atlas.api.barclays/open-banking/v2.2/personal-current-accounts',
    'https://api.bankofscotland.co.uk/open-banking/v2.2/personal-current-accounts',
    'https://api.halifax.co.uk/open-banking/v2.2/personal-current-accounts',
    'https://api.hsbc.com/open-banking/v2.2/personal-current-accounts',
    'https://api.lloydsbank.com/open-banking/v2.2/personal-current-accounts'
]

var getProducts = function(i, products) {
    if (!i) {
        i = 0;
    } else if (i < 0 || i >= URIs.length) {
        return products;
    }

    return fetch(URIs[i])
        .then(res => res.json())
        .then(body => {
            console.log(body);
            if (!products) {
                products = [];
            }
            // var newProducts = []
            // body.data[0].Brand.forEach(brand => {
            //     brand.PCA.forEach(pca => {
            //         pca.PCAMarketingState.forEach(pcaMarketingState => {
            //             if (pcaMarketingState.Overdraft) {
            //                 pcaMarketingState.Overdraft.OverdraftTierBandSet.forEach(overdraftTierBandSet => {
            //                     overdraftTierBandSet.OverdraftTierBand.forEach(overdraftTierBand => {
            //                         newProducts.push({
            //                             brandName: brand.BrandName,
            //                             productName: pca.Name,
            //                             tierBandMethod: overdraftTierBandSet.TierBandMethod,
            //                             tierValueMin: overdraftTierBand.TierValueMin,
            //                             tierValueMax: overdraftTierBand.TierValueMMax,
            //                             ear: overdraftTierBand.EAR,
            //                         })
            //                     });
            //                 })
            //             }
            //         });

            //     });
            // });
            products = products.concat(body.data[0].Brand);
            console.log(products.length + " brands so far");

            if (i < URIs.length - 1) {
                console.log("There is more.");
                return getProducts(i + 1, products);
            }
            return products;
        });
};


var filterProducts = function(product, minOverdraft, maxEar) {

    // if ((product.tierValueMax && parseInt(product.tierValueMax, 10) >= minOverdraft) ||
    //     (product.tierValueMin && parseInt(product.tierValueMin, 10) <= minOverdraft)) {

    // if (!maxEar || !product.ear || parseInt(product.ear, 10) <= maxEar) {
    return true;
    // }
    // }

    // return false;
}

module.exports = {
    Query: {
        productsWithOverdraft: (minOverdraft, maxEar) => {
            return getProducts().then(products => {
                return products.filter(product => filterProducts(product, minOverdraft, maxEar));
            });
        }
    }
}