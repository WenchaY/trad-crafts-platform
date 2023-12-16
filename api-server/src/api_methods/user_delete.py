from flask import request
from utils import logger, utils
from models.http_codes import ResCreateSuccess, ResBadRequest, ResInternalServerError, ResDeleteSuccess
from models.exceptions import BadRequestError
from data.data_access import DatabaseAccess

logger = logger.get_logger(__name__)


def delete_user(uid: int) -> ResCreateSuccess:
    '''ユーザー削除'''

    logger.info(
        {
            "tag": "Users",
            "type": "delete",
            "message": "Request received",
            "data": uid,
        }
    )

    try:
        # Check Request Body
        data = request.get_json()
        if utils.check_none(data):
            raise BadRequestError("Body is None")

        account = data.get('account')
        password = data.get('password')

        # Check Body Data
        if utils.check_none(account, password):
            raise BadRequestError("Bad body data")

        # DBに接続
        data_accessor = DatabaseAccess()

        # accountとパスワードが同じかとうがを確認
        result = data_accessor.select_user_by_account(account)
        res_uid = result[0][0]
        res_account = result[0][1]
        res_password = result[0][2]
        
        if res_uid == uid and res_account == account and res_password == password:
            result = data_accessor.delete_user_by_uid(uid) 
            # 削除成功を返す
            return ResDeleteSuccess()

    except BadRequestError as err:
        logger.warning(
            {
                "tag": "Users",
                "type": "delete",
                "message": err,
            }
        )
        return ResBadRequest()

    except Exception as err:
        logger.exception(
            {
                "tag": "Users",
                "type": "delete",
                "message": "Exception",
                "error": err,
            }
        )
        return ResInternalServerError()
