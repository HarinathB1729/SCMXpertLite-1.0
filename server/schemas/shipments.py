def shipment_entity(shipment) -> dict:
    return {
        "email": str(shipment["email"]),
        "shipmentno": shipment["shipmentno"],
        "routedetails": shipment['routedetails'],
        "device": shipment['device'],
        "ponumber": shipment["ponumber"],
        "ndcnumber": shipment["ndcnumber"],
        "snogoods": shipment['snogoods'],
        "containerno": shipment['containerno'],
        "goodstype": shipment["goodstype"],
        "expdeliverydate": shipment['expdeliverydate'],
        "deliveryno": shipment['deliveryno'],
        "batchid": shipment["batchid"],
        "shipmentdescr": shipment['shipmentdescr'],
    }


def shipments_entity(shipments) -> list:
    return [shipment_entity(shipment) for shipment in shipments]
