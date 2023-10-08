from dataclasses import dataclass, field
from enum import Enum, unique


@unique
class ResCodes(Enum):
    '''Response Codes Enum'''

    SUCCESS = 200
    CREATE_SUCCESS = 201
    DELETE_SUCCESS = 204
    BAD_REQUEST = 400
    FORBIDDEN = 403
    NOT_FOUND = 404
    SERVER_ERR = 500


@dataclass
class Response:
    '''Common Response Data Class'''

    code: int
    body: dict = field(default_factory=dict)


@dataclass
class ResSuccess(Response):
    '''200 Success Response Data Class'''

    code: int = ResCodes.SUCCESS.value
    body: dict = field(
        default_factory = lambda:
        {
            "data": "example",
        }
    )


@dataclass
class ResCreateSuccess(Response):
    '''201 Create Success Response Data Class'''

    code: int = ResCodes.CREATE_SUCCESS.value
    body: dict = field(
        default_factory = lambda: 
        {
            "message": "Create Success",
        }
    )


@dataclass
class ResDeleteSuccess:
    '''204 Delete Success Response Data Class'''

    code: int = ResCodes.DELETE_SUCCESS.value
    body: dict = field(
        default_factory = lambda: 
        {
            "message": "Delete Success",
        }
    )


@dataclass
class ResBadRequest:
    '''400 Bad Request Response Data Class'''

    code: int = ResCodes.BAD_REQUEST.value
    body: dict = field(
        default_factory = lambda: 
        {
            "message": "Bad Request",
        }
    )


@dataclass
class ResForbidden:
    '''403 Forbidden Response Data Class'''

    code: int = ResCodes.FORBIDDEN.value
    body: dict = field(
        default_factory = lambda: 
        {
            "message": "Forbidden",
        }
    )


@dataclass
class ResNotFound:
    '''404 Not Found Response Data Class'''

    code: int = ResCodes.NOT_FOUND.value
    body: dict = field(
        default_factory = lambda: 
        {
            "message": "Not Found",
        }
    )


@dataclass
class ResInternalServerError:
    '''500 Internal Server Error Response Data Class'''

    code: int = ResCodes.SERVER_ERR.value
    body: dict = field(
        default_factory = lambda: 
        {
            "message": "Internal Server Error",
        }
    )
