import json5

def get_max_power(bp, type):
	if bp < 45:
		basedamage = 90
		reduce = 20
	elif bp <55:
		basedamage = 100
		reduce     = 25
	elif bp <65:
		basedamage = 110
		reduce     = 30
	elif bp <75:
		basedamage = 120
		reduce     = 35
	elif bp <110:
		basedamage = 130
		reduce     = 40
	elif bp <150:
		basedamage = 140
		reduce     = 45
	elif bp >=150:
		basedamage = 150
		reduce     = 50
	else:
		basedamage = 0
		reduce = 0

	if type in ["Fighting", "Poison"]:
		basedamage -= reduce
	return basedamage

def get_z_power(bp):
	if bp < 56:
		return 100
	elif bp < 66:
		return 120
	elif bp < 76:
		return 140
	elif bp < 86:
		return 160
	elif bp < 96:
		return 175
	elif bp < 101:
		return 180
	elif bp < 111:
		return 185
	elif bp < 126:
		return 190
	elif bp < 131:
		return 195
	return 200


with open('./new_moves.json') as f:
	data = f.read()

	# Convert to valid JSON
	# data = data.replace("'", '"')

	data = json5.loads(data)

for name, move in data.items():
	base_power = move["bp"]
	if "maxPower" not in move and "type" in move:
		move["maxPower"] = get_max_power(base_power, move["type"])
	if "zp" not in move and "type" in move:
		move["zp"] = get_z_power(base_power)

with open('./new_moves_fixed.json', 'w') as f:
	out = json5.dumps(data, indent=2)
	out = out.replace('"', "'")

	f.write(out)

