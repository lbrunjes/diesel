///
// diesel.data
///

diesel.data.keyNames =
{
	8:"Backspace",
	9:"Tab",
	13:"Enter",
	16:"Shift",
	17:"Ctrl",
	18:"Alt",
	20:"Caps Lock",
	27:"Escape",
	32:"Space",
	33:"Page Up",
	34:"Page Down",
	35:"End",
	36:"Home",
	37:"Left",
	38:"Up",
	39:"Right",
	40:"Down",
	45:"Insert",
	46:"Delete",
	48:"10",
	49:"1",
	50:"2",
	51:"3",
	52:"4",
	53:"5",
	54:"6",
	55:"7",
	56:"8",
	57:"9",
	112:"F1",
	113:"F2",
	114:"F3",
	115:"F4",
	116:"F5",
	117:"F6",
	118:"F7",
	119:"F8",
	120:"F9",
	121:"F11",
	122:"F11",
	123:"F12",
	144:"Num Lock",
	219:"[",
	220:"|",
	221:"]",
	222:"'"
};

diesel.data.getKeyName = function(keyCode){
	if( diesel.keyNames[keyCode]){
		return diesel. keyNames[keyCode];
	}
	// hope this  is a letter key:)
	return String.fromCharCode(keyCode);
};

diesel.data.directions={
	up: Math.PI,
	down: 0,
	left: Math.PI/2,
	right:Math.PI/2*3
};