from utils import logger, utils
from models.http_codes import ResSuccess, ResBadRequest, ResNotFound, ResInternalServerError
from models.exceptions import BadRequestError
from data.data_access import DatabaseAccess

logger = logger.get_logger(__name__)


def get_user_by_account(account: dict) -> ResSuccess:
    '''アカウントでユーザー情報取得'''

    logger.info(
        {
            "tag": "Users",
            "type": "get_by_account",
            "message": "Request received",
            "data":  {
                "account": account,
            },
        }
    )

    try:
        # Check Request Data
        if utils.check_none(account):
            raise BadRequestError("Request data is None")

        # DBに接続
        data_accessor = DatabaseAccess()

        # accountが存在しない場合は拒否
        result = data_accessor.select_user_by_account(account)
        if not result:
            return ResNotFound()

        res_uid = result[0][0]
        res_account = result[0][1]
        res_nickname = result[0][3]
        res_created_at = utils.convert_date_format(result[0][4])
        res_updated_at = utils.convert_date_format(result[0][5])

        return ResSuccess(
            body={
                "uid": res_uid,
                "account": res_account,
                "nickname": res_nickname,
                "created_at": res_created_at,
                "updated_at": res_updated_at,
            }
        )

    except BadRequestError as err:
        logger.warning(
            {
                "tag": "Users",
                "type": "get_by_account",
                "message": err,
            }
        )
        return ResBadRequest()

    except Exception as err:
        logger.exception(
            {
                "tag": "Users",
                "type": "get_by_account",
                "message": "Exception",
                "error": err,
            }
        )
        return ResInternalServerError()
