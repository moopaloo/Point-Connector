QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test ( "Point in blob registers a hit, outside fails", function ( assert )
{

  var radius1 = 0.25; //Test fractional radius
  var radius2 = 2; //Test multiple unit radius and variable radius

  var testBlobs = [new Blob(0, 0, radius1), // Test origin
                   new Blob(0, 0, radius2), // Test other radius
                   new Blob(0, 0), // Test radius default value of 0.33

                   // x-asis tests
                   new Blob(-3.2, 0, radius1), // Negative x-axis with decimal
                   new Blob(-10, 0, radius2), // Extreme negative integer x-axis
                   new Blob(+3.6, 0, radius2), // Test positive x-axis
                   new Blob(+10, 0, radius1), // Test postive x-axis extreme

                   // y-axis tests
                   new Blob(0, -4.2, radius2), // negative y-axis, espeically
                   // important because screen and math coordinates differnt
                   new Blob(0, -10, radius1), // extreme negative y-axis
                   new Blob(0, +3.2, radius1), // postive float
                   new Blob(0, +10, radius2), // extreme positive integer

                   //quadrant
                   new Blob(-3.2, -4.8, radius1), // x-negative y-negative
                   // quadrant should be bottom left
                   new Blob (-10, +10, radius1), // x-negative y-positive
                   // should be top-left
                   new Blob(5.8, 9.4, radius1), // positive positive top-right
                   new Blob(+3, -0, radius2)];


    // Assertions

    assert.ok( testBlobs[0].hasHit(0, 0), "Direct origin to origin hit works" );
    assert.ok( testBlobs[0].hasHit(0.170, 0.170), "upper +,+ hit" );
    assert.ok( testBlobs[0].hasHit(-0.170, -0.170), "bottom -,- hit" );
    assert.notOk( testBlobs[0].hasHit(0.177, 0.177), "Detects upper +,+ miss" );
    assert.notOk( testBlobs[0].hasHit(-0.177, -0.177), "Detects bottom -,- miss" );


});
