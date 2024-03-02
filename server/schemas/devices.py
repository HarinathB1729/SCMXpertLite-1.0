def device_entity(devicedata) -> dict:

    return {
        "deviceid": devicedata["deviceid"],
        "batterylevel": devicedata['batterylevel'],
        "firstsensortemp": devicedata['firstsensortemp'],
        "routefrom": devicedata["routefrom"],
        "routeto": devicedata["routeto"],
        "timestamp": devicedata['timestamp']
    }


def devices_entity(devicesdata) -> list:
    return [device_entity(devicedata) for devicedata in devicesdata]
