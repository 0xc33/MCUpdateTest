/*

var act_pos = new TimeSeries();
      var act_vel = new TimeSeries();
      var act_accel = new TimeSeries();
      var act_decel = new TimeSeries();

      setInterval(function() {
        act_pos.append(new Date().getTime(), Number(axisObj["X-Axis"].actual_position_relative));
        act_vel.append(new Date().getTime(), Number(axisObj["X-Axis"].actual_velocity));
        act_accel.append(new Date().getTime(), Number(axisObj["X-Axis"].actual_acceleration_setpoint));
        act_decel.append(new Date().getTime(), Number(axisObj["X-Axis"].actual_deceleration_setpoint));
      }, 70);


    var position_chart = new SmoothieChart({grid:{fillStyle:'transparent', lineWidth: 1, millisPerLine: 250, verticalSections: 6}, maxValue : 2000, minValue: 0}),
    canvas = document.getElementById('position_scope')

    var velocity_chart = new SmoothieChart({grid:{fillStyle:'transparent', lineWidth: 1, millisPerLine: 250, verticalSections: 6}, maxValue : 100, minValue: -100}),
    canvas = document.getElementById('velocity_scope')

    var acceleration_chart = new SmoothieChart({grid:{fillStyle:'transparent', lineWidth: 1, millisPerLine: 250, verticalSections: 6}, maxValue : 100, minValue: -100}),
    canvas = document.getElementById('acceleration_scope')

    var deceleration_chart = new SmoothieChart({grid:{fillStyle:'transparent', lineWidth: 1, millisPerLine: 250, verticalSections: 6}, maxValue : 100, minValue: -100}),
    canvas = document.getElementById('deceleration_scope')

    position_chart.addTimeSeries(act_pos, {lineWidth:2,strokeStyle:'#00aaff'});
    velocity_chart.addTimeSeries(act_vel, {lineWidth:2,strokeStyle:'#00aaff'});
    acceleration_chart.addTimeSeries(act_accel, {lineWidth:2,strokeStyle:'#00aaff'});
    deceleration_chart.addTimeSeries(act_decel, {lineWidth:2,strokeStyle:'#00aaff'});


    position_chart.streamTo(document.getElementById("position_scope"), 70);

    velocity_chart.streamTo(document.getElementById("velocity_scope"), 70);

    acceleration_chart.streamTo(document.getElementById("acceleration_scope"), 70);

    deceleration_chart.streamTo(document.getElementById("deceleration_scope"), 70);
    */