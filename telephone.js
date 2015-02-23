/**
 * Apply mask for all inputs of type "tel"
 * @model telephone
 */
define([], function() {
    "use strict";
    var applyMaskToAllInputsOfTypeTel = function() {

        var allInputs = document.getElementsByTagName("input");
        if (!allInputs || !allInputs.length) {
            return;
        };

        var inputArray = Array.prototype.slice.call(allInputs);

        var telephoneInputs = inputArray.filter(function(inputElement) {
            return inputElement.getAttribute("type") === "tel";
        });
        if (!telephoneInputs || !telephoneInputs.length) {
            return;
        };

        telephoneInputs.forEach(function(inputElement) {
            var lastValue = null;

            inputElement.addEventListener("keydown", function() {

                setTimeout(function() {


                    var originalValue = inputElement.value;
                    if (originalValue === lastValue) {
                        return;
                    }

                    var selectionStart = inputElement.selectionStart,
                        selectionEnd = inputElement.selectionEnd;
                    var beforeCursor = originalValue.substring(0, selectionStart);
                    var nonDigits = beforeCursor.replace(/\d/g, "");
                    selectionStart -= nonDigits.length;
                    selectionEnd -= nonDigits.length;

                    var digitsOnly = originalValue.replace(/\D/g, "");
                    var digits = digitsOnly.split("");


                    if (digits.length > 3) {
                        digits.splice(3, 0, "-");

                        if (selectionStart > 3) {
                            selectionStart++;
                        }

                        if (selectionEnd > 3) {
                            selectionEnd++;
                        }
                    }


                    if (digits.length > 7) {
                        digits.splice(7, 0, "-");

                        if (selectionStart > 7) {
                            selectionStart++;
                        }

                        if (selectionEnd > 7) {
                            selectionEnd++;
                        }
                    }


                    lastValue = digits.join("");
                    inputElement.value = lastValue;

                    inputElement.selectionStart = selectionStart;
                    inputElement.selectionEnd = selectionEnd;
                });

            });

        });

    };
    return {
        applyMask: applyMaskToAllInputsOfTypeTel
    };
});