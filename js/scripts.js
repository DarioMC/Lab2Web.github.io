// Lab Semana 3 - Dario Monestel Corella

function putOpsCurrSelect() {
    $("<option disabled selected value>Seleccione una moneda</option>")
        .appendTo("#fromCurrency");
    $.ajax({
        url: "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json",
        success: function(resp) {
            $.each(JSON.parse(resp), function (i, val) {
                let currencyOption = "<option value="
                    + i
                    + ">"
                    + val.name
                    + "</option>";
                $(currencyOption).appendTo("#fromCurrency");
            });
        },
        error: function() {
            console.error("Error fetching currency.");
        }
    });
}

function doConversion() {
    $("#coversionForm").submit(function () {
        $("#tblBodyCurrency").html("");
        let fromCurrency = $.trim($("#fromCurrency").val());
        let quantity = $.trim($("#inputQuantity").val());
        $.ajax({
            url: "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json",
            success: function(currResp) {
                let currencies = JSON.parse(currResp);
                let currencyCodes = [
                    "USD", "EUR", "CNY", "JPY", "BGN",
                    "CAD", "EGP", "HNL", "SAR", "TTD", "TRY", "NIO", "MXN", "ILS", "AUD",
                    "ANG", "JMD", "PKR", "RUB", "UYU", "ZAR", "VND", "SYP", "PHP", "CUC"
                ];
                for (let i=0, len=currencyCodes.length; i < len; i++) {
                    let toCurr = currencyCodes[i];
                    let conversion = fromCurrency + "_" + toCurr;
                    let currency = currencies[toCurr];
                    $.ajax({
                        url: "https://free.currencyconverterapi.com/api/v5/convert?q=" + conversion + "&compact=y",
                        success: function(convResp) {
                            let value = convResp[conversion].val * parseFloat(quantity);
                            let currencyRow = "<tr>"
                                + "<td>" + "<div class='currency-flag currency-flag-"+ currency.code.toLowerCase() +"'></div>" + "</td>"
                                + "<td>" + currency.code + "</td>"
                                + "<td>" + currency.name + "</td>"
                                + "<td>" + value + "</td>"
                                + "</tr>";
                            $(currencyRow).appendTo("#tblBodyCurrency");
                        },
                        error: function() {
                            console.error("Error fetching exchange rate.");
                        }
                    });
                }
            },
            error: function() {
                console.error("Error fetching currency.");
            }
        });
        // avoid refresh page
        return false;
    });
}

jQuery(
    $(document).ready(function () {
        putOpsCurrSelect(),
        doConversion()
    })
)
