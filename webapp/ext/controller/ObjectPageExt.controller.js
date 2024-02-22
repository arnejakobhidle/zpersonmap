sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        Test: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
            //id="zpersonmap::sap.suite.ui.generic.template.ObjectPage.view.Details::EmployeeDetailsSet--map">
        },
        onAfterRendering: function() {
          //  this.initMap();
        },
        initMap: function() {
            var directionsRenderer = new google.maps.DirectionsRenderer({
                map: map
            });
            var directionsService = new google.maps.DirectionsService;
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 6,
                center: {
                    lat: 23.0225,
                    lng: 72.5714
                } //Initial Location on Map
            });
                directionsRenderer.setMap(map);
            directionsRenderer.setPanel(document.getElementById('left-div'));
            var control = document.getElementById('front-div');
            control.style.display = 'inline';
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
                document.getElementById('origin').addEventListener('change', function() {
                distanceCalculator(directionsService, directionsRenderer);
            }, false);
        
            document.getElementById('destination').addEventListener('click', function() {
                distanceCalculator(directionsService, directionsRenderer);
            }, false);
        },
        
        /***************To Calculate and Display the Route*************/
        distanceCalculator: function(directionsService, directionsRenderer) {
            var origin = document.getElementById('origin').value;
            var destination = document.getElementById('destination').value;
            var req = {
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING'
            };
            directionsService.route(req, function(response, status) {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response);
            }
            });
        }
    };
});