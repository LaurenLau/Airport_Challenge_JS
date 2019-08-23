'use strict';

describe('Feature Test:', function() {
  var plane;
  var airport;

  beforeEach(function() {
    plane = new Plane();
    airport = new Airport();
  });

  it('planes can be instructed to land at an airport', function() {
    plane.land(airport);
    expect(airport.planes()).toContain(plane);
  });

  it('planes can be instructed to takeoff from airport', function() {
    plane.land(airport);
    plane.takeOff();
    expect(airport.planes()).not.toContain(plane);
  });

  it('prevents take off when the weather is stormy', function() {
    plane.land(airport);
    spyOn(airport,'isStormy').and.returnValue(true);
    expect(function(){ plane.takeOff();}).toThrowError('cannot takeoff during storm');
    expect(airport.planes()).toContain(plane);
  });

  it('prevents landing when the weather is stormy', function() {
    spyOn(airport,'isStormy').and.returnValue(true);
    expect(function(){ plane.land(airport);}).toThrowError('cannot land during storm');
    expect(airport.planes()).not.toContain(plane);
  });
});