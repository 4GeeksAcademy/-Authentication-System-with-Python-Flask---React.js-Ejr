from flask import jsonify


def response_error(msg, status_code):
    return jsonify({
        "msg": msg,
        "error": True
    }), status_code

def response_ok(data, msg, status_code):
    return jsonify({
        "msg": msg,
        "error": False,
        "data": data
    }), status_code