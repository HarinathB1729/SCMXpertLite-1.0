def user_entity(user) -> dict:
    return {
        "name": user['name'],
        "email": user['email'],
        "password": user['password'],
        "role": user['role']
    }


def users_entity(users) -> list:
    return [user_entity(user) for user in users]


def user_response_entity(user) -> dict:
    return {
        "name": user['name'],
        "email": user['email'],
        "role": user['role']
    }
