// Map initialization module
((window, document, mapboxgl) => {
    'use strict';
  
    class ActivityMap {
      constructor(token, containerId, activity) {
        this.token = token;
        this.containerId = containerId;
        this.activity = activity;
        this.map = null;
        this.marker = null;
        this.initialized = false;
      }
  
      init() {
        if (!this.validateCoordinates()) return;
        
        mapboxgl.accessToken = this.token;
        
        this.map = new mapboxgl.Map({
          container: this.containerId,
          style: 'mapbox://styles/mapbox/outdoors-v12',
          center: this.activity.geometry.coordinates,
          zoom: 10,
          maxZoom: 16,
          minZoom: 8
        });
  
        this.addControls();
        this.createMarker();
        this.addEventListeners();
        this.initialized = true;
      }
  
      validateCoordinates() {
        const [lng, lat] = this.activity.geometry.coordinates;
        return (
          typeof lng === 'number' && lng >= -180 && lng <= 180 &&
          typeof lat === 'number' && lat >= -90 && lat <= 90
        );
      }
  
      addControls() {
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        this.map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
        this.map.addControl(new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true
        }), 'top-right');
      }
  
      createMarker() {
        this.marker = new mapboxgl.Marker({
          color: '#e74c3c',
          scale: 0.8
        }).setLngLat(this.activity.geometry.coordinates);
  
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(this.createPopupContent());
  
        this.marker.setPopup(popup).addTo(this.map);
      }
  
      createPopupContent() {
        return `
          <div class="map-popup">
            <h4 class="h6 mb-2">${this.activity.name}</h4>
            <p class="small mb-1">
              <i class="fas fa-map-marker-alt me-1"></i>
              ${this.activity.location}, ${this.activity.country}
            </p>
            <p class="small text-muted mb-0">
              Exact location provided after booking
            </p>
          </div>
        `;
      }
  
      addEventListeners() {
        this.map.on('load', () => {
          this.map.resize();
          window.addEventListener('resize', this.debounce(() => this.map.resize(), 250));
        });
  
        this.map.on('click', 'poi-label', (e) => {
          this.map.flyTo({ center: e.lngLat, zoom: 14 });
        });
      }
  
      debounce(fn, delay) {
        let timeout;
        return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => fn.apply(this, args), delay);
        };
      }
  
      destroy() {
        if (this.initialized) {
          this.map.remove();
          window.removeEventListener('resize', this.debounce);
        }
      }
    }
  
    // Initialize map if container exists
    const mapContainer = document.getElementById('map');
    if (mapContainer && typeof activity !== 'undefined') {
      const activityMap = new ActivityMap(mapToken, 'map', activity);
      activityMap.init();
    }
  
  })(window, document, mapboxgl);