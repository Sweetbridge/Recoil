// simple flat search

interface ObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}
declare var Object: ObjectCtor;
export let assign = Object.assign ? Object.assign : function (target: any, ...sources: any[]): any {
    return;
};

export function search(dataSource, term, keys) {

    let queryResult = [];

    if (term.length > 0) {
        dataSource.forEach(function (item) {
            keys.forEach((key, index) => {
                if (item[key].toString().toLowerCase().indexOf(term.toString().toLowerCase()) != -1) {
                    if (queryResult[index] !== item) {
                        queryResult.push(item);
                    }
                }
            });
        });
    }

    return queryResult;
}

export function ObjectAssignPolyfill() {
    if (typeof Object.assign != 'function') {
        (function () {
            Object.assign = function (target) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        })();
    }

}

export function isType (value) {

    let type;

    if (Array.isArray(value)) {
        type = 'array';
    } else if (typeof value === 'object') {
        type = 'object'
    } else if (typeof value === 'string') {
        type = 'string'
    } else {
        type = 'value'
    }

    return type;
}

export function arraysEqual(arr1, arr2){
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}