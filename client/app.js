function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    // console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url =
        "https://blr-house-price-prediction-ml.herokuapp.com/predict_home_price";

    $.post(
        url,
        {
            total_sqft: parseFloat(sqft.value),
            bhk: bhk,
            bath: bathrooms,
            location: location.value,
        },
        function (data, status) {
            // console.log(data.estimated_price);
            estPrice.innerHTML =
                "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
            // console.log(status);
        }
    );
}

function onPageLoad() {
    // console.log("document loaded");
    var div = document.getElementById("predicted");
    div.innerHTML = "<h2>Predicted Price</h2>";
    var url =
        "https://blr-house-price-prediction-ml.herokuapp.com/get_location_names";
    $.get(url, function (data, status) {
        // console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $("#uiLocations").empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $("#uiLocations").append(opt);
            }
        }
    });

    $(document).ready(function () {
        $(".location").select2();
    });
}

window.onload = onPageLoad;
