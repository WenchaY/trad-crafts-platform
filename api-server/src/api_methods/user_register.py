from utils import logger, utils
from models.http_codes import ResCreateSuccess, ResBadRequest, ResInternalServerError
from models.exceptions import BadRequestError
from data.data_access import DatabaseAccess

logger = logger.get_logger(__name__)


def register_user(data: dict) -> ResCreateSuccess:
    '''ユーザー登録'''

    logger.info(
        {
            "tag": "Users",
            "type": "register",
            "message": "Request received",
            "data":  data,
        }
    )

    try:
        # Check Request Body
        if utils.check_none(data):
            raise BadRequestError("Body is None")

        account = data.get('account')
        password = data.get('password')
        nickname = data.get('nickname')

        # Check Body Data
        if utils.check_none(account, password, nickname):
            raise BadRequestError("Bad body data")

        # DBに接続
        data_accessor = DatabaseAccess()

        # login_idが重複された場合は拒否
        result = data_accessor.select_user_by_account(account)
        if result:
            raise BadRequestError("Duplicate account")

        # ユーザーをDBに登録
        data_accessor.insert_user(account, password, nickname)

        # 登録成功を返す
        return ResCreateSuccess()

    except BadRequestError as err:
        logger.warning(
            {
                "tag": "Users",
                "type": "register",
                "message": err,
            }
        )
        return ResBadRequest()

    except Exception as err:
        logger.exception(
            {
                "tag": "Users",
                "type": "register",
                "message": "Exception",
                "error": err,
            }
        )
        return ResInternalServerError()
