'use strict';

var mockFactoryForCodestreamStructureTest = Object.create(jpipMockFactory);

mockFactoryForCodestreamStructureTest.createCodestreamSizesCalculator =
    function(params) {
        // NOTE: Now the sizesCalculator and codestreamStructure are
        // considered one unit in testing. They should be tested
        // separately. Also some classes (like tileStructure) can refer
        // directly to the sizesCalculator and it doesn't need the
        // codestreamStructure at all.
        
        return new jpipExports.JpipCodestreamSizesCalculator(params);
    };

mockFactoryForCodestreamStructureTest.createTileStructure =
    function(tileParams, codestreamStructure, progressionOrder) {
        function createComponentStructure(componentStructure) {
            return new JpipComponentStructureStub(componentStructure);
        };
        
        var result = new JpipTileStructureStub(tileParams, codestreamStructure, progressionOrder);

        result.getComponentStructure = function(component) {
            return createComponentStructure(tileParams.paramsPerComponent[component]);
        };

        result.getDefaultComponentStructure = function() {
            return createComponentStructure(tileParams.defaultComponentParams);
        };
        
        return result;
    };