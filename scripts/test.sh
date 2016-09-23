#!/usr/bin/env bash

# We'll test the node version and let the user know if the build was built to work for their version or not.
function testNodeVersion {
    NODE_VER="`node -v | cut -d "v" -f 2 | cut -d "." -f 1`"
    TESTED_NODE="5"

    echo "Testing node version";

    # Simply check if node version is greater than or equal to the tested node version.
    if [[ (( ${NODE_VER} <= ${TESTED_NODE} )) ]]; then
        echo "This version of node has been tested";
    else
        echo "This version of node has not been tested, If the build fails try node version 5 or greater.";
    fi
}

# Run lighthouse on the local server & output its contents to a json file
function runLighthouse {
    echo "Running lighthouse against http://localhost:3000/";
    echo "lighthouse --output=json http://localhost:3000/ --output-path=./validate/log.json";
    lighthouse --output=json http://localhost:3000/ --output-path=./validate/log.json
}

# Test the output from lighthouse & ensure the score is over 80, otherwise we fail.
function testLighthouseOuput {
    echo "";
}