// This should be added inside the definition of the 'ui' object at the starting of ui.js.

    encoder: {
        container: document.getElementById('encoder'),
        valDisplay: document.getElementById('encoderValDisplay'),
        slider: document.getElementById('encoderSlider'),
        forward: document.getElementById('forwardEncoder'),
        reverse: document.getElementById('reverseEncoder')
    },

// End section



// Copy this portion of the code into the large switch statement in the onValueChanged function

        case '/SmartDashboard/Arm | Forward Limit Switch':
            ui.encoder.forward.innerHTML = 'Forward Encoder:' + value;
            ui.encoder.forward.style.color = value ? 'green' : 'red';
            break;
        case '/SmartDashboard/Arm | Reverse Limit Switch':
            ui.encoder.forward.innerHTML = 'Reverse Encoder:' + value;
            ui.encoder.reverse.style.color = value ? 'green' : 'red';
            break;
            // The following case is an example, for a robot with an arm at the front.
            // Info on the actual robot that this works with can be seen at thebluealliance.com/team/1418/2016.
        case '/SmartDashboard/Arm | Encoder':
            // 0 is all the way back, 1200 is 45 degrees forward. We don't want it going past that.
            if (value > 1140) {
                value = 1140;
            } else if (value < 0) {
                value = 0;
            }
            // Calculate visual rotation of arm
            var armAngle = 180 - value * 225 / 1200;

            // Rotate the arm in diagram to match real arm
            ui.robotDiagram.arm.style.transform = 'rotate(' + armAngle + ')';
            break;

// End Section



// Add this at the bottom of ui.js with the other listeners.

ui.encoder.slider.addEventListener('click', function() {
    // Get value of slider and send to NetworkTables
	NetworkTables.setValue('/SmartDashboard/Arm | Middle', parseInt(ui.encoder.slider.value));
});

// End section