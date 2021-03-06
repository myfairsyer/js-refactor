'use strict';

function scopePathHelper(
    astHelper,
    typeHelper
) {

    const isScopeElement = astHelper.isNodeType([
        'ObjectExpression',
        'FunctionExpression',
        'FunctionDeclaration',
        'ArrowFunctionExpression'
    ]);

    function isBlockArrowFunction(node) {
        return node.type !== 'ArrowFunctionExpression'
            || node.body.type === 'BlockStatement';
    }

    function isScopePath(node) {
        return isScopeElement(node) && isBlockArrowFunction(node);
    }

    const isScopePathElement =
        (coords) =>
            (node) =>
                astHelper.coordsInNode(coords, node)
                && !astHelper.nodeMatchesCoords(coords, node)
                && isScopePath(node);

    function buildScopePath(coords, ast) {
        const scopePath = [ast];
        const capturePath = (node) => scopePath.push(node);

        astHelper.traverse(ast, {
            enter: astHelper.onMatch(function (node) {
                return isScopePathElement(coords)(node);
            }, capturePath)
        });

        return scopePath;
    }

    return {
        buildScopePath: typeHelper.enforce(
            'astCoords, ast => array<astNode>', 
            buildScopePath)
    };
}

module.exports = scopePathHelper;