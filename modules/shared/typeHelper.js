'use strict';

const signet = require('signet')();


(function () {
    signet.alias('editorPosition', 'tuple<leftBoundedInt<0>, leftBoundedInt<0>>');
    signet.defineDuckType('editorCoords', {
        start: 'editorPosition',
        end: 'editorPosition'
    });

    signet.defineDuckType('astPosition', {
        line: 'leftBoundedInt<1>',
        column: 'leftBoundedInt<0>'
    });

    signet.defineDuckType('astCoords', {
        start: 'astPosition',
        end: 'astPosition'
    });

    signet.defineDuckType('astNode', {
        loc: 'astCoords'
    });

    signet.alias('selectionCoords', 'astCoords');
})();


function typeHelper() {

    return signet;

}

module.exports = typeHelper;